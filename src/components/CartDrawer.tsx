import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    snapshot,
    currency,
    t,
    updateCartQuantity,
    removeFromCart,
    cartSubtotalUsd,
    navigate,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#101039]/40 backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        aria-label={t.cart.title}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#101039]" />
            <h2 className="font-display font-semibold text-lg text-[#101039]">{t.cart.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2 rounded-lg text-slate-500 hover:text-[#111111] hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-sm text-slate-600 mb-5">{t.cart.empty}</p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#101039] text-white text-sm font-medium hover:bg-[#27248E] transition-colors cursor-pointer"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const product = snapshot.products.find((p) => p.id === item.productId);
              if (!product) return null;
              const variant =
                product.variants.find((v) => v.id === item.variantId) ?? product.variants[0];
              const unitUsd = product.basePriceUsd + (variant?.priceDeltaUsd ?? 0);

              return (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F5F6FA] border border-slate-200 shrink-0">
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#111111] truncate">
                        {product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        aria-label={t.cart.remove}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{variant?.label}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-[#F5F6FA]">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variantId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1.5 text-slate-700 hover:text-[#101039] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono-tabular font-semibold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variantId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1.5 text-slate-700 hover:text-[#101039] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono-tabular text-sm font-semibold text-[#101039]">
                        {formatCurrency(
                          unitUsd * item.quantity,
                          currency,
                          snapshot.currencySettings.dopPerUsd
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-[#F5F6FA] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {t.cart.subtotal} ({currency})
              </span>
              <span className="font-mono-tabular text-lg font-bold text-[#101039]">
                {formatCurrency(cartSubtotalUsd, currency, snapshot.currencySettings.dopPerUsd)}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{t.cart.currencyDisclaimer}</p>

            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#101039] text-white text-sm font-semibold hover:bg-[#27248E] transition-colors cursor-pointer"
            >
              {t.cart.proceedCheckout}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
