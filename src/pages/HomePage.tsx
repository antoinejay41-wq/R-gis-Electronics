import React from 'react';
import { ArrowRight, Globe, MessageCircle, ShieldCheck, Wrench } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO, INITIAL_REPAIR_SETTINGS } from '../data/seed';

export const HomePage: React.FC = () => {
  const { navigate, snapshot, t, language } = useStore();
  const featuredProducts = snapshot.products.filter((p) => p.featured).slice(0, 6);

  // If the admin has not customized the English default, provide clean translations in ES/HT so languages never mix
  const isDefaultRepairHeadline =
    snapshot.repairSettings.homepageHeadline === INITIAL_REPAIR_SETTINGS.homepageHeadline;
  const isDefaultRepairDesc =
    snapshot.repairSettings.homepageDescription === INITIAL_REPAIR_SETTINGS.homepageDescription;

  const repairHeadline =
    !isDefaultRepairHeadline || language === 'en'
      ? snapshot.repairSettings.homepageHeadline
      : language === 'es'
      ? 'Tu Dispositivo Merece una Segunda Vida.'
      : 'Aparèy Ou a Merite yon Dezyèm Lavi.';

  const repairDescription =
    !isDefaultRepairDesc || language === 'en'
      ? snapshot.repairSettings.homepageDescription
      : language === 'es'
      ? '¿Necesitas ayuda con un equipo dañado o con fallas? Contacta a nuestro equipo para evaluar opciones de reparación.'
      : 'Ou bezwen èd ak yon aparèy ki kraze oswa ki pa mache byen? Kontakte ekip nou an pou diskite sou opsyon reparasyon.';

  return (
    <div className="bg-[#F5F6FA]">
      {/* 1. Storefront Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="text-xs font-medium text-[#27248E] tracking-wide">
                {t.home.heroKicker} · DOP &amp; USD
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101039] tracking-tight leading-[1.1] text-balance">
                {t.home.heroTitle}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                {t.home.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.home.heroShopCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/repairs')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F5F6FA] border border-slate-300 text-[#101039] text-sm font-semibold hover:border-[#27248E] hover:text-[#27248E] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{t.home.heroRepairsCta}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[260px] sm:min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-[#101039]">
                <ResilientImage
                  src={BUSINESS_INFO.heroImage}
                  alt="RÉGIS ELECTRONICS flagship smartphones and laptops"
                  fallbackLabel="RÉGIS ELECTRONICS Hardware"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
              {t.home.featuredHeading}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              {t.home.featuredSubheading}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27248E] hover:text-[#101039] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Repair Services Spotlight (Directly below Featured Products) */}
      <section className="bg-[#101039] text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Wrench className="w-4 h-4 text-white" />
                <span>RÉGIS ELECTRONICS · {t.nav.repairs}</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight text-balance">
                {repairHeadline}
              </h2>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                {repairDescription}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                {snapshot.repairSettings.repairPolicyNote}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/repairs')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#101039] text-sm font-semibold hover:bg-[#F5F6FA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.home.repairExploreCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/repairs#request-form')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#27248E] text-white text-sm font-semibold border border-white/20 hover:bg-[#312EB0] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{t.home.repairRequestCta}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[240px] sm:min-h-[320px] rounded-xl overflow-hidden border border-white/15 bg-[#1B1A5E]">
                <ResilientImage
                  src={BUSINESS_INFO.repairBannerImage}
                  alt="Precision electronics repair bench at RÉGIS ELECTRONICS"
                  fallbackLabel="Electronics Repair Diagnostics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dominican Republic & Haiti Markets + Direct WhatsApp Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
            {t.home.marketsHeading}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600">{t.home.marketsSubheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <Globe className="w-6 h-6 text-[#27248E]" />
            <h3 className="font-display font-semibold text-lg text-[#101039]">
              {t.home.drCardTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.drCardBody}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#27248E]" />
            <h3 className="font-display font-semibold text-lg text-[#101039]">
              {t.home.htCardTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.htCardBody}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <MessageCircle className="w-6 h-6 text-[#27248E]" />
            <h3 className="font-display font-semibold text-lg text-[#101039]">
              {t.home.whatsappOrderTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.whatsappOrderBody}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
