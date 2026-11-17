import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types/store';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'all';
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory = 'all' }) => {
  const { snapshot, navigate, searchQuery, setSearchQuery, t } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const activeCategory: ProductCategory | 'all' = initialCategory;

  const brands = useMemo(() => {
    const unique = Array.from(new Set(snapshot.products.map((p) => p.brand)));
    return unique.sort();
  }, [snapshot.products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = snapshot.products.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
      if (q) {
        const hay = `${product.name} ${product.brand} ${product.sku} ${product.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.basePriceUsd - b.basePriceUsd);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.basePriceUsd - a.basePriceUsd);
    }
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [snapshot.products, activeCategory, selectedBrand, searchQuery, sortBy]);

  const categoryTabs: Array<{ key: ProductCategory | 'all'; label: string; path: string }> = [
    { key: 'all', label: t.shop.allProducts, path: '/shop' },
    { key: 'smartphones', label: t.shop.smartphones, path: '/smartphones' },
    { key: 'laptops', label: t.shop.laptops, path: '/laptops' },
    { key: 'accessories', label: t.shop.accessories, path: '/accessories' },
  ];

  const pageTitle =
    categoryTabs.find((c) => c.key === activeCategory)?.label ?? t.shop.allProducts;

  return (
    <div className="bg-[#F5F6FA] min-h-[70vh]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
            {pageTitle}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">{t.currency.confirmNotice}</p>

          {/* Category Segmented Tabs + Filters */}
          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F6FA] rounded-lg border border-slate-200 w-fit">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => navigate(tab.path)}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-[#101039] text-white'
                      : 'text-slate-700 hover:text-[#101039]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:flex-initial min-w-[210px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                aria-label={t.shop.filterByBrand}
                className="px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
              >
                <option value="all">{t.shop.allBrands}</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')
                }
                aria-label={t.shop.sortBy}
                className="px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
              >
                <option value="featured">{t.shop.sortFeatured}</option>
                <option value="price-asc">{t.shop.sortPriceAsc}</option>
                <option value="price-desc">{t.shop.sortPriceDesc}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 text-xs font-medium text-slate-500 tabular-nums">
          {filteredProducts.length} {t.shop.resultsCount}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <p className="text-base text-slate-700">{t.shop.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedBrand('all');
                setSearchQuery('');
                navigate('/shop');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
            >
              {t.shop.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
