import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    language,
    currency,
    snapshot,
    t,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useStore();

  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);
  const defaultVariant = product.variants[0];
  const displayUsd = product.basePriceUsd + (defaultVariant?.priceDeltaUsd ?? 0);
  const formattedPrice = formatCurrency(displayUsd, currency, snapshot.currencySettings.dopPerUsd);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!defaultVariant || !product.inStock) return;
    addToCart(product.id, defaultVariant.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => navigate(`/product/${product.slug}`)}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
    >
      {/* Product Image 4:3 */}
      <div className="relative aspect-[4/3] bg-[#F5F6FA] overflow-hidden border-b border-slate-100">
        <ResilientImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? t.product.savedInWishlist : t.product.saveToWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-[#101039] text-white border-[#101039]'
              : 'bg-white/95 text-slate-700 border-slate-200 hover:text-[#27248E]'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-[#27248E]">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
          </div>

          <h3 className="font-display font-semibold text-base text-[#111111] leading-snug group-hover:text-[#27248E] transition-colors">
            {product.name}
          </h3>

          <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">
            {product.shortDescription[language]}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="font-mono-tabular font-semibold text-base text-[#101039]">
              {formattedPrice}
            </div>
            <div className="text-[11px] text-slate-500">
              {product.inStock ? t.product.inStock : t.product.outOfStock}
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              !product.inStock
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : justAdded
                ? 'bg-[#27248E] text-white'
                : 'bg-[#101039] text-white hover:bg-[#27248E]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{justAdded ? t.product.addedToCart : t.product.addToCart}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
