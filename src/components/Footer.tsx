import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/seed';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, t } = useStore();

  return (
    <footer className="bg-[#101039] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={BUSINESS_INFO.logoPath}
                alt="RÉGIS ELECTRONICS"
                className="w-9 h-9 rounded-md bg-[#F5F6FA] p-0.5 object-contain"
              />
              <span className="font-display font-bold text-base tracking-tight">
                RÉGIS ELECTRONICS
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{t.footer.tagline}</p>
            <a
              href={BUSINESS_INFO.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-slate-200 underline underline-offset-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {t.footer.whatsappLabel}: {BUSINESS_INFO.whatsappDisplay}
              </span>
            </a>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm mb-3 text-white">
              {t.footer.catalogHeading}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.shop}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/smartphones')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.smartphones}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/laptops')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.laptops}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/accessories')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.accessories}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm mb-3 text-white">
              {t.footer.supportHeading}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/repairs')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.repairs}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="hover:text-white cursor-pointer"
                >
                  {t.nav.admin}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm mb-3 text-white">
              {t.footer.marketsHeading}
            </h3>
            <p className="text-sm text-slate-300 mb-2">{t.footer.marketsList}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{t.footer.currencyNote}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            © {new Date().getFullYear()} RÉGIS ELECTRONICS. {t.footer.rights}
          </span>
          <span>{t.currency.confirmNotice}</span>
        </div>
      </div>
    </footer>
  );
};
