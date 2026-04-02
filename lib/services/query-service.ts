import { supabaseAdmin } from "@/lib/supabase";

export async function listServices() {
  const { data } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const rows = data ?? [];

  return {
    all: rows,
    publicationSupportPackages: rows.filter((row) => row.category === "publication_support_packages"),
    best: rows.filter((row) => row.is_best),
    other: rows.filter((row) => row.category === "other")
  };
}

export async function getClientHome(profileId: string) {
  const [{ data: user }, { data: documents }] = await Promise.all([
    supabaseAdmin.from("profiles").select("full_name, email").eq("id", profileId).single(),
    supabaseAdmin
      .from("documents")
      .select("*, services(title, image_url, rate_per_word)")
      .eq("client_id", profileId)
      .order("created_at", { ascending: false })
  ]);

  const services = await listServices();

  return {
    user,
    services: services.all,
    publicationSupportPackages: services.publicationSupportPackages,
    bestServices: services.best,
    otherServices: services.other,
    orders: documents ?? []
  };
}
