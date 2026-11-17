import { BUSINESS_INFO } from '../data/seed';
import { CountryCode, CurrencyCode, LanguageCode } from '../types/store';
import { formatCurrency, getCurrencyLabel } from './currency';

export interface OrderWhatsappPayload {
  orderRef: string;
  language: LanguageCode;
  currency: CurrencyCode;
  dopPerUsd: number;
  country: CountryCode;
  fulfillmentType: 'delivery' | 'pickup';
  pickupLocationName?: string;
  customerName: string;
  whatsappPhone: string;
  regionLabel: string; // Province (DR) or Department (HT)
  cityLabel: string; // Municipality (DR) or Commune (HT)
  address: string;
  deliveryNotes?: string;
  items: Array<{
    name: string;
    variantLabel: string;
    quantity: number;
    unitPriceUsd: number;
  }>;
  subtotalUsd: number;
  deliveryFeeUsd: number | null; // null => To be confirmed
  deliveryZoneName?: string;
}

export interface RepairWhatsappPayload {
  language: LanguageCode;
  customerName: string;
  whatsappPhone: string;
  country: CountryCode;
  city: string;
  deviceCategory: string;
  deviceBrand: string;
  deviceModel: string;
  problemDescription: string;
  issueStarted?: string;
  preferredContact: 'whatsapp' | 'phone';
  photoNames: string[];
  additionalNotes?: string;
}

const COUNTRY_NAMES: Record<LanguageCode, Record<CountryCode, string>> = {
  en: { DR: 'Dominican Republic', HT: 'Haiti' },
  es: { DR: 'República Dominicana', HT: 'Haití' },
  ht: { DR: 'Repiblik Dominiken', HT: 'Ayiti' },
};

