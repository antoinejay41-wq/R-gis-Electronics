import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    snapshot,
    currency,
    t,
    toggleWishlist,
    addToCart,
    navigate,
  } = useStore();

  const savedProducts = snapshot.products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F5F6FA] min-h-[70vh] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#101039]">
            {t.wishlist.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">{t.wishlist.subtitle}</p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <Heart className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-display font-semibold text-lg text-[#101039]">
              {t.wishlist.emptyTitle}
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">{t.wishlist.emptyBody}</p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
            >
              {t.cart.continueShopping}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((product) => {
              const defaultVariant = product.variants[0];
              const priceUsd = product.basePriceUsd + (defaultVariant?.priceDeltaUsd ?? 0);
              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"
                >
                  <div
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="aspect-[4/3] bg-[#F5F6FA] cursor-pointer"
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#27248E] font-medium">{product.brand}</div>
                      <h3 className="font-display font-semibold text-base text-[#111111] mt-1">
                        {product.name}
                      </h3>
                      <div className="font-mono-tabular text-base font-bold text-[#101039] mt-2">
                        {formatCurrency(priceUsd, currency, snapshot.currencySettings.dopPerUsd)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() =>
                          defaultVariant && addToCart(product.id, defaultVariant.id, 1)
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#101039] text-white text-xs font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t.wishlist.moveToCart}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={t.wishlist.remove}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
