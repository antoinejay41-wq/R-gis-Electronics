import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Info, MapPin, ShoppingBag } from 'lucide-react';
import { DR_PROVINCES, HAITI_DEPARTMENTS } from '../data/seed';
import { useStore } from '../context/StoreContext';
import { CountryCode } from '../types/store';
import { formatCurrency } from '../utils/currency';
import {
  buildOrderWhatsappMessage,
  buildWhatsappUrl,
  generateOrderReference,
} from '../utils/whatsapp';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    snapshot,
    currency,
    language,
    t,
    cartSubtotalUsd,
    navigate,
    clearCart,
  } = useStore();

  const [country, setCountry] = useState<CountryCode>('DR');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('');
  const [selectedPickupId, setSelectedPickupId] = useState<string>('');

  const [fullName, setFullName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [region, setRegion] = useState(''); // Province (DR) or Department (HT)
  const [city, setCity] = useState(''); // Municipality (DR) or Commune (HT)
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [generatedOrder, setGeneratedOrder] = useState<{
    orderRef: string;
    message: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const countryZones = useMemo(
    () => snapshot.deliveryZones.filter((z) => z.active && z.country === country),
    [snapshot.deliveryZones, country]
  );

  const activeLocations = useMemo(
    () => snapshot.storeLocations.filter((l) => l.active && l.country === country),
    [snapshot.storeLocations, country]
  );

  // Pickup is supported ONLY when a valid store location is configured for the country
  const pickupSupported = activeLocations.length > 0;

  useEffect(() => {
    setRegion('');
    setSelectedZoneId('');
  }, [country]);

  useEffect(() => {
    if (!pickupSupported && fulfillmentType === 'pickup') {
      setFulfillmentType('delivery');
    }
    if (activeLocations.length > 0 && !activeLocations.some((l) => l.id === selectedPickupId)) {
      setSelectedPickupId(activeLocations[0].id);
    } else if (activeLocations.length === 0 && selectedPickupId) {
      setSelectedPickupId('');
    }
  }, [pickupSupported, fulfillmentType, activeLocations, selectedPickupId]);

  const selectedZone = countryZones.find((z) => z.id === selectedZoneId);
  const selectedPickup = activeLocations.find((l) => l.id === selectedPickupId);

  const deliveryFeeUsd: number | null =
    fulfillmentType === 'pickup'
      ? 0
      : selectedZone && selectedZone.feeUsd !== null
      ? selectedZone.feeUsd
      : null;

  const cartDetailedItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = snapshot.products.find((p) => p.id === item.productId);
        if (!product) return null;
        const variant =
          product.variants.find((v) => v.id === item.variantId) ?? product.variants[0];
        const unitPriceUsd = product.basePriceUsd + (variant?.priceDeltaUsd ?? 0);
        return {
          productId: product.id,
          name: product.name,
          variantLabel: variant?.label ?? 'Standard',
          quantity: item.quantity,
          unitPriceUsd,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [cart, snapshot.products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cartDetailedItems.length === 0) {
      setErrorMsg(t.checkout.emptyCartWarning);
      return;
    }

    if (!fullName.trim() || !whatsappPhone.trim()) {
      setErrorMsg(t.checkout.validationRequired);
      return;
    }

    const digitsOnly = whatsappPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setErrorMsg(t.checkout.validationPhone);
      return;
    }

    if (fulfillmentType === 'delivery') {
      if (!region.trim() || !city.trim() || !address.trim()) {
        setErrorMsg(t.checkout.validationRequired);
        return;
      }
    } else if (!selectedPickup) {
      setErrorMsg(t.checkout.validationRequired);
      return;
    }

    const orderRef = generateOrderReference();
    const message = buildOrderWhatsappMessage({
      orderRef,
      language,
      currency,
      dopPerUsd: snapshot.currencySettings.dopPerUsd,
      country,
      fulfillmentType,
      pickupLocationName: selectedPickup
        ? `${selectedPickup.name} — ${selectedPickup.city}`
        : undefined,
      customerName: fullName.trim(),
      whatsappPhone: whatsappPhone.trim(),
      regionLabel: region.trim(),
      cityLabel: city.trim(),
      address: address.trim(),
      deliveryNotes: deliveryNotes.trim(),
      items: cartDetailedItems,
      subtotalUsd: cartSubtotalUsd,
      deliveryFeeUsd,
      deliveryZoneName: selectedZone?.zoneName,
    });

    const url = buildWhatsappUrl(message);
    setGeneratedOrder({ orderRef, message, url });
  };

  const handleCopy = async () => {
    if (!generatedOrder) return;
    try {
      await navigator.clipboard.writeText(generatedOrder.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  if (cartDetailedItems.length === 0 && !generatedOrder) {
    return (
      <div className="bg-[#F5F6FA] min-h-[70vh] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
          <h1 className="font-display font-bold text-2xl text-[#101039]">{t.checkout.title}</h1>
          <p className="text-sm text-slate-600">{t.checkout.emptyCartWarning}</p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
          >
            {t.cart.continueShopping}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6FA] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
            {t.checkout.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">{t.checkout.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form or Generated Confirmation */}
          <div className="lg:col-span-7">
            {generatedOrder ? (
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="font-mono-tabular text-xs font-semibold text-[#27248E]">
                    {t.checkout.orderRefLabel}: {generatedOrder.orderRef}
                  </div>
                  <h2 className="font-display font-bold text-xl text-[#101039]">
                    {t.checkout.generatedTitle}
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {t.checkout.generatedNotice}
                  </p>
                </div>

                <div className="bg-[#F5F6FA] border border-slate-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-xs font-mono text-slate-800 leading-relaxed">
                    {generatedOrder.message}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={generatedOrder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      // Do not claim paid/confirmed; user still sends manually
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors"
                  >
                    <span>{t.checkout.openWhatsappBtn}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#F5F6FA] border border-slate-300 text-slate-800 text-sm font-semibold hover:border-[#101039] cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? t.checkout.copied : t.checkout.copyMessageBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGeneratedOrder(null)}
                    className="text-sm font-medium text-slate-600 hover:text-[#101039] underline underline-offset-4 cursor-pointer"
                  >
                    {t.checkout.editDetails}
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4 text-xs text-slate-500">
                  <span>{t.checkout.currencyRuleNote}</span>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      navigate('/shop');
                    }}
                    className="text-[#27248E] font-semibold hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {t.cart.continueShopping}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
              >
                {/* Country Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    {t.checkout.countryLabel} *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCountry('DR')}
                      className={`px-4 py-3 rounded-lg border text-sm font-semibold text-left transition-colors cursor-pointer ${
                        country === 'DR'
                          ? 'bg-[#101039] text-white border-[#101039]'
                          : 'bg-[#F5F6FA] text-slate-800 border-slate-200 hover:border-[#27248E]'
                      }`}
                    >
                      🇩🇴 {t.checkout.drName}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCountry('HT')}
                      className={`px-4 py-3 rounded-lg border text-sm font-semibold text-left transition-colors cursor-pointer ${
                        country === 'HT'
                          ? 'bg-[#101039] text-white border-[#101039]'
                          : 'bg-[#F5F6FA] text-slate-800 border-slate-200 hover:border-[#27248E]'
                      }`}
                    >
                      🇭🇹 {t.checkout.htName}
                    </button>
                  </div>
                </div>

                {/* Fulfillment Type: Pickup only shown if valid store location exists */}
                {pickupSupported && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      {t.checkout.fulfillmentLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFulfillmentType('delivery')}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                          fulfillmentType === 'delivery'
                            ? 'bg-[#27248E] text-white border-[#27248E]'
                            : 'bg-[#F5F6FA] text-slate-800 border-slate-200'
                        }`}
                      >
                        {t.checkout.deliveryOption}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFulfillmentType('pickup')}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                          fulfillmentType === 'pickup'
                            ? 'bg-[#27248E] text-white border-[#27248E]'
                            : 'bg-[#F5F6FA] text-slate-800 border-slate-200'
                        }`}
                      >
                        {t.checkout.pickupOption}
                      </button>
                    </div>
                  </div>
                )}

                {/* Customer Core Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.checkout.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.checkout.whatsappNumber} *
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

                {fulfillmentType === 'pickup' && pickupSupported ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.checkout.pickupSelectLabel} *
                    </label>
                    <select
                      value={selectedPickupId}
                      onChange={(e) => setSelectedPickupId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                    >
                      {activeLocations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} — {loc.city} ({loc.address})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    {/* Country-Specific Delivery Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {country === 'DR' ? t.checkout.province : t.checkout.department} *
                        </label>
                        <select
                          required
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                        >
                          <option value="">{t.checkout.selectOption}</option>
                          {(country === 'DR' ? DR_PROVINCES : HAITI_DEPARTMENTS).map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {country === 'DR' ? t.checkout.municipality : t.checkout.commune} *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {country === 'DR' ? t.checkout.streetAddress : t.checkout.deliveryAddress} *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                      />
                    </div>

                    {/* Configured Delivery Zones (if any exist for this country) */}
                    {countryZones.length > 0 ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t.checkout.deliveryZoneLabel}
                        </label>
                        <select
                          value={selectedZoneId}
                          onChange={(e) => setSelectedZoneId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111] focus:outline-none focus:border-[#27248E]"
                        >
                          <option value="">{t.checkout.toBeConfirmed}</option>
                          {countryZones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.zoneName} —{' '}
                              {zone.feeUsd !== null
                                ? formatCurrency(
                                    zone.feeUsd,
                                    currency,
                                    snapshot.currencySettings.dopPerUsd
                                  )
                                : t.checkout.toBeConfirmed}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs text-slate-700">
                        <MapPin className="w-4 h-4 text-[#27248E] shrink-0 mt-0.5" />
                        <span>{t.checkout.noZonesConfigured}</span>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.checkout.deliveryNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder={t.checkout.deliveryNotesPlaceholder}
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
                  {t.checkout.submitWhatsapp}
                </button>
              </form>
            )}
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-display font-bold text-lg text-[#101039]">
                {t.checkout.orderSummary}
              </h2>
              <span className="font-mono-tabular text-xs font-semibold text-[#27248E]">
                {currency}
              </span>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {cartDetailedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.variantLabel}`}
                  className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-sm"
                >
                  <div>
                    <div className="font-semibold text-[#111111]">
                      {item.name} × {item.quantity}
                    </div>
                    <div className="text-xs text-slate-500">{item.variantLabel}</div>
                  </div>
                  <div className="font-mono-tabular font-semibold text-[#101039] shrink-0">
                    {formatCurrency(
                      item.unitPriceUsd * item.quantity,
                      currency,
                      snapshot.currencySettings.dopPerUsd
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>{t.checkout.itemsSubtotal}</span>
                <span className="font-mono-tabular font-semibold text-[#111111]">
                  {formatCurrency(cartSubtotalUsd, currency, snapshot.currencySettings.dopPerUsd)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>{t.checkout.deliveryFee}</span>
                <span className="font-mono-tabular font-medium text-[#111111]">
                  {deliveryFeeUsd !== null
                    ? formatCurrency(deliveryFeeUsd, currency, snapshot.currencySettings.dopPerUsd)
                    : t.checkout.toBeConfirmed}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-display font-bold text-base text-[#101039]">
                  {t.checkout.total} ({currency})
                </span>
                <span className="font-mono-tabular font-bold text-xl text-[#101039]">
                  {formatCurrency(
                    cartSubtotalUsd + (deliveryFeeUsd ?? 0),
                    currency,
                    snapshot.currencySettings.dopPerUsd
                  )}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F6FA] border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <Info className="w-4 h-4 text-[#27248E] shrink-0 mt-0.5" />
              <span>{t.checkout.currencyRuleNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
