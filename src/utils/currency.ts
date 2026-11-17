import { CurrencyCode } from '../types/store';

/**
 * Converts a USD base price to the selected display currency using the owner-configured rate.
 * Never mixes DOP and USD inside a single returned price string.
 */
export function convertFromUsd(amountUsd: number, currency: CurrencyCode, dopPerUsd: number): number {
  if (currency === 'USD') {
    return Math.round(amountUsd * 100) / 100;
  }
  const safeRate = dopPerUsd > 0 ? dopPerUsd : 60.5;
  return Math.round(amountUsd * safeRate);
}

export function formatCurrency(amountUsd: number, currency: CurrencyCode, dopPerUsd: number): string {
  const converted = convertFromUsd(amountUsd, currency, dopPerUsd);
  if (currency === 'USD') {
    return `$${converted.toLocaleString('en-US', {
      minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `RD$${converted.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`;
}

export function getCurrencyLabel(currency: CurrencyCode): string {
  return currency === 'DOP' ? 'DOP (RD$)' : 'USD ($)';
}
