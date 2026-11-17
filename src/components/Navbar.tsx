import React, { useState } from 'react';
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Wrench,
  X,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/seed';
import { useStore } from '../context/StoreContext';
import { CurrencyCode, LanguageCode } from '../types/store';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    language,
    setLanguage,
    t,
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.shop, path: '/shop' },
    { label: t.nav.smartphones, path: '/smartphones' },
    { label: t.nav.laptops, path: '/laptops' },
    { label: t.nav.accessories, path: '/accessories' },
    { label: t.nav.repairs, path: '/repairs', isRepairs: true },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate('/shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27248E] rounded"
        >
          <img
            src={BUSINESS_INFO.logoPath}
            alt="RÉGIS ELECTRONICS Logo"
            className="w-9 h-9 object-contain rounded-md bg-[#F5F6FA] p-0.5 border border-slate-200"
          />
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#101039] whitespace-nowrap shrink-0">
            RÉGIS ELECTRONICS
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700"
          aria-label="Primary navigation"
        >
          {navLinks.map((item) => {
            const active = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  item.isRepairs
                    ? active
                      ? 'text-[#27248E] font-semibold'
                      : 'text-[#101039] font-semibold hover:text-[#27248E]'
                    : active
                    ? 'text-[#27248E] font-semibold'
                    : 'text-slate-700 hover:text-[#101039]'
                }`}
              >
                {item.isRepairs && <Wrench className="w-3.5 h-3.5 text-[#27248E]" />}
                <span>{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[21px] h-0.5 bg-[#27248E]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Tablet Condensed Nav (md to xl) */}
        <nav
          className="hidden md:flex xl:hidden items-center gap-4 text-sm font-medium text-slate-700 overflow-x-auto"
          aria-label="Tablet navigation"
        >
          {navLinks.slice(0, 6).map((item) => {
            const active = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1 ${
                  active || item.isRepairs
                    ? 'text-[#27248E] font-semibold'
                    : 'text-slate-700 hover:text-[#101039]'
                }`}
              >
                {item.isRepairs && <Wrench className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Icons + Compact Currency/Language + Mobile Visible Repairs Link */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop/Tablet Compact Currency & Language Selectors */}
          <div className="hidden md:flex items-center gap-1.5 mr-1">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Currency selector"
              className="px-2 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-[#101039] focus:outline-none focus:border-[#27248E] cursor-pointer"
            >
              <option value="DOP">🇩🇴 DOP (RD$)</option>
              <option value="USD">🇺🇸 USD ($)</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              aria-label="Language selector"
              className="px-2 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-[#101039] uppercase focus:outline-none focus:border-[#27248E] cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="ht">HT</option>
            </select>
          </div>

          {/* Clearly visible Repairs shortcut on mobile/tablet */}
          <button
            type="button"
            onClick={() => handleNavClick('/repairs')}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#101039] text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.nav.repairs}</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search products"
            className="p-2 rounded-lg text-slate-700 hover:text-[#101039] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('/wishlist')}
            aria-label={t.nav.wishlist}
            className="relative p-2 rounded-lg text-slate-700 hover:text-[#101039] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#27248E] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={t.nav.cart}
            className="relative p-2 rounded-lg text-slate-700 hover:text-[#101039] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#101039] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={t.nav.menu}
            className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-[#101039] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-[#F5F6FA] px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-medium hover:bg-[#27248E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          {/* Mobile Currency & Language Switchers */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-1 bg-[#F5F6FA] p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setCurrency('DOP')}
                className={`px-2.5 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                  currency === 'DOP' ? 'bg-[#101039] text-white' : 'text-slate-700'
                }`}
              >
                🇩🇴 DOP (RD$)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                  currency === 'USD' ? 'bg-[#101039] text-white' : 'text-slate-700'
                }`}
              >
                🇺🇸 USD ($)
              </button>
            </div>

            <div className="flex items-center gap-1 bg-[#F5F6FA] p-1 rounded-lg border border-slate-200">
              {(['en', 'es', 'ht'] as LanguageCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={`px-2.5 py-1.5 rounded text-xs font-semibold uppercase cursor-pointer ${
                    language === code ? 'bg-[#27248E] text-white' : 'text-slate-700'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3 py-2.5 rounded-lg text-left text-sm font-medium flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-[#101039] text-white'
                      : item.isRepairs
                      ? 'bg-[#27248E]/10 text-[#27248E] font-semibold'
                      : 'bg-[#F5F6FA] text-slate-800 hover:bg-slate-200/70'
                  }`}
                >
                  {item.isRepairs && <Wrench className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavClick('/admin')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#101039] bg-[#F5F6FA] border border-slate-200 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.nav.admin}</span>
            </button>
            <span className="text-xs text-slate-500">{BUSINESS_INFO.whatsappDisplay}</span>
          </div>
        </div>
      )}
    </header>
  );
};
