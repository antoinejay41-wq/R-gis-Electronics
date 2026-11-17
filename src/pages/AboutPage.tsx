import React from 'react';
import { Globe, ShieldCheck, Wrench } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/seed';

export const AboutPage: React.FC = () => {
  const { t, navigate } = useStore();

  return (
    <div className="bg-[#F5F6FA] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white border border-slate-200 rounded-xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#101039]">
              {t.about.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">{t.about.subtitle}</p>
            <h2 className="font-display font-semibold text-xl text-[#101039] pt-2">
              {t.about.missionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.about.missionBody}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
              >
                {t.nav.shop}
              </button>
              <button
                type="button"
                onClick={() => navigate('/repairs')}
                className="px-5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-300 text-[#101039] text-sm font-semibold hover:border-[#27248E] transition-colors cursor-pointer"
              >
                {t.nav.repairs}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
              <ResilientImage
                src={BUSINESS_INFO.heroImage}
                alt="RÉGIS ELECTRONICS Showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#101039]">
            {t.about.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <Globe className="w-6 h-6 text-[#27248E]" />
              <h3 className="font-display font-semibold text-lg text-[#101039]">
                {t.about.value1Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.about.value1Body}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-[#27248E]" />
              <h3 className="font-display font-semibold text-lg text-[#101039]">
                {t.about.value2Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.about.value2Body}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <Wrench className="w-6 h-6 text-[#27248E]" />
              <h3 className="font-display font-semibold text-lg text-[#101039]">
                {t.about.value3Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.about.value3Body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