export function generateOrderReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RE-${year}-${rand}`;
}

export function buildOrderWhatsappMessage(payload: OrderWhatsappPayload): string {
  const { language, currency, dopPerUsd } = payload;
  const countryName = COUNTRY_NAMES[language][payload.country];
  const currencyName = getCurrencyLabel(currency);

  const linesHeading = {
    en: {
      title: '🛒 RÉGIS ELECTRONICS — NEW ORDER REQUEST',
      ref: 'Order Reference',
      currency: 'Selected Currency',
      customer: 'Customer',
      phone: 'WhatsApp',
      country: 'Country',
      fulfillment: 'Method',
      pickup: 'Store Pickup',
      delivery: 'Delivery',
      region: payload.country === 'DR' ? 'Province' : 'Department',
      city: payload.country === 'DR' ? 'Municipality / City' : 'Commune / City',
      address: 'Address',
      notes: 'Delivery Notes',
      items: 'Items',
      subtotal: 'Items Subtotal',
      deliveryFee: 'Delivery Fee',
      tbc: 'To be confirmed',
      total: 'Total',
      totalWithTbc: 'Items Total (Delivery fee to be confirmed)',
      disclaimer:
        'Note: Final payment currency, exchange rate, availability, and delivery cost will be confirmed by RÉGIS ELECTRONICS before payment.',
    },
    es: {
      title: '🛒 RÉGIS ELECTRONICS — SOLICITUD DE PEDIDO',
      ref: 'Referencia de Pedido',
      currency: 'Moneda Seleccionada',
      customer: 'Cliente',
      phone: 'WhatsApp',
      country: 'País',
      fulfillment: 'Modalidad',
      pickup: 'Retiro en Tienda',
      delivery: 'Envío a Domicilio',
      region: payload.country === 'DR' ? 'Provincia' : 'Departamento',
      city: payload.country === 'DR' ? 'Municipio / Ciudad' : 'Comuna / Ciudad',
      address: 'Dirección',
      notes: 'Notas de Entrega',
      items: 'Productos',
      subtotal: 'Subtotal de Productos',
      deliveryFee: 'Costo de Envío',
      tbc: 'Por confirmar',
      total: 'Total',
      totalWithTbc: 'Total de Productos (Envío por confirmar)',
      disclaimer:
        'Nota: La moneda final de pago, tasa de cambio, disponibilidad y costo de envío deben ser confirmados por RÉGIS ELECTRONICS antes de pagar.',
    },
    ht: {
      title: '🛒 RÉGIS ELECTRONICS — DEMANN KÒMAND',
      ref: 'Referans Kòmand',
      currency: 'Lajan Chwazi',
      customer: 'Kliyan',
      phone: 'WhatsApp',
      country: 'Peyi',
      fulfillment: 'Metòd',
      pickup: 'Ranmase nan Magazen',
      delivery: 'Livrezon',
      region: payload.country === 'DR' ? 'Pwovens' : 'Depatman',
      city: payload.country === 'DR' ? 'Minisipalite / Vil' : 'Komin / Vil',
      address: 'Adrès',
      notes: 'Nòt Livrezon',
      items: 'Atik yo',
      subtotal: 'Sou-total Atik yo',
      deliveryFee: 'Frè Livrezon',
      tbc: 'Pou konfime',
      total: 'Total',
      totalWithTbc: 'Total Atik yo (Frè livrezon pou konfime)',
      disclaimer:
        'Nòt: Lajan final pou peye a, to echanj lan, disponiblite, ak frè livrezon an ap konfime pa RÉGIS ELECTRONICS anvan ou peye.',
    },
  }[language];

  const itemsText = payload.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.variantLabel}) x${item.quantity} — ${formatCurrency(
          item.unitPriceUsd * item.quantity,
          currency,
          dopPerUsd
        )}`
    )
    .join('\n');

  const lines: string[] = [
    linesHeading.title,
    `${linesHeading.ref}: ${payload.orderRef}`,
    `${linesHeading.currency}: ${currencyName}`,
    '',
    `${linesHeading.customer}: ${payload.customerName}`,
    `${linesHeading.phone}: ${payload.whatsappPhone}`,
    `${linesHeading.country}: ${countryName}`,
    `${linesHeading.fulfillment}: ${
      payload.fulfillmentType === 'pickup'
        ? `${linesHeading.pickup}${payload.pickupLocationName ? ` (${payload.pickupLocationName})` : ''}`
        : `${linesHeading.delivery}${payload.deliveryZoneName ? ` (${payload.deliveryZoneName})` : ''}`
    }`,
  ];

  if (payload.fulfillmentType === 'delivery') {
    lines.push(`${linesHeading.region}: ${payload.regionLabel}`);
    lines.push(`${linesHeading.city}: ${payload.cityLabel}`);
    lines.push(`${linesHeading.address}: ${payload.address}`);
  }

  if (payload.deliveryNotes?.trim()) {
    lines.push(`${linesHeading.notes}: ${payload.deliveryNotes.trim()}`);
  }

  lines.push('', `${linesHeading.items}:`, itemsText, '');
  lines.push(`${linesHeading.subtotal}: ${formatCurrency(payload.subtotalUsd, currency, dopPerUsd)}`);

  if (payload.fulfillmentType === 'pickup') {
    lines.push(`${linesHeading.deliveryFee}: ${formatCurrency(0, currency, dopPerUsd)}`);
    lines.push(`${linesHeading.total}: ${formatCurrency(payload.subtotalUsd, currency, dopPerUsd)}`);
  } else if (payload.deliveryFeeUsd !== null) {
    lines.push(
      `${linesHeading.deliveryFee}: ${formatCurrency(payload.deliveryFeeUsd, currency, dopPerUsd)}`
    );
    lines.push(
      `${linesHeading.total}: ${formatCurrency(
        payload.subtotalUsd + payload.deliveryFeeUsd,
        currency,
        dopPerUsd
      )}`
    );
  } else {
    lines.push(`${linesHeading.deliveryFee}: ${linesHeading.tbc}`);
    lines.push(
      `${linesHeading.totalWithTbc}: ${formatCurrency(payload.subtotalUsd, currency, dopPerUsd)}`
    );
  }

  lines.push('', linesHeading.disclaimer);
  return lines.join('\n');
}

