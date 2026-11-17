export type CurrencyCode = 'DOP' | 'USD';
export type LanguageCode = 'en' | 'es' | 'ht';
export type CountryCode = 'DR' | 'HT';

export type ProductCategory = 'smartphones' | 'laptops' | 'accessories' | 'tablets';

export interface ProductVariant {
  id: string;
  label: string;
  priceDeltaUsd: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  category: ProductCategory;
  name: string;
  shortDescription: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  basePriceUsd: number;
  image: string;
  featured: boolean;
  inStock: boolean;
  specs: Array<{ label: string; value: string }>;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface DeliveryZone {
  id: string;
  country: CountryCode;
  zoneName: string;
  feeUsd: number | null; // null => "To be confirmed"
  estimatedNote: string;
  active: boolean;
}

export interface StoreLocation {
  id: string;
  country: CountryCode;
  name: string;
  city: string;
  address: string;
  hours: string;
  active: boolean;
}

export type RepairIconName =
  | 'smartphone'
  | 'laptop'
  | 'tablet'
  | 'gamepad'
  | 'battery'
  | 'monitor'
  | 'cpu'
  | 'wrench';

export type RepairPricingMode = 'estimate' | 'starting_at' | 'fixed';

export interface RepairServiceCategory {
  id: string;
  name: string;
  icon: RepairIconName;
  description: string;
  enabled: boolean; // False by default for proposed categories until owner enables
  pricingMode: RepairPricingMode;
  priceUsd: number | null;
}

export interface RepairSettings {
  homepageHeadline: string;
  homepageDescription: string;
  repairPolicyNote: string;
  supportedLocations: Array<{
    id: string;
    country: CountryCode;
    location: string;
  }>;
}

export interface CurrencySettings {
  dopPerUsd: number; // Maintained manually in admin dashboard
  lastUpdatedNote: string;
}

/**
 * Future Firestore collection schema blueprint (`repair_tickets`)
 * Kept cleanly typed so Firebase Firestore integration can drop in seamlessly.
 */
export interface RepairTicketSchema {
  ticketId: string;
  customerName: string;
  whatsappPhone: string;
  country: CountryCode;
  city: string;
  deviceCategory: string;
  deviceBrand: string;
  deviceModel: string;
  problemDescription: string;
  issueStarted?: string;
  preferredContact: 'whatsapp' | 'phone';
  status: 'draft_whatsapp_pending' | 'received' | 'diagnosing' | 'quoted' | 'completed';
  createdAtIso: string;
}

export interface StoreStateSnapshot {
  products: Product[];
  currencySettings: CurrencySettings;
  deliveryZones: DeliveryZone[];
  storeLocations: StoreLocation[];
  repairServices: RepairServiceCategory[];
  repairSettings: RepairSettings;
}
