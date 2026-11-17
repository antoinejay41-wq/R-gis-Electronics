import React, { useState } from 'react';
import { ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/seed';
import { CountryCode } from '../types/store';
import { buildWhatsappUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { snapshot, t } = useStore();
  const [name, setName] = useState('');
  const [country, setCountry] = useState<CountryCode>('DR');
  const [message, setMessage] = useState('');

  const activeLocations = snapshot.storeLocations.filter((l) => l.active);

  const builtMessage = `Hello RÉGIS ELECTRONICS,\nName: ${name || '-'}\nCountry: ${
    country === 'DR' ? 'Dominican Republic' : 'Haiti'
  }\nMessage: ${message || 'I have a general inquiry.'}`;

  return (
    <div className="bg-[#F5F6FA] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#101039]">{t.contact.title}</h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#101039] text-white rounded-xl p-6 space-y-4">
              <MessageCircle className="w-7 h-7 text-white" />
              <h2 className="font-display font-bold text-xl">
                {t.contact.whatsappDirectTitle}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.contact.whatsappDirectBody}
              </p>
              <div className="font-mono-tabular text-lg font-semibold">
                {BUSINESS_INFO.whatsappDisplay}
              </div>
              <a
                href={BUSINESS_INFO.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#101039] text-sm font-semibold hover:bg-[#F5F6FA] transition-colors"
              >
                <span>{t.contact.openChatBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <h3 className="font-display font-semibold text-base text-[#101039] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#27248E]" />
                <span>{t.contact.locationsTitle}</span>
              </h3>
              {activeLocations.length === 0 ? (
                <p className="text-sm text-slate-600">{t.contact.locationsEmpty}</p>
              ) : (
                <ul className="space-y-3">
                  {activeLocations.map((loc) => (
                    <li
                      key={loc.id}
                      className="text-sm text-slate-700 border-t border-slate-100 pt-2.5 first:border-t-0 first:pt-0"
                    >
                      <div className="font-semibold text-[#101039]">
                        {loc.country === 'DR' ? '🇩🇴' : '🇭🇹'} {loc.name}
                      </div>
                      <div className="text-xs text-slate-600">
                        {loc.city} · {loc.address}
                      </div>
                      {loc.hours && (
                        <div className="text-xs text-slate-500 mt-0.5">{loc.hours}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
            <h2 className="font-display font-bold text-xl text-[#101039]">
              {t.contact.quickFormTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.contact.countryLabel}
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                >
                  <option value="DR">🇩🇴 {t.checkout.drName}</option>
                  <option value="HT">🇭🇹 {t.checkout.htName}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.contact.messageLabel}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
              />
            </div>

            <a
              href={buildWhatsappUrl(builtMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors"
            >
              <span>{t.contact.sendWhatsappBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