export function buildRepairWhatsappMessage(payload: RepairWhatsappPayload): string {
  const { language } = payload;
  const countryName = COUNTRY_NAMES[language][payload.country];

  const labels = {
    en: {
      title: '🔧 RÉGIS ELECTRONICS — REPAIR REQUEST',
      customer: 'Customer',
      whatsapp: 'WhatsApp',
      country: 'Country',
      city: 'City / Location',
      category: 'Category',
      device: 'Device',
      problem: 'Problem',
      started: 'Issue started',
      preferred: 'Preferred Contact',
      preferredWhatsapp: 'WhatsApp',
      preferredPhone: 'Phone Call',
      photos: 'Selected Photos (to attach manually in WhatsApp)',
      notes: 'Additional Notes',
      closing:
        'Hello RÉGIS ELECTRONICS, I would like to request a repair estimate for my device. Please let me know the next steps.',
    },
    es: {
      title: '🔧 RÉGIS ELECTRONICS — SOLICITUD DE REPARACIÓN',
      customer: 'Cliente',
      whatsapp: 'WhatsApp',
      country: 'País',
      city: 'Ciudad / Ubicación',
      category: 'Categoría',
      device: 'Dispositivo',
      problem: 'Problema',
      started: 'Cuándo comenzó',
      preferred: 'Contacto Preferido',
      preferredWhatsapp: 'WhatsApp',
      preferredPhone: 'Llamada Telefónica',
      photos: 'Fotos seleccionadas (para adjuntar manualmente en WhatsApp)',
      notes: 'Notas Adicionales',
      closing:
        'Hola RÉGIS ELECTRONICS, me gustaría solicitar un presupuesto de reparación para mi dispositivo. Por favor indíquenme los próximos pasos.',
    },
    ht: {
      title: '🔧 RÉGIS ELECTRONICS — DEMANN REPARASYON',
      customer: 'Kliyan',
      whatsapp: 'WhatsApp',
      country: 'Peyi',
      city: 'Vil / Kote',
      category: 'Kategori',
      device: 'Aparèy',
      problem: 'Pwoblèm',
      started: 'Kilè pwoblèm nan kòmanse',
      preferred: 'Mwayen Kontak Prefere',
      preferredWhatsapp: 'WhatsApp',
      preferredPhone: 'Apèl Telefonik',
      photos: 'Foto chwazi (pou voye manyèlman nan WhatsApp)',
      notes: 'Lòt Nòt',
      closing:
        'Bonjou RÉGIS ELECTRONICS, mwen ta renmen mande yon estimasyon reparasyon pou aparèy mwen an. Tanpri fè m konnen pwochen etap yo.',
    },
  }[language];

  const lines: string[] = [
    labels.title,
    '',
    `${labels.customer}: ${payload.customerName}`,
    `${labels.whatsapp}: ${payload.whatsappPhone}`,
    `${labels.country}: ${countryName}`,
    `${labels.city}: ${payload.city}`,
    `${labels.category}: ${payload.deviceCategory}`,
    `${labels.device}: ${payload.deviceBrand} ${payload.deviceModel}`.trim(),
    `${labels.problem}: ${payload.problemDescription}`,
  ];

  if (payload.issueStarted?.trim()) {
    lines.push(`${labels.started}: ${payload.issueStarted.trim()}`);
  }

  lines.push(
    `${labels.preferred}: ${
      payload.preferredContact === 'whatsapp' ? labels.preferredWhatsapp : labels.preferredPhone
    }`
  );

  if (payload.photoNames.length > 0) {
    lines.push(`${labels.photos}: ${payload.photoNames.join(', ')}`);
  }

  if (payload.additionalNotes?.trim()) {
    lines.push(`${labels.notes}: ${payload.additionalNotes.trim()}`);
  }

  lines.push('', labels.closing);
  return lines.join('\n');
}

export function buildWhatsappUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
