import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TRANSLATIONS, Translations } from '../i18n/translations';
import { storeRepository } from '../services/repository';
import {
  CartItem,
  CurrencyCode,
  CurrencySettings,
  DeliveryZone,
  LanguageCode,
  Product,
  RepairServiceCategory,
  RepairSettings,
  StoreLocation,
  StoreStateSnapshot,
} from '../types/store';

interface StoreContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  snapshot: StoreStateSnapshot;
  updateSnapshot: (updater: (prev: StoreStateSnapshot) => StoreStateSnapshot) => void;
  resetDemoData: () => void;

  // Helpers for admin mutations
  upsertProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateCurrencySettings: (settings: CurrencySettings) => void;
  upsertDeliveryZone: (zone: DeliveryZone) => void;
  deleteDeliveryZone: (zoneId: string) => void;
  upsertStoreLocation: (loc: StoreLocation) => void;
  deleteStoreLocation: (locId: string) => void;
  upsertRepairService: (service: RepairServiceCategory) => void;
  deleteRepairService: (serviceId: string) => void;
  updateRepairSettings: (settings: RepairSettings) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotalUsd: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Search modal / preselected repair category
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  preselectedRepairCategory: string;
  setPreselectedRepairCategory: (cat: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const normalizeRoutePath = (raw: string): string => {
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`;
  if (withLeadingSlash.length > 1) {
    return withLeadingSlash.replace(/\/+$/, '') || '/';
  }
  return withLeadingSlash || '/';
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizeRoutePath(window.location.pathname || '/');
  });
  const [language, setLanguageState] = useState<LanguageCode>(() => storeRepository.loadLanguage());
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => storeRepository.loadCurrency());
  const [snapshot, setSnapshot] = useState<StoreStateSnapshot>(() => storeRepository.loadSnapshot());
  const [cart, setCart] = useState<CartItem[]>(() => storeRepository.loadCart());
  const [wishlist, setWishlist] = useState<string[]>(() => storeRepository.loadWishlist());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [preselectedRepairCategory, setPreselectedRepairCategory] = useState('');

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizeRoutePath(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    const [rawPath, hash] = path.split('#');
    const normalized = normalizeRoutePath(rawPath);
    if (normalizeRoutePath(window.location.pathname) !== normalized || hash) {
      window.history.pushState({}, '', hash ? `${normalized}#${hash}` : normalized);
      setCurrentPath(normalized);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    storeRepository.saveLanguage(lang);
    document.documentElement.lang = lang;
  };

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    storeRepository.saveCurrency(curr);
  };

  const updateSnapshot = (updater: (prev: StoreStateSnapshot) => StoreStateSnapshot) => {
    setSnapshot((prev) => {
      const next = updater(prev);
      storeRepository.saveSnapshot(next);
      return next;
    });
  };

  const resetDemoData = () => {
    const reset = storeRepository.resetSnapshot();
    setSnapshot(reset);
  };

  const upsertProduct = (product: Product) => {
    updateSnapshot((prev) => {
      const exists = prev.products.some((p) => p.id === product.id);
      return {
        ...prev,
        products: exists
          ? prev.products.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev.products],
      };
    });
  };

  const deleteProduct = (productId: string) => {
    updateSnapshot((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
  };

  const updateCurrencySettings = (currencySettings: CurrencySettings) => {
    updateSnapshot((prev) => ({ ...prev, currencySettings }));
  };

  const upsertDeliveryZone = (zone: DeliveryZone) => {
    updateSnapshot((prev) => {
      const exists = prev.deliveryZones.some((z) => z.id === zone.id);
      return {
        ...prev,
        deliveryZones: exists
          ? prev.deliveryZones.map((z) => (z.id === zone.id ? zone : z))
          : [...prev.deliveryZones, zone],
      };
    });
  };

  const deleteDeliveryZone = (zoneId: string) => {
    updateSnapshot((prev) => ({
      ...prev,
      deliveryZones: prev.deliveryZones.filter((z) => z.id !== zoneId),
    }));
  };

  const upsertStoreLocation = (loc: StoreLocation) => {
    updateSnapshot((prev) => {
      const exists = prev.storeLocations.some((l) => l.id === loc.id);
      return {
        ...prev,
        storeLocations: exists
          ? prev.storeLocations.map((l) => (l.id === loc.id ? loc : l))
          : [...prev.storeLocations, loc],
      };
    });
  };

  const deleteStoreLocation = (locId: string) => {
    updateSnapshot((prev) => ({
      ...prev,
      storeLocations: prev.storeLocations.filter((l) => l.id !== locId),
    }));
  };

  const upsertRepairService = (service: RepairServiceCategory) => {
    updateSnapshot((prev) => {
      const exists = prev.repairServices.some((s) => s.id === service.id);
      return {
        ...prev,
        repairServices: exists
          ? prev.repairServices.map((s) => (s.id === service.id ? service : s))
          : [...prev.repairServices, service],
      };
    });
  };

  const deleteRepairService = (serviceId: string) => {
    updateSnapshot((prev) => ({
      ...prev,
      repairServices: prev.repairServices.filter((s) => s.id !== serviceId),
    }));
  };

  const updateRepairSettings = (repairSettings: RepairSettings) => {
    updateSnapshot((prev) => ({ ...prev, repairSettings }));
  };

  // Cart persistence
  const persistCart = (next: CartItem[]) => {
    setCart(next);
    storeRepository.saveCart(next);
  };

  const addToCart = (productId: string, variantId: string, quantity = 1) => {
    const existing = cart.find((c) => c.productId === productId && c.variantId === variantId);
    if (existing) {
      persistCart(
        cart.map((c) =>
          c.productId === productId && c.variantId === variantId
            ? { ...c, quantity: c.quantity + quantity }
            : c
        )
      );
    } else {
      persistCart([...cart, { productId, variantId, quantity }]);
    }
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    persistCart(
      cart.map((c) =>
        c.productId === productId && c.variantId === variantId ? { ...c, quantity } : c
      )
    );
  };

  const removeFromCart = (productId: string, variantId: string) => {
    persistCart(cart.filter((c) => !(c.productId === productId && c.variantId === variantId)));
  };

  const clearCart = () => {
    persistCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      storeRepository.saveWishlist(next);
      return next;
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const cartSubtotalUsd = useMemo(() => {
    return cart.reduce((sum, item) => {
      const prod = snapshot.products.find((p) => p.id === item.productId);
      if (!prod) return sum;
      const variant = prod.variants.find((v) => v.id === item.variantId) ?? prod.variants[0];
      const unitUsd = prod.basePriceUsd + (variant?.priceDeltaUsd ?? 0);
      return sum + unitUsd * item.quantity;
    }, 0);
  }, [cart, snapshot.products]);

  const t = TRANSLATIONS[language];

  return (
    <StoreContext.Provider
      value={{
        currentPath,
        navigate,
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        snapshot,
        updateSnapshot,
        resetDemoData,
        upsertProduct,
        deleteProduct,
        updateCurrencySettings,
        upsertDeliveryZone,
        deleteDeliveryZone,
        upsertStoreLocation,
        deleteStoreLocation,
        upsertRepairService,
        deleteRepairService,
        updateRepairSettings,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotalUsd,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery,
        preselectedRepairCategory,
        setPreselectedRepairCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
