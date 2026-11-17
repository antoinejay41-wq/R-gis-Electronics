import { INITIAL_SNAPSHOT } from '../data/seed';
import {
  CartItem,
  CurrencyCode,
  LanguageCode,
  StoreStateSnapshot,
} from '../types/store';

const STORAGE_KEYS = {
  storeSnapshot: 'regis_electronics_store_v1',
  currency: 'regis_electronics_currency_v1',
  language: 'regis_electronics_language_v1',
  cart: 'regis_electronics_cart_v1',
  wishlist: 'regis_electronics_wishlist_v1',
};

/**
 * Modular persistence repository backed by LocalStorage today,
 * intentionally structured to swap to Firebase Firestore without altering UI components.
 */
export const storeRepository = {
  loadSnapshot(): StoreStateSnapshot {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.storeSnapshot);
      if (!raw) return INITIAL_SNAPSHOT;
      const parsed = JSON.parse(raw) as Partial<StoreStateSnapshot>;
      return {
        products: Array.isArray(parsed.products) ? parsed.products : INITIAL_SNAPSHOT.products,
        currencySettings: parsed.currencySettings ?? INITIAL_SNAPSHOT.currencySettings,
        deliveryZones: Array.isArray(parsed.deliveryZones)
          ? parsed.deliveryZones
          : INITIAL_SNAPSHOT.deliveryZones,
        storeLocations: Array.isArray(parsed.storeLocations)
          ? parsed.storeLocations
          : INITIAL_SNAPSHOT.storeLocations,
        repairServices: Array.isArray(parsed.repairServices)
          ? parsed.repairServices
          : INITIAL_SNAPSHOT.repairServices,
        repairSettings: parsed.repairSettings ?? INITIAL_SNAPSHOT.repairSettings,
      };
    } catch {
      return INITIAL_SNAPSHOT;
    }
  },

  saveSnapshot(snapshot: StoreStateSnapshot): void {
    try {
      localStorage.setItem(STORAGE_KEYS.storeSnapshot, JSON.stringify(snapshot));
    } catch {
      // Ignore storage quota errors cleanly
    }
  },

  resetSnapshot(): StoreStateSnapshot {
    try {
      localStorage.removeItem(STORAGE_KEYS.storeSnapshot);
    } catch {
      // Ignore
    }
    return INITIAL_SNAPSHOT;
  },

  loadCurrency(): CurrencyCode {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.currency);
      return val === 'DOP' || val === 'USD' ? val : 'DOP';
    } catch {
      return 'DOP';
    }
  },

  saveCurrency(currency: CurrencyCode): void {
    try {
      localStorage.setItem(STORAGE_KEYS.currency, currency);
    } catch {
      // Ignore
    }
  },

  loadLanguage(): LanguageCode {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.language);
      return val === 'en' || val === 'es' || val === 'ht' ? val : 'en';
    } catch {
      return 'en';
    }
  },

  saveLanguage(language: LanguageCode): void {
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      // Ignore
    }
  },

  loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.cart);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  },

  loadWishlist(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.wishlist);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveWishlist(wishlist: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  },
};
