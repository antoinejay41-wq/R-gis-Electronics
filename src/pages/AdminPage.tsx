import React, { useState } from 'react';
import {
  Database,
  DollarSign,
  ExternalLink,
  MapPin,
  Package,
  Plus,
  RotateCcw,
  Trash2,
  Wrench,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  CountryCode,
  Product,
  ProductCategory,
  RepairIconName,
  RepairPricingMode,
  RepairServiceCategory,
} from '../types/store';
import { formatCurrency } from '../utils/currency';

type AdminTab = 'repairs' | 'products' | 'currency_delivery' | 'architecture';

export const AdminPage: React.FC = () => {
  const {
    snapshot,
    currency,
    navigate,
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
    resetDemoData,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('repairs');

  // Currency form state
  const [rateInput, setRateInput] = useState(String(snapshot.currencySettings.dopPerUsd));
  const [rateNote, setRateNote] = useState(snapshot.currencySettings.lastUpdatedNote);
  const [rateSaved, setRateSaved] = useState(false);

  // New Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('smartphones');
  const [newProdPriceUsd, setNewProdPriceUsd] = useState('499');

  // New Delivery Zone form state
  const [zoneCountry, setZoneCountry] = useState<CountryCode>('DR');
  const [zoneName, setZoneName] = useState('');
  const [zoneFeeUsd, setZoneFeeUsd] = useState('');
  const [zoneNote, setZoneNote] = useState('');

  // New Store Location form state
  const [locCountry, setLocCountry] = useState<CountryCode>('DR');
  const [locName, setLocName] = useState('');
  const [locCity, setLocCity] = useState('');
  const [locAddress, setLocAddress] = useState('');
  const [locHours, setLocHours] = useState('Mon–Sat 9:00 AM – 6:00 PM');

  // New Repair Category form state
  const [newRepairName, setNewRepairName] = useState('');
  const [newRepairDesc, setNewRepairDesc] = useState('');
  const [newRepairIcon, setNewRepairIcon] = useState<RepairIconName>('wrench');

  // Supported repair location form state
  const [repLocCountry, setRepLocCountry] = useState<CountryCode>('DR');
  const [repLocText, setRepLocText] = useState('');

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(rateInput);
    if (isNaN(parsed) || parsed <= 0) return;
    updateCurrencySettings({
      dopPerUsd: parsed,
      lastUpdatedNote: rateNote.trim() || 'Updated by store administrator',
    });
    setRateSaved(true);
    setTimeout(() => setRateSaved(false), 1800);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newProdPriceUsd);
    if (!newProdName.trim() || !newProdBrand.trim() || isNaN(price) || price <= 0) return;

    const id = `prod-${Date.now()}`;
    const slug = `${newProdName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;

    const imageByCat: Record<ProductCategory, string> = {
      smartphones: '/src/assets/images/product_smartphone_pro_1794935281799.jpg',
      laptops: '/src/assets/images/product_laptop_pro_1794935282604.jpg',
      accessories: '/src/assets/images/product_audio_accessories_1794935282421.jpg',
      tablets: '/src/assets/images/product_tablet_console_1794935283777.jpg',
    };

    const product: Product = {
      id,
      slug,
      sku: newProdSku.trim() || `RE-${Date.now().toString().slice(-5)}`,
      brand: newProdBrand.trim(),
      category: newProdCategory,
      name: newProdName.trim(),
      shortDescription: {
        en: `${newProdBrand.trim()} ${newProdName.trim()} available for WhatsApp inquiry.`,
        es: `${newProdBrand.trim()} ${newProdName.trim()} disponible para consulta por WhatsApp.`,
        ht: `${newProdBrand.trim()} ${newProdName.trim()} disponib pou demann sou WhatsApp.`,
      },
      description: {
        en: `Added via Admin Catalog Manager. Contact RÉGIS ELECTRONICS on WhatsApp for availability and delivery confirmation.`,
        es: `Agregado desde el panel de administración. Contacta a RÉGIS ELECTRONICS por WhatsApp para confirmar disponibilidad.`,
        ht: `Ajoute nan panèl admin lan. Kontakte RÉGIS ELECTRONICS sou WhatsApp pou konfime disponiblite.`,
      },
      basePriceUsd: price,
      image: imageByCat[newProdCategory],
      featured: true,
      inStock: true,
      specs: [{ label: 'Condition', value: 'Factory Sealed / Verified' }],
      variants: [
        { id: `v-std-${Date.now()}`, label: 'Standard Edition', priceDeltaUsd: 0, inStock: true },
      ],
    };

    upsertProduct(product);
    setNewProdName('');
    setNewProdBrand('');
    setNewProdSku('');
    setNewProdPriceUsd('499');
  };

  const handleAddDeliveryZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName.trim()) return;
    const parsedFee = zoneFeeUsd.trim() === '' ? null : parseFloat(zoneFeeUsd);
    upsertDeliveryZone({
      id: `zone-${Date.now()}`,
      country: zoneCountry,
      zoneName: zoneName.trim(),
      feeUsd: parsedFee !== null && !isNaN(parsedFee) ? parsedFee : null,
      estimatedNote: zoneNote.trim() || 'Confirmed via WhatsApp',
      active: true,
    });
    setZoneName('');
    setZoneFeeUsd('');
    setZoneNote('');
  };

  const handleAddStoreLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locName.trim() || !locCity.trim() || !locAddress.trim()) return;
    upsertStoreLocation({
      id: `loc-${Date.now()}`,
      country: locCountry,
      name: locName.trim(),
      city: locCity.trim(),
      address: locAddress.trim(),
      hours: locHours.trim(),
      active: true,
    });
    setLocName('');
    setLocCity('');
    setLocAddress('');
  };

  const handleAddRepairCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepairName.trim() || !newRepairDesc.trim()) return;
    const cat: RepairServiceCategory = {
      id: `rep-${Date.now()}`,
      name: newRepairName.trim(),
      icon: newRepairIcon,
      description: newRepairDesc.trim(),
      enabled: true,
      pricingMode: 'estimate',
      priceUsd: null,
    };
    upsertRepairService(cat);
    setNewRepairName('');
    setNewRepairDesc('');
  };

  const handleAddRepairLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repLocText.trim()) return;
    updateRepairSettings({
      ...snapshot.repairSettings,
      supportedLocations: [
        ...snapshot.repairSettings.supportedLocations,
        {
          id: `reploc-${Date.now()}`,
          country: repLocCountry,
          location: repLocText.trim(),
        },
      ],
    });
    setRepLocText('');
  };

  const enabledRepairsCount = snapshot.repairServices.filter((r) => r.enabled).length;

  return (
    <div className="bg-[#F5F6FA] min-h-[80vh] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#27248E]">
              RÉGIS ELECTRONICS · Store &amp; Repair Operations
            </div>
            <h1 className="font-display font-bold text-2xl text-[#101039] mt-0.5">
              Admin Management Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/repairs')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-[#101039] hover:border-[#27248E] cursor-pointer"
            >
              <span>View Repairs Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-slate-700 hover:text-red-700 hover:border-red-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('repairs')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'repairs'
                ? 'bg-[#101039] text-white'
                : 'text-slate-700 hover:text-[#101039]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Repairs ({enabledRepairsCount}/{snapshot.repairServices.length} active)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#101039] text-white'
                : 'text-slate-700 hover:text-[#101039]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products &amp; Pricing ({snapshot.products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('currency_delivery')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'currency_delivery'
                ? 'bg-[#101039] text-white'
                : 'text-slate-700 hover:text-[#101039]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Currency, Zones &amp; Pickup</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-[#101039] text-white'
                : 'text-slate-700 hover:text-[#101039]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Ticket Architecture (Firebase Ready)</span>
          </button>
        </div>

        {/* TAB 1: REPAIRS MANAGEMENT */}
        {activeTab === 'repairs' && (
          <div className="space-y-6">
            {/* Homepage & Policy Editor */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-[#101039]">
                Repair Homepage Content &amp; Policies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Homepage Repair Headline
                  </label>
                  <input
                    type="text"
                    value={snapshot.repairSettings.homepageHeadline}
                    onChange={(e) =>
                      updateRepairSettings({
                        ...snapshot.repairSettings,
                        homepageHeadline: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Homepage Repair Description
                  </label>
                  <input
                    type="text"
                    value={snapshot.repairSettings.homepageDescription}
                    onChange={(e) =>
                      updateRepairSettings({
                        ...snapshot.repairSettings,
                        homepageDescription: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Repair Pricing &amp; Assessment Policy Note
                </label>
                <textarea
                  rows={2}
                  value={snapshot.repairSettings.repairPolicyNote}
                  onChange={(e) =>
                    updateRepairSettings({
                      ...snapshot.repairSettings,
                      repairPolicyNote: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm text-[#111111]"
                />
              </div>
            </div>

            {/* Repair Service Categories List */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="font-display font-bold text-lg text-[#101039]">
                    Repair Service Categories
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Proposed categories start disabled. Enable individual services to publish them on /repairs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      snapshot.repairServices.forEach((s) =>
                        upsertRepairService({ ...s, enabled: true })
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#101039] text-white text-xs font-semibold hover:bg-[#27248E] cursor-pointer"
                  >
                    Enable All
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      snapshot.repairServices.forEach((s) =>
                        upsertRepairService({ ...s, enabled: false })
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#101039] cursor-pointer"
                  >
                    Disable All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {snapshot.repairServices.map((service) => (
                  <div
                    key={service.id}
                    className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
                  >
                    <div className="lg:col-span-4 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id={`toggle-${service.id}`}
                          checked={service.enabled}
                          onChange={(e) =>
                            upsertRepairService({ ...service, enabled: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#27248E] cursor-pointer"
                        />
                        <label
                          htmlFor={`toggle-${service.id}`}
                          className="font-semibold text-sm text-[#101039] cursor-pointer"
                        >
                          {service.name}
                        </label>
                      </div>
                      <div className="text-xs text-slate-500 pl-6">
                        Status:{' '}
                        <span
                          className={
                            service.enabled
                              ? 'text-emerald-700 font-semibold'
                              : 'text-amber-700 font-medium'
                          }
                        >
                          {service.enabled ? 'Enabled on /repairs' : 'Disabled (Proposed only)'}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) =>
                          upsertRepairService({ ...service, description: e.target.value })
                        }
                        aria-label={`Description for ${service.name}`}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs text-slate-800"
                      />
                    </div>

                    <div className="lg:col-span-3 flex items-center gap-2">
                      <select
                        value={service.pricingMode}
                        onChange={(e) => {
                          const mode = e.target.value as RepairPricingMode;
                          upsertRepairService({
                            ...service,
                            pricingMode: mode,
                            priceUsd: mode === 'estimate' ? null : service.priceUsd ?? 25,
                          });
                        }}
                        aria-label={`Pricing mode for ${service.name}`}
                        className="px-2.5 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs text-[#111111]"
                      >
                        <option value="estimate">Contact for estimate</option>
                        <option value="starting_at">Starting at (USD)</option>
                        <option value="fixed">Fixed price (USD)</option>
                      </select>

                      {service.pricingMode !== 'estimate' && (
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={service.priceUsd ?? ''}
                          onChange={(e) =>
                            upsertRepairService({
                              ...service,
                              priceUsd: parseFloat(e.target.value) || 0,
                            })
                          }
                          aria-label={`USD price for ${service.name}`}
                          className="w-24 px-2.5 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-mono-tabular text-[#111111]"
                        />
                      )}
                    </div>

                    <div className="lg:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => deleteRepairService(service.id)}
                        aria-label={`Delete ${service.name}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Repair Category */}
              <form
                onSubmit={handleAddRepairCategory}
                className="pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
              >
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Category Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Audio & Speaker Repair"
                    value={newRepairName}
                    onChange={(e) => setNewRepairName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Icon</label>
                  <select
                    value={newRepairIcon}
                    onChange={(e) => setNewRepairIcon(e.target.value as RepairIconName)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  >
                    <option value="wrench">Wrench</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                    <option value="gamepad">Console</option>
                    <option value="battery">Battery</option>
                    <option value="monitor">Screen</option>
                    <option value="cpu">Software / IC</option>
                  </select>
                </div>
                <div className="md:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief assessment description..."
                    value={newRepairDesc}
                    onChange={(e) => setNewRepairDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Supported Repair Service Locations */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="font-display font-bold text-lg text-[#101039] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#27248E]" />
                <span>Supported Repair Locations (DR &amp; Haiti)</span>
              </h2>

              {snapshot.repairSettings.supportedLocations.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No supported repair cities configured yet. Add locations below to display them on /repairs.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {snapshot.repairSettings.supportedLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F6FA] border border-slate-200 text-xs font-medium text-[#101039]"
                    >
                      <span>
                        {loc.country === 'DR' ? '🇩🇴' : '🇭🇹'} {loc.location}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateRepairSettings({
                            ...snapshot.repairSettings,
                            supportedLocations:
                              snapshot.repairSettings.supportedLocations.filter(
                                (l) => l.id !== loc.id
                              ),
                          })
                        }
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleAddRepairLocation} className="flex flex-wrap gap-3">
                <select
                  value={repLocCountry}
                  onChange={(e) => setRepLocCountry(e.target.value as CountryCode)}
                  className="px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                >
                  <option value="DR">🇩🇴 Dominican Republic</option>
                  <option value="HT">🇭🇹 Haiti</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="City / Zone (e.g., Santo Domingo, Port-au-Prince)"
                  value={repLocText}
                  onChange={(e) => setRepLocText(e.target.value)}
                  className="flex-1 min-w-[220px] px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                >
                  Add Location
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & PRICING */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddProduct}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <h2 className="font-display font-bold text-lg text-[#101039]">Add New Product</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g., iPad Air M2"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="Apple"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Base Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={newProdPriceUsd}
                    onChange={(e) => setNewProdPriceUsd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F5F6FA] border-b border-slate-200 text-xs font-semibold text-slate-600">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Base USD ($)</th>
                      <th className="py-3 px-4">Converted ({currency})</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4">In Stock</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {snapshot.products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#F5F6FA]/60">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#101039]">{prod.name}</div>
                          <div className="text-xs text-slate-500 font-mono-tabular">
                            {prod.brand} · {prod.sku}
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-slate-700">{prod.category}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={prod.basePriceUsd}
                            onChange={(e) =>
                              upsertProduct({
                                ...prod,
                                basePriceUsd: Math.max(1, parseFloat(e.target.value) || 0),
                              })
                            }
                            aria-label={`USD price for ${prod.name}`}
                            className="w-24 px-2.5 py-1 rounded border border-slate-200 bg-white font-mono-tabular text-xs"
                          />
                        </td>
                        <td className="py-3 px-4 font-mono-tabular font-semibold text-[#101039]">
                          {formatCurrency(
                            prod.basePriceUsd,
                            currency,
                            snapshot.currencySettings.dopPerUsd
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={prod.featured}
                            onChange={(e) =>
                              upsertProduct({ ...prod, featured: e.target.checked })
                            }
                            aria-label={`Feature ${prod.name}`}
                            className="w-4 h-4 accent-[#27248E] cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={prod.inStock}
                            onChange={(e) =>
                              upsertProduct({ ...prod, inStock: e.target.checked })
                            }
                            aria-label={`Stock status for ${prod.name}`}
                            className="w-4 h-4 accent-[#27248E] cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => deleteProduct(prod.id)}
                            aria-label={`Remove ${prod.name}`}
                            className="p-1.5 rounded text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CURRENCY, DELIVERY ZONES & PICKUP LOCATIONS */}
        {activeTab === 'currency_delivery' && (
          <div className="space-y-6">
            {/* Configurable Exchange Rate */}
            <form
              onSubmit={handleSaveRate}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <div>
                <h2 className="font-display font-bold text-lg text-[#101039]">
                  Configurable DOP / USD Exchange Rate
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Maintained manually by the store owner (no invented live market feed). Base prices are stored in USD and converted consistently across the storefront.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    1 USD = DOP (RD$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Rate Note
                  </label>
                  <input
                    type="text"
                    value={rateNote}
                    onChange={(e) => setRateNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                  >
                    {rateSaved ? 'Saved Rate' : 'Save Exchange Rate'}
                  </button>
                </div>
              </div>
            </form>

            {/* Delivery Zones */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div>
                <h2 className="font-display font-bold text-lg text-[#101039]">
                  Delivery Zones &amp; Rates (Dominican Republic &amp; Haiti)
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  When no delivery zones are configured for a country, checkout displays delivery availability and fees as &ldquo;To be confirmed&rdquo;.
                </p>
              </div>

              {snapshot.deliveryZones.length > 0 && (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
                  {snapshot.deliveryZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="p-3.5 flex items-center justify-between gap-4 text-sm"
                    >
                      <div>
                        <span className="font-semibold text-[#101039]">
                          {zone.country === 'DR' ? '🇩🇴' : '🇭🇹'} {zone.zoneName}
                        </span>
                        <span className="text-xs text-slate-500 ml-2">
                          ({zone.estimatedNote})
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono-tabular font-semibold text-[#101039]">
                          {zone.feeUsd !== null
                            ? formatCurrency(
                                zone.feeUsd,
                                currency,
                                snapshot.currencySettings.dopPerUsd
                              )
                            : 'To be confirmed'}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteDeliveryZone(zone.id)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleAddDeliveryZone}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country
                  </label>
                  <select
                    value={zoneCountry}
                    onChange={(e) => setZoneCountry(e.target.value as CountryCode)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  >
                    <option value="DR">🇩🇴 Dominican Republic</option>
                    <option value="HT">🇭🇹 Haiti</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Zone Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Santo Domingo Distrito"
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fee USD (blank = TBC)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g., 8"
                    value={zoneFeeUsd}
                    onChange={(e) => setZoneFeeUsd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Note</label>
                  <input
                    type="text"
                    placeholder="Courier note"
                    value={zoneNote}
                    onChange={(e) => setZoneNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                >
                  Add Zone
                </button>
              </form>
            </div>

            {/* Store Pickup Locations */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div>
                <h2 className="font-display font-bold text-lg text-[#101039]">
                  Store Pickup Locations
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Checkout shows the Store Pickup option ONLY when at least one valid store location is configured for the selected country.
                </p>
              </div>

              {snapshot.storeLocations.length > 0 && (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
                  {snapshot.storeLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-3.5 flex items-center justify-between gap-4 text-sm"
                    >
                      <div>
                        <div className="font-semibold text-[#101039]">
                          {loc.country === 'DR' ? '🇩🇴' : '🇭🇹'} {loc.name} — {loc.city}
                        </div>
                        <div className="text-xs text-slate-500">
                          {loc.address} · {loc.hours}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteStoreLocation(loc.id)}
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleAddStoreLocation}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country
                  </label>
                  <select
                    value={locCountry}
                    onChange={(e) => setLocCountry(e.target.value as CountryCode)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  >
                    <option value="DR">🇩🇴 Dominican Republic</option>
                    <option value="HT">🇭🇹 Haiti</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="RÉGIS Santo Domingo"
                    value={locName}
                    onChange={(e) => setLocName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Santo Domingo"
                    value={locCity}
                    onChange={(e) => setLocCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Av. Winston Churchill..."
                    value={locAddress}
                    onChange={(e) => setLocAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F6FA] border border-slate-200 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] cursor-pointer"
                >
                  Add Pickup Point
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: FUTURE REPAIR TICKET ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
            <h2 className="font-display font-bold text-xl text-[#101039]">
              Future Repair Ticket Tracking Architecture
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              Important transparency notice: WhatsApp repair inquiries and purchase requests are currently sent directly by customers via <span className="font-mono text-xs">wa.me/18296534437</span> and are <strong>not automatically saved</strong> in this dashboard without a backend / Firebase integration.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              The codebase is already structured with a modular repository layer (<span className="font-mono text-xs">src/services/repository.ts</span>) and typed ticket blueprint (<span className="font-mono text-xs">RepairTicketSchema</span>) ready to connect to Firebase Firestore collections (<span className="font-mono text-xs">products</span>, <span className="font-mono text-xs">repair_services</span>, <span className="font-mono text-xs">repair_tickets</span>, <span className="font-mono text-xs">orders</span>) and Firebase Storage for repair photo uploads.
            </p>

            <div className="bg-[#101039] text-slate-100 rounded-lg p-5 overflow-x-auto">
              <pre className="text-xs font-mono leading-relaxed">
{`// Ready for Firebase Firestore collection: "repair_tickets"
interface RepairTicketSchema {
  ticketId: string;
  customerName: string;
  whatsappPhone: string;
  country: 'DR' | 'HT';
  city: string;
  deviceCategory: string;
  deviceBrand: string;
  deviceModel: string;
  problemDescription: string;
  issueStarted?: string;
  preferredContact: 'whatsapp' | 'phone';
  status: 'draft_whatsapp_pending' | 'received' | 'diagnosing' | 'quoted' | 'completed';
  createdAtIso: string;
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
