import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { buildWhatsappUrl } from '../utils/whatsapp';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    snapshot,
    navigate,
    language,
    currency,
    t,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useStore();

  const product = snapshot.products.find((p) => p.slug === slug);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id ?? ''
  );

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-display font-bold text-2xl text-[#101039]">{t.product.notFound}</h1>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-semibold cursor-pointer"
        >
          {t.product.backToShop}
        </button>
      </div>
    );
  }

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const unitPriceUsd = product.basePriceUsd + (activeVariant?.priceDeltaUsd ?? 0);
  const formattedPrice = formatCurrency(
    unitPriceUsd,
    currency,
    snapshot.currencySettings.dopPerUsd
  );
  const isWishlisted = wishlist.includes(product.id);

  const inquiryMessage = `Hello RÉGIS ELECTRONICS, I am interested in:\nProduct: ${product.name}\nVariant: ${
    activeVariant?.label ?? 'Standard'
  }\nDisplayed Price (${currency}): ${formattedPrice}\nPlease confirm availability and delivery options.`;

  return (
    <div className="bg-[#F5F6FA] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#101039] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.product.backToShop}</span>
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Product Media */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F6FA] border border-slate-200">
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-[#27248E]">{product.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {t.product.sku}: {product.sku}
                  </span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
                  {product.name}
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {product.description[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#101039]">
                  {formattedPrice}
                </div>
                <p className="mt-1 text-xs text-slate-500">{t.currency.confirmNotice}</p>
              </div>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {t.product.selectVariant}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const active = variant.id === activeVariant?.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#101039] text-white border-[#101039]'
                              : 'bg-[#F5F6FA] text-slate-800 border-slate-200 hover:border-[#27248E]'
                          }`}
                        >
                          {variant.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() =>
                    activeVariant && addToCart(product.id, activeVariant.id, 1)
                  }
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors disabled:bg-slate-300 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.inStock ? t.product.addToCart : t.product.outOfStock}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#27248E]/10 border-[#27248E] text-[#27248E]'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#101039]'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                  <span>
                    {isWishlisted ? t.product.savedInWishlist : t.product.saveToWishlist}
                  </span>
                </button>
              </div>

              <a
                href={buildWhatsappUrl(inquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#27248E] hover:text-[#101039] underline underline-offset-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.product.askWhatsapp}</span>
              </a>

              {/* Technical Specs */}
              {product.specs.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h2 className="font-display font-semibold text-base text-[#101039] mb-3">
                    {t.product.specifications}
                  </h2>
                  <dl className="divide-y divide-slate-100 border border-slate-200 rounded-lg bg-[#F5F6FA]">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="px-4 py-2.5 flex items-center justify-between gap-4 text-sm"
                      >
                        <dt className="text-slate-500 font-medium">{spec.label}</dt>
                        <dd className="text-[#111111] font-medium text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
