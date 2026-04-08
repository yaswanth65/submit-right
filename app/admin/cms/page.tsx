"use client";

import { useEffect, useMemo, useState } from "react";

type FieldType = "heading" | "paragraph" | "text" | "image_src" | "image_alt";

type CmsField = {
  id: string;
  label: string;
  type: FieldType;
  value: string;
};

type CmsSection = {
  id: string;
  title: string;
  fields: CmsField[];
};

type SavedSection = {
  id: string;
  values: Record<string, string>;
};

const CMS_PAGES = [
  { label: "Home", route: "/" },
  { label: "About", route: "/about" },
  { label: "Contact", route: "/contact" },
  { label: "Privacy Policy", route: "/privacy-policy" }
] as const;

const STORAGE_PREFIX = "cms-editor:";

function createFieldId(prefix: string, index: number) {
  return `${prefix}-${index + 1}`;
}

function extractFieldsFromSection(sectionEl: HTMLElement) {
  const fields: CmsField[] = [];

  const pushTextFields = (selector: string, type: FieldType, labelPrefix: string, idPrefix: string) => {
    const elements = Array.from(sectionEl.querySelectorAll(selector));
    elements.forEach((el, idx) => {
      const text = (el.textContent || "").trim();
      if (!text) {
        return;
      }

      fields.push({
        id: createFieldId(idPrefix, idx),
        label: `${labelPrefix} ${idx + 1}`,
        type,
        value: text
      });
    });
  };

  pushTextFields("h1, h2, h3, h4, h5, h6", "heading", "Heading", "heading");
  pushTextFields("p", "paragraph", "Paragraph", "paragraph");
  pushTextFields("span, li, label, button, a", "text", "Text", "text");

  const imageElements = Array.from(sectionEl.querySelectorAll("img"));
  imageElements.forEach((img, idx) => {
    const src = img.getAttribute("src") || "";
    const alt = img.getAttribute("alt") || "";

    fields.push({
      id: createFieldId("image-src", idx),
      label: `Image ${idx + 1} Source`,
      type: "image_src",
      value: src
    });

    fields.push({
      id: createFieldId("image-alt", idx),
      label: `Image ${idx + 1} Alt`,
      type: "image_alt",
      value: alt
    });
  });

  return fields;
}

function parseSectionsFromHtml(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const pageRoot = (doc.querySelector("main") || doc.body) as HTMLElement;
  const semanticSections = Array.from(pageRoot.querySelectorAll("section"));

  const sectionElements: HTMLElement[] = semanticSections.length
    ? semanticSections
    : Array.from(pageRoot.children).filter((el) => el instanceof HTMLElement) as HTMLElement[];

  return sectionElements.map((sectionEl, index) => {
    const firstHeading = sectionEl.querySelector("h1, h2, h3, h4, h5, h6")?.textContent?.trim();
    const sectionId = sectionEl.id ? `section-${sectionEl.id}` : `section-${index + 1}`;
    const title = firstHeading || `Section ${index + 1}`;

    return {
      id: sectionId,
      title,
      fields: extractFieldsFromSection(sectionEl)
    } satisfies CmsSection;
  });
}

function applySavedValues(route: string, sections: CmsSection[]) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${route}`);
    if (!raw) {
      return sections;
    }

    const parsed = JSON.parse(raw) as SavedSection[];
    const savedBySection = new Map(parsed.map((entry) => [entry.id, entry.values]));

    return sections.map((section) => {
      const savedValues = savedBySection.get(section.id);
      if (!savedValues) {
        return section;
      }

      return {
        ...section,
        fields: section.fields.map((field) => ({
          ...field,
          value: savedValues[field.id] ?? field.value
        }))
      };
    });
  } catch {
    return sections;
  }
}

function readDraft(route: string) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${route}`);
    if (!raw) {
      return [] as SavedSection[];
    }

    return JSON.parse(raw) as SavedSection[];
  } catch {
    return [] as SavedSection[];
  }
}

function writeDraft(route: string, draft: SavedSection[]) {
  localStorage.setItem(`${STORAGE_PREFIX}${route}`, JSON.stringify(draft));
}

