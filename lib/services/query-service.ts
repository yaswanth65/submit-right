import { supabaseAdmin } from "@/lib/supabase";
import { groupCatalogItems, listCatalogItems } from "@/lib/services/catalog-service";

export async function listServices() {
  const { cards } = await listCatalogItems({ activeOnly: true });
  return groupCatalogItems(cards);
}

export async function getClientHome(profileId: string) {
  const [{ data: user }, { data: documents }] = await Promise.all([
    supabaseAdmin.from("profiles").select("full_name, email").eq("id", profileId).single(),
    supabaseAdmin
      .from("documents")
      .select("*, services(title, image_url, rate_per_word, base_price, kind, slug)")
      .eq("client_id", profileId)
      .order("created_at", { ascending: false })
  ]);

  const services = await listServices();

  return {
    user,
    catalog: services,
    services: services.all,
    packages: services.packages,
    domains: services.domains,
    publicationSupportPackages: services.publicationSupportPackages,
    bestServices: services.best,
    otherServices: services.other,
    servicePages: services.servicePages,
    orders: documents ?? []
  };
}
