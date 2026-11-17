import React, { useEffect, useState } from 'react';
import {
  BatteryCharging,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  Gamepad2,
  Laptop,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Upload,
  Wrench,
} from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/seed';
import { CountryCode, RepairIconName, RepairServiceCategory } from '../types/store';
import { formatCurrency } from '../utils/currency';
import { buildRepairWhatsappMessage, buildWhatsappUrl } from '../utils/whatsapp';

const renderRepairIcon = (icon: RepairIconName) => {
  const cls = 'w-5 h-5 text-[#27248E]';
  switch (icon) {
    case 'smartphone':
      return <Smartphone className={cls} />;
    case 'laptop':
      return <Laptop className={cls} />;
    case 'tablet':
      return <Tablet className={cls} />;
    case 'gamepad':
      return <Gamepad2 className={cls} />;
    case 'battery':
      return <BatteryCharging className={cls} />;
    case 'monitor':
      return <Monitor className={cls} />;
    case 'cpu':
      return <Cpu className={cls} />;
    default:
      return <Wrench className={cls} />;
  }
};

export const RepairsPage: React.FC = () => {
  const {
    snapshot,
    currency,
    language,
    t,
    navigate,
    preselectedRepairCategory,
    setPreselectedRepairCategory,
  } = useStore();

  // Strictly display ONLY categories enabled by the business owner
  const enabledServices = snapshot.repairServices.filter((s) => s.enabled);

  const [customerName, setCustomerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [country, setCountry] = useState<CountryCode>('DR');
  const [city, setCity] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [issueStarted, setIssueStarted] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone'>('whatsapp');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [generatedInquiry, setGeneratedInquiry] = useState<{
    message: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedRepairCategory) {
      setDeviceCategory(preselectedRepairCategory);
      setPreselectedRepairCategory('');
    } else if (!deviceCategory && enabledServices.length > 0) {
      setDeviceCategory(enabledServices[0].name);
    }
  }, [preselectedRepairCategory, setPreselectedRepairCategory, enabledServices, deviceCategory]);

  const handleSelectService = (service: RepairServiceCategory) => {
    setDeviceCategory(service.name);
    setGeneratedInquiry(null);
    const formEl = document.getElementById('request-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedPhotos(files.slice(0, 5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !customerName.trim() ||
      !whatsappPhone.trim() ||
      !city.trim() ||
      !deviceCategory.trim() ||
      !deviceBrand.trim() ||
      !deviceModel.trim() ||
      !problemDescription.trim()
    ) {
      setErrorMsg(t.repairs.validationError);
      return;
    }

    const message = buildRepairWhatsappMessage({
      language,
      customerName: customerName.trim(),
      whatsappPhone: whatsappPhone.trim(),
      country,
      city: city.trim(),
      deviceCategory: deviceCategory.trim(),
      deviceBrand: deviceBrand.trim(),
      deviceModel: deviceModel.trim(),
      problemDescription: problemDescription.trim(),
      issueStarted: issueStarted.trim(),
      preferredContact,
      photoNames: selectedPhotos.map((f) => f.name),
      additionalNotes: additionalNotes.trim(),
    });

    setGeneratedInquiry({
      message,
      url: buildWhatsappUrl(message),
    });
  };

  const handleCopy = async () => {
    if (!generatedInquiry) return;
    try {
      await navigator.clipboard.writeText(generatedInquiry.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore
    }
  };

  const categorySelectOptions =
    enabledServices.length > 0
      ? enabledServices.map((s) => s.name)
      : [
          'Smartphone',
          'Laptop / Computer',
          'Tablet',
          'Gaming Console',
          'Other Electronics',
        ];

  return (
    <div className="bg-[#F5F6FA]">
      {/* Page Hero */}
      <section className="bg-[#101039] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Wrench className="w-4 h-4" />
                <span>RÉGIS ELECTRONICS · {BUSINESS_INFO.whatsappDisplay}</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-balance">
                {t.repairs.headline}
              </h1>

              <p className="text-base text-slate-200 leading-relaxed max-w-2xl">
                {t.repairs.subheading}
              </p>

              <div className="pt-2">
                <a
                  href="#request-form"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#101039] text-sm font-semibold hover:bg-[#F5F6FA] transition-colors"
                >
                  <span>{t.repairs.requestRepairBtn}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-[#1B1A5E]">
                <ResilientImage
                  src={BUSINESS_INFO.repairBannerImage}
                  alt="Electronics Repair Diagnostics Workbench"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Policy Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-sm text-[#101039]">
              {t.repairs.pricingBannerTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {snapshot.repairSettings.repairPolicyNote || t.repairs.pricingDefault}
            </p>
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
            DR &amp; Haiti · WhatsApp {BUSINESS_INFO.whatsappDisplay}
          </div>
        </div>
      </section>

      {/* Enabled Repair Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {enabledServices.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display font-bold text-lg text-[#101039]">
                {t.repairs.noEnabledServicesTitle}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.repairs.noEnabledServicesBody}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-300 text-xs font-semibold text-[#101039] hover:border-[#27248E] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.repairs.goToAdminServices}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enabledServices.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F6FA] border border-slate-200 flex items-center justify-center">
                    {renderRepairIcon(service.icon)}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#101039]">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-slate-600">
                    {service.pricingMode !== 'estimate' && service.priceUsd !== null ? (
                      <span className="font-mono-tabular font-semibold text-[#101039]">
                        {service.pricingMode === 'starting_at'
                          ? `${t.repairs.startingAt} `
                          : ''}
                        {formatCurrency(
                          service.priceUsd,
                          currency,
                          snapshot.currencySettings.dopPerUsd
                        )}
                      </span>
                    ) : (
                      <span>Estimate on WhatsApp</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectService(service)}
                    className="px-4 py-2 rounded-lg bg-[#101039] text-white text-xs font-semibold hover:bg-[#27248E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {t.repairs.requestRepairBtn}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Supported Locations (only if configured by admin) */}
        {snapshot.repairSettings.supportedLocations.length > 0 && (
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-display font-semibold text-sm text-[#101039] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#27248E]" />
              <span>{t.repairs.supportedLocationsTitle}</span>
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
              {snapshot.repairSettings.supportedLocations.map((loc) => (
                <span key={loc.id}>
                  {loc.country === 'DR' ? '🇩🇴' : '🇭🇹'} {loc.location}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Repair Request Form */}
      <section id="request-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 lg:p-10">
          <div className="mb-8 pb-6 border-b border-slate-200">
            <h2 className="font-display font-bold text-2xl text-[#101039]">
              {t.repairs.formTitle}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">{t.repairs.formSubtitle}</p>
          </div>

          {generatedInquiry ? (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-[#F5F6FA] border border-slate-200 space-y-2">
                <h3 className="font-display font-bold text-lg text-[#101039]">
                  {t.repairs.generatedTitle}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t.repairs.generatedNotice}
                </p>
                {selectedPhotos.length > 0 && (
                  <p className="text-xs font-semibold text-[#27248E]">
                    {t.repairs.manualPhotoReminder}
                  </p>
                )}
              </div>

              <div className="bg-[#F5F6FA] border border-slate-200 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-xs font-mono text-slate-800 leading-relaxed">
                  {generatedInquiry.message}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={generatedInquiry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors"
                >
                  <span>{t.repairs.openWhatsappBtn}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#F5F6FA] border border-slate-300 text-slate-800 text-sm font-semibold hover:border-[#101039] cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.repairs.copied : t.repairs.copyMessageBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGeneratedInquiry(null)}
                  className="text-sm font-medium text-slate-600 hover:text-[#101039] underline underline-offset-4 cursor-pointer"
                >
                  {t.checkout.editDetails}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.whatsappPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 829 ... / +509 ..."
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.country} *
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.cityLocation} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={country === 'DR' ? 'Santo Domingo, Santiago...' : 'Port-au-Prince, Cap-Haïtien...'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.deviceCategory} *
                  </label>
                  <select
                    required
                    value={deviceCategory}
                    onChange={(e) => setDeviceCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  >
                    <option value="">{t.checkout.selectOption}</option>
                    {categorySelectOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.deviceBrand} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apple, Samsung, HP, Sony..."
                    value={deviceBrand}
                    onChange={(e) => setDeviceBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.deviceModel} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="iPhone 13 Pro, MacBook Air..."
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.repairs.problemDescription} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.issueStarted}
                  </label>
                  <input
                    type="text"
                    placeholder={t.repairs.issueStartedPlaceholder}
                    value={issueStarted}
                    onChange={(e) => setIssueStarted(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.repairs.preferredContact}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredContact('whatsapp')}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                        preferredContact === 'whatsapp'
                          ? 'bg-[#101039] text-white border-[#101039]'
                          : 'bg-[#F5F6FA] text-slate-700 border-slate-200'
                      }`}
                    >
                      {t.repairs.contactWhatsapp}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredContact('phone')}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                        preferredContact === 'phone'
                          ? 'bg-[#101039] text-white border-[#101039]'
                          : 'bg-[#F5F6FA] text-slate-700 border-slate-200'
                      }`}
                    >
                      {t.repairs.contactPhone}
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Photo Selection with Honest WhatsApp Link Limitation Note */}
              <div className="p-4 rounded-lg bg-[#F5F6FA] border border-slate-200 space-y-2.5">
                <label className="block text-xs font-semibold text-slate-700">
                  {t.repairs.photoLabel}
                </label>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-[#101039] hover:border-[#27248E] cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Select Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                {selectedPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedPhotos.map((file, idx) => (
                      <span
                        key={`${file.name}-${idx}`}
                        className="text-xs font-mono text-[#101039] bg-white px-2.5 py-1 rounded border border-slate-200"
                      >
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.repairs.photoHelper}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.repairs.additionalNotes}
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                />
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700"
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
              >
                {t.repairs.submitBtn}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