export default function CmsPage() {
  const [selectedRoute, setSelectedRoute] = useState<string>(CMS_PAGES[0].route);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedSectionId, setUpdatedSectionId] = useState<string | null>(null);

  const selectedPageLabel = useMemo(() => {
    return CMS_PAGES.find((page) => page.route === selectedRoute)?.label || "Selected Page";
  }, [selectedRoute]);

  useEffect(() => {
    let active = true;

    const loadPageSections = async () => {
      setLoading(true);
      setError(null);
      setUpdatedSectionId(null);

      try {
        const response = await fetch(selectedRoute, { cache: "no-store" });
        const html = await response.text();

        if (!active) {
          return;
        }

        const extractedSections = parseSectionsFromHtml(html);
        const mergedWithSavedValues = applySavedValues(selectedRoute, extractedSections);
        setSections(mergedWithSavedValues);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "Failed to load page content.");
        setSections([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPageSections();

    return () => {
      active = false;
    };
  }, [selectedRoute]);

  const updateFieldValue = (sectionId: string, fieldId: string, value: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          fields: section.fields.map((field) => (field.id === fieldId ? { ...field, value } : field))
        };
      })
    );
  };

  const handleUpdateSection = (sectionId: string) => {
    const section = sections.find((item) => item.id === sectionId);
    if (!section) {
      return;
    }

    const currentDraft = readDraft(selectedRoute);
    const sectionValues = Object.fromEntries(section.fields.map((field) => [field.id, field.value]));

    const draftWithoutSection = currentDraft.filter((item) => item.id !== sectionId);
    const updatedDraft: SavedSection[] = [...draftWithoutSection, { id: sectionId, values: sectionValues }];

    writeDraft(selectedRoute, updatedDraft);
    setUpdatedSectionId(sectionId);
  };

  return (
    <div className="space-y-6 font-dm-sans">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[22px] font-bold text-[#171717]">CMS Content Manager</div>
          <p className="text-[14px] text-[#525866] mt-1">
            Switch pages, edit section content, and update each section independently.
          </p>
        </div>

        <div className="w-full max-w-[320px]">
          <label className="block text-[12px] font-semibold text-[#525866] mb-1.5">Select Page</label>
          <select
            value={selectedRoute}
            onChange={(event) => setSelectedRoute(event.target.value)}
            className="w-full h-[42px] rounded-[10px] border border-[#D0D5DD] bg-white px-3 text-[14px] text-[#171717] outline-none focus:border-[#00A0E3]"
          >
            {CMS_PAGES.map((page) => (
              <option key={page.route} value={page.route}>
                {page.label} ({page.route})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-[12px] border border-[#EAECF0] bg-[#F9FAFB] p-4 text-[13px] text-[#525866]">
        Editing page: <span className="font-bold text-[#171717]">{selectedPageLabel}</span> ({selectedRoute})
      </div>

      {loading ? <div className="text-[14px] text-[#525866]">Loading sections...</div> : null}
      {error ? <div className="text-[14px] text-[#B42318]">{error}</div> : null}

      {!loading && !error && sections.length === 0 ? (
        <div className="rounded-[12px] border border-[#EAECF0] bg-white p-5 text-[14px] text-[#525866]">
          No semantic sections found. The selected page might be empty or rendered dynamically.
        </div>
      ) : null}

      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.id} className="rounded-[12px] border border-[#EAECF0] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAECF0] pb-3 mb-4">
              <div>
                <div className="text-[16px] font-bold text-[#171717]">{section.title}</div>
                <div className="text-[12px] text-[#667085] mt-0.5">{section.id}</div>
              </div>

              <button
                onClick={() => handleUpdateSection(section.id)}
                className="h-[36px] rounded-[8px] bg-[#00A0E3] px-4 text-[13px] font-semibold text-white hover:bg-[#008FCC] transition-colors"
              >
                Update Section
              </button>
            </div>

            {updatedSectionId === section.id ? (
              <div className="mb-3 rounded-[8px] bg-[#ECFDF3] border border-[#ABEFC6] px-3 py-2 text-[12px] text-[#067647]">
                Section updated successfully.
              </div>
            ) : null}

            {section.fields.length === 0 ? (
              <div className="rounded-[8px] bg-[#F9FAFB] px-3 py-2 text-[13px] text-[#667085]">
                No editable text/image fields discovered in this section.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {section.fields.map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="block text-[12px] font-semibold text-[#344054]">{field.label}</label>
                    <textarea
                      value={field.value}
                      onChange={(event) => updateFieldValue(section.id, field.id, event.target.value)}
                      rows={field.type === "paragraph" ? 4 : 2}
                      className="w-full rounded-[8px] border border-[#D0D5DD] bg-white px-3 py-2 text-[13px] text-[#171717] outline-none focus:border-[#00A0E3]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
