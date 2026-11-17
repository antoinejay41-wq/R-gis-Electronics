import { LanguageCode } from '../types/store';

export interface Translations {
  nav: {
    home: string;
    shop: string;
    smartphones: string;
    laptops: string;
    accessories: string;
    repairs: string;
    about: string;
    contact: string;
    admin: string;
    searchPlaceholder: string;
    wishlist: string;
    cart: string;
    menu: string;
  };
  currency: {
    dopLabel: string;
    usdLabel: string;
    confirmNotice: string;
    rateLabel: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    heroShopCta: string;
    heroRepairsCta: string;
    featuredHeading: string;
    featuredSubheading: string;
    viewAllProducts: string;
    repairExploreCta: string;
    repairRequestCta: string;
    marketsHeading: string;
    marketsSubheading: string;
    drCardTitle: string;
    drCardBody: string;
    htCardTitle: string;
    htCardBody: string;
    whatsappOrderTitle: string;
    whatsappOrderBody: string;
  };
  product: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
    addedToCart: string;
    viewDetails: string;
    saveToWishlist: string;
    savedInWishlist: string;
    selectVariant: string;
    specifications: string;
    askWhatsapp: string;
    sku: string;
    category: string;
    backToShop: string;
    notFound: string;
  };
  shop: {
    allProducts: string;
    smartphones: string;
    laptops: string;
    accessories: string;
    filterByBrand: string;
    allBrands: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    resultsCount: string;
    noResults: string;
    clearFilters: string;
  };
  wishlist: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    moveToCart: string;
    remove: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    currencyDisclaimer: string;
    proceedCheckout: string;
    continueShopping: string;
    remove: string;
    qty: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    countryLabel: string;
    drName: string;
    htName: string;
    fulfillmentLabel: string;
    deliveryOption: string;
    pickupOption: string;
    pickupSelectLabel: string;
    deliveryZoneLabel: string;
    noZonesConfigured: string;
    fullName: string;
    whatsappNumber: string;
    province: string;
    municipality: string;
    streetAddress: string;
    department: string;
    commune: string;
    deliveryAddress: string;
    deliveryNotes: string;
    deliveryNotesPlaceholder: string;
    selectOption: string;
    orderSummary: string;
    itemsSubtotal: string;
    deliveryFee: string;
    toBeConfirmed: string;
    total: string;
    currencyRuleNote: string;
    submitWhatsapp: string;
    validationRequired: string;
    validationPhone: string;
    emptyCartWarning: string;
    generatedTitle: string;
    generatedNotice: string;
    openWhatsappBtn: string;
    copyMessageBtn: string;
    copied: string;
    orderRefLabel: string;
    editDetails: string;
  };
  repairs: {
    headline: string;
    subheading: string;
    pricingBannerTitle: string;
    pricingDefault: string;
    startingAt: string;
    fixedPrice: string;
    requestRepairBtn: string;
    noEnabledServicesTitle: string;
    noEnabledServicesBody: string;
    goToAdminServices: string;
    supportedLocationsTitle: string;
    locationsTbc: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    whatsappPhone: string;
    country: string;
    cityLocation: string;
    deviceCategory: string;
    deviceBrand: string;
    deviceModel: string;
    problemDescription: string;
    issueStarted: string;
    issueStartedPlaceholder: string;
    preferredContact: string;
    contactWhatsapp: string;
    contactPhone: string;
    photoLabel: string;
    photoHelper: string;
    additionalNotes: string;
    submitBtn: string;
    validationError: string;
    generatedTitle: string;
    generatedNotice: string;
    openWhatsappBtn: string;
    copyMessageBtn: string;
    copied: string;
    manualPhotoReminder: string;
  };
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    valuesTitle: string;
    value1Title: string;
    value1Body: string;
    value2Title: string;
    value2Body: string;
    value3Title: string;
    value3Body: string;
  };
  contact: {
    title: string;
    subtitle: string;
    whatsappDirectTitle: string;
    whatsappDirectBody: string;
    openChatBtn: string;
    quickFormTitle: string;
    nameLabel: string;
    countryLabel: string;
    messageLabel: string;
    sendWhatsappBtn: string;
    locationsTitle: string;
    locationsEmpty: string;
  };
  footer: {
    tagline: string;
    catalogHeading: string;
    supportHeading: string;
    marketsHeading: string;
    marketsList: string;
    whatsappLabel: string;
    currencyNote: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      smartphones: 'Smartphones',
      laptops: 'Laptops',
      accessories: 'Accessories',
      repairs: 'Repairs',
      about: 'About Us',
      contact: 'Contact',
      admin: 'Admin',
      searchPlaceholder: 'Search smartphones, laptops, accessories...',
      wishlist: 'Wishlist',
      cart: 'Cart',
      menu: 'Menu',
    },
    currency: {
      dopLabel: 'DOP (RD$)',
      usdLabel: 'USD ($)',
      confirmNotice: 'Final payment currency and exchange rate must be confirmed with the owner before payment.',
      rateLabel: 'Reference rate',
    },
    home: {
      heroKicker: 'Dominican Republic & Haiti',
      heroTitle: 'Precision Electronics & Trusted Device Care.',
      heroSubtitle:
        'Shop unlocked smartphones, laptops, and accessories in DOP or USD, or consult our technicians for electronics repair assessments via WhatsApp.',
      heroShopCta: 'Shop Electronics',
      heroRepairsCta: 'Explore Repair Services',
      featuredHeading: 'Featured Hardware',
      featuredSubheading: 'Curated smartphones, laptops, and daily accessories ready for WhatsApp order confirmation.',
      viewAllProducts: 'View All Products',
      repairExploreCta: 'Explore Repair Services',
      repairRequestCta: 'Request a Repair',
      marketsHeading: 'Built for the Dominican Republic & Haiti',
      marketsSubheading: 'Transparent single-currency totals and direct owner confirmation before any payment.',
      drCardTitle: 'Dominican Republic Coverage',
      drCardBody:
        'Province and municipality checkout fields with delivery rates confirmed directly or matched to configured zones.',
      htCardTitle: 'Haiti Coverage',
      htCardBody:
        'Department and commune checkout fields tailored for local delivery coordination across Haiti.',
      whatsappOrderTitle: 'Direct WhatsApp Verification',
      whatsappOrderBody:
        'No online card charges. Every purchase or repair inquiry goes straight to +1 829 653 4437 for personal confirmation.',
    },
    product: {
      inStock: 'Available for Inquiry',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to Cart',
      viewDetails: 'View Details',
      saveToWishlist: 'Save to Wishlist',
      savedInWishlist: 'Saved in Wishlist',
      selectVariant: 'Configuration / Variant',
      specifications: 'Technical Specifications',
      askWhatsapp: 'Inquire on WhatsApp',
      sku: 'SKU',
      category: 'Category',
      backToShop: 'Back to Shop',
      notFound: 'Product not found.',
    },
    shop: {
      allProducts: 'All Electronics',
      smartphones: 'Smartphones',
      laptops: 'Laptops',
      accessories: 'Accessories',
      filterByBrand: 'Brand',
      allBrands: 'All Brands',
      sortBy: 'Sort',
      sortFeatured: 'Featured',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      resultsCount: 'items',
      noResults: 'No products match your active filters.',
      clearFilters: 'Clear Filters',
    },
    wishlist: {
      title: 'Saved Wishlist',
      subtitle: 'Keep track of devices you plan to order in DOP or USD.',
      emptyTitle: 'Your wishlist is empty',
      emptyBody: 'Save smartphones, laptops, or accessories while browsing the shop.',
      moveToCart: 'Add to Cart',
      remove: 'Remove',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is currently empty.',
      subtotal: 'Subtotal',
      currencyDisclaimer: 'Final payment currency and exchange rate must be confirmed with the owner before payment.',
      proceedCheckout: 'Proceed to Checkout',
      continueShopping: 'Browse Shop',
      remove: 'Remove',
      qty: 'Qty',
    },
    checkout: {
      title: 'WhatsApp Order Checkout',
      subtitle: 'Complete your destination details to generate an order request for +1 829 653 4437.',
      countryLabel: 'Destination Country',
      drName: 'Dominican Republic',
      htName: 'Haiti',
      fulfillmentLabel: 'Fulfillment Method',
      deliveryOption: 'Delivery',
      pickupOption: 'Store Pickup',
      pickupSelectLabel: 'Select Store Pickup Location',
      deliveryZoneLabel: 'Delivery Zone',
      noZonesConfigured: 'Delivery availability and fees: To be confirmed with the owner.',
      fullName: 'Full Name',
      whatsappNumber: 'WhatsApp Number',
      province: 'Province',
      municipality: 'Municipality / City',
      streetAddress: 'Street Address',
      department: 'Department',
      commune: 'Commune / City',
      deliveryAddress: 'Delivery Address',
      deliveryNotes: 'Delivery Notes (Optional)',
      deliveryNotesPlaceholder: 'Landmark, building reference, or preferred delivery time...',
      selectOption: 'Select an option',
      orderSummary: 'Order Summary',
      itemsSubtotal: 'Items Subtotal',
      deliveryFee: 'Delivery Fee',
      toBeConfirmed: 'To be confirmed',
      total: 'Estimated Total',
      currencyRuleNote:
        'Orders are not paid or confirmed until verified by RÉGIS ELECTRONICS. Final payment currency and exchange rate must be confirmed with the owner before payment.',
      submitWhatsapp: 'Generate WhatsApp Order',
      validationRequired: 'Please complete all required destination fields.',
      validationPhone: 'Please enter a valid WhatsApp phone number.',
      emptyCartWarning: 'Add at least one item to your cart before checking out.',
      generatedTitle: 'Order Message Ready for WhatsApp',
      generatedNotice:
        'Your order is NOT submitted or confirmed yet. Click below to open WhatsApp and send this message to +1 829 653 4437.',
      openWhatsappBtn: 'Open WhatsApp & Send Order',
      copyMessageBtn: 'Copy Order Message',
      copied: 'Copied',
      orderRefLabel: 'Order Reference',
      editDetails: 'Edit Order Details',
    },
    repairs: {
      headline: 'Expert Electronics Repair Services',
      subheading:
        'Having trouble with your device? Contact RÉGIS ELECTRONICS to request a repair assessment and estimate.',
      pricingBannerTitle: 'Transparent Repair Estimates',
      pricingDefault:
        'Repair costs depend on the device, problem, and parts required. Contact us for an estimate.',
      startingAt: 'Starting at',
      fixedPrice: 'Configured price',
      requestRepairBtn: 'Request Repair',
      noEnabledServicesTitle: 'Proposed Repair Categories Pending Owner Activation',
      noEnabledServicesBody:
        'Service categories appear here once enabled by the RÉGIS ELECTRONICS administrator. You can still submit a repair inquiry below for any device.',
      goToAdminServices: 'Manage Repair Services in Admin',
      supportedLocationsTitle: 'Configured Repair Service Locations',
      locationsTbc: 'Service locations are confirmed directly upon WhatsApp assessment.',
      formTitle: 'Request a Repair Assessment',
      formSubtitle:
        'Fill in your device details below to prepare a prefilled WhatsApp inquiry for +1 829 653 4437.',
      fullName: 'Customer Full Name',
      whatsappPhone: 'WhatsApp Phone Number',
      country: 'Country',
      cityLocation: 'City / Location',
      deviceCategory: 'Device Category',
      deviceBrand: 'Device Brand',
      deviceModel: 'Device Model',
      problemDescription: 'Problem Description',
      issueStarted: 'When the Problem Started (Optional)',
      issueStartedPlaceholder: 'e.g., Yesterday, 3 days ago, after a drop...',
      preferredContact: 'Preferred Contact Method',
      contactWhatsapp: 'WhatsApp',
      contactPhone: 'Phone Call',
      photoLabel: 'Optional Device Photos',
      photoHelper:
        'WhatsApp text links cannot attach local image files automatically. After WhatsApp opens, please attach your selected photos directly in the chat.',
      additionalNotes: 'Additional Notes (Optional)',
      submitBtn: 'Request Repair via WhatsApp',
      validationError: 'Please fill in all required fields marked with *.',
      generatedTitle: 'Repair Inquiry Ready to Send',
      generatedNotice:
        'Your request has NOT been received yet. Click the button below to open WhatsApp and manually press Send to deliver your message to +1 829 653 4437.',
      openWhatsappBtn: 'Open WhatsApp & Send Inquiry',
      copyMessageBtn: 'Copy Message',
      copied: 'Copied',
      manualPhotoReminder: 'Remember to attach your selected photo(s) directly inside the WhatsApp chat.',
    },
    about: {
      title: 'About RÉGIS ELECTRONICS',
      subtitle: 'Connecting customers across the Dominican Republic and Haiti with reliable hardware and honest repair support.',
      missionTitle: 'Built on Direct Communication & Real Accountability',
      missionBody:
        'RÉGIS ELECTRONICS combines curated consumer technology sales with transparent device repair assessments. Every purchase and service request is reviewed directly by our team on WhatsApp before payment or work begins.',
      valuesTitle: 'How We Operate',
      value1Title: 'Dual-Currency Clarity',
      value1Body: 'Browse seamlessly in Dominican Pesos (DOP / RD$) or US Dollars (USD / $) using clear owner-maintained rates.',
      value2Title: 'Cross-Border Readiness',
      value2Body: 'Dedicated checkout flows tailored to provinces in the Dominican Republic and departments in Haiti.',
      value3Title: 'Honest Diagnostics',
      value3Body: 'We never invent repair guarantees or fixed quotes without inspecting the device and parts required.',
    },
    contact: {
      title: 'Contact RÉGIS ELECTRONICS',
      subtitle: 'Reach our team directly on WhatsApp for product availability, delivery confirmation, or repair estimates.',
      whatsappDirectTitle: 'Official Business WhatsApp',
      whatsappDirectBody: 'Speak directly with our team at +1 829 653 4437 for order verification and repair support.',
      openChatBtn: 'Message on WhatsApp',
      quickFormTitle: 'Send a Direct Inquiry via WhatsApp',
      nameLabel: 'Your Name',
      countryLabel: 'Country',
      messageLabel: 'How can we help?',
      sendWhatsappBtn: 'Prepare WhatsApp Message',
      locationsTitle: 'Configured Store Locations',
      locationsEmpty: 'No physical pickup storefronts configured yet. Contact us via WhatsApp for delivery coordination.',
    },
    footer: {
      tagline: 'Electronics sales and repair services for the Dominican Republic and Haiti.',
      catalogHeading: 'Navigation',
      supportHeading: 'Customer Care',
      marketsHeading: 'Service Markets',
      marketsList: 'Dominican Republic · Haiti',
      whatsappLabel: 'WhatsApp',
      currencyNote: 'Prices displayed in DOP or USD using administrator-configured rates.',
      rights: 'All rights reserved.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      shop: 'Tienda',
      smartphones: 'Smartphones',
      laptops: 'Laptops',
      accessories: 'Accesorios',
      repairs: 'Reparaciones',
      about: 'Nosotros',
      contact: 'Contacto',
      admin: 'Admin',
      searchPlaceholder: 'Buscar smartphones, laptops, accesorios...',
      wishlist: 'Favoritos',
      cart: 'Carrito',
      menu: 'Menú',
    },
    currency: {
      dopLabel: 'DOP (RD$)',
      usdLabel: 'USD ($)',
      confirmNotice: 'La moneda final de pago y la tasa de cambio deben confirmarse con el propietario antes de pagar.',
      rateLabel: 'Tasa de referencia',
    },
    home: {
      heroKicker: 'República Dominicana y Haití',
      heroTitle: 'Electrónica de Precisión y Cuidado Confiable.',
      heroSubtitle:
        'Compra smartphones desbloqueados, laptops y accesorios en DOP o USD, o consulta a nuestros técnicos para evaluaciones de reparación por WhatsApp.',
      heroShopCta: 'Ver Tienda',
      heroRepairsCta: 'Servicios de Reparación',
      featuredHeading: 'Productos Destacados',
      featuredSubheading: 'Smartphones, laptops y accesorios listos para confirmación de pedido por WhatsApp.',
      viewAllProducts: 'Ver Todo el Catálogo',
      repairExploreCta: 'Explorar Reparaciones',
      repairRequestCta: 'Solicitar Reparación',
      marketsHeading: 'Diseñado para República Dominicana y Haití',
      marketsSubheading: 'Totales claros en una sola moneda y confirmación directa antes de cualquier pago.',
      drCardTitle: 'Cobertura en República Dominicana',
      drCardBody:
        'Campos de provincia y municipio con tarifas de envío confirmadas directamente o según zonas configuradas.',
      htCardTitle: 'Cobertura en Haití',
      htCardBody:
        'Campos de departamento y comuna adaptados para coordinar entregas locales en todo Haití.',
      whatsappOrderTitle: 'Verificación Directa por WhatsApp',
      whatsappOrderBody:
        'Sin cobros en línea. Cada compra o solicitud de reparación llega directo al +1 829 653 4437 para confirmación.',
    },
    product: {
      inStock: 'Disponible para consulta',
      outOfStock: 'Agotado',
      addToCart: 'Agregar al Carrito',
      addedToCart: 'Agregado al Carrito',
      viewDetails: 'Ver Detalles',
      saveToWishlist: 'Guardar en Favoritos',
      savedInWishlist: 'Guardado en Favoritos',
      selectVariant: 'Configuración / Variante',
      specifications: 'Especificaciones Técnicas',
      askWhatsapp: 'Consultar por WhatsApp',
      sku: 'SKU',
      category: 'Categoría',
      backToShop: 'Volver a la Tienda',
      notFound: 'Producto no encontrado.',
    },
    shop: {
      allProducts: 'Toda la Electrónica',
      smartphones: 'Smartphones',
      laptops: 'Laptops',
      accessories: 'Accesorios',
      filterByBrand: 'Marca',
      allBrands: 'Todas las Marcas',
      sortBy: 'Ordenar',
      sortFeatured: 'Destacados',
      sortPriceAsc: 'Precio: Menor a Mayor',
      sortPriceDesc: 'Precio: Mayor a Menor',
      resultsCount: 'artículos',
      noResults: 'Ningún producto coincide con los filtros seleccionados.',
      clearFilters: 'Limpiar Filtros',
    },
    wishlist: {
      title: 'Lista de Favoritos',
      subtitle: 'Guarda los equipos que planeas pedir en DOP o USD.',
      emptyTitle: 'Tu lista de favoritos está vacía',
      emptyBody: 'Guarda smartphones, laptops o accesorios mientras exploras la tienda.',
      moveToCart: 'Agregar al Carrito',
      remove: 'Eliminar',
    },
    cart: {
      title: 'Carrito de Compras',
      empty: 'Tu carrito está vacío.',
      subtotal: 'Subtotal',
      currencyDisclaimer: 'La moneda final de pago y la tasa de cambio deben confirmarse con el propietario antes de pagar.',
      proceedCheckout: 'Ir al Checkout',
      continueShopping: 'Seguir Comprando',
      remove: 'Eliminar',
      qty: 'Cant.',
    },
    checkout: {
      title: 'Checkout por WhatsApp',
      subtitle: 'Completa los datos de destino para generar tu solicitud de pedido al +1 829 653 4437.',
      countryLabel: 'País de Destino',
      drName: 'República Dominicana',
      htName: 'Haití',
      fulfillmentLabel: 'Modalidad de Entrega',
      deliveryOption: 'Envío a Domicilio',
      pickupOption: 'Retiro en Tienda',
      pickupSelectLabel: 'Selecciona Sucursal de Retiro',
      deliveryZoneLabel: 'Zona de Envío',
      noZonesConfigured: 'Disponibilidad y costo de envío: Por confirmar con el propietario.',
      fullName: 'Nombre Completo',
      whatsappNumber: 'Número de WhatsApp',
      province: 'Provincia',
      municipality: 'Municipio / Ciudad',
      streetAddress: 'Dirección Exacta',
      department: 'Departamento',
      commune: 'Comuna / Ciudad',
      deliveryAddress: 'Dirección de Entrega',
      deliveryNotes: 'Notas de Entrega (Opcional)',
      deliveryNotesPlaceholder: 'Referencia, edificio o horario preferido...',
      selectOption: 'Selecciona una opción',
      orderSummary: 'Resumen del Pedido',
      itemsSubtotal: 'Subtotal de Productos',
      deliveryFee: 'Costo de Envío',
      toBeConfirmed: 'Por confirmar',
      total: 'Total Estimado',
      currencyRuleNote:
        'El pedido no se considera pagado ni confirmado hasta que RÉGIS ELECTRONICS lo verifique. La moneda final y tasa de cambio se confirman antes de pagar.',
      submitWhatsapp: 'Generar Pedido en WhatsApp',
      validationRequired: 'Por favor completa todos los campos requeridos.',
      validationPhone: 'Ingresa un número de WhatsApp válido.',
      emptyCartWarning: 'Agrega al menos un producto al carrito antes de continuar.',
      generatedTitle: 'Mensaje de Pedido Listo para WhatsApp',
      generatedNotice:
        'Tu pedido AÚN NO se ha enviado ni confirmado. Haz clic abajo para abrir WhatsApp y enviar este mensaje al +1 829 653 4437.',
      openWhatsappBtn: 'Abrir WhatsApp y Enviar Pedido',
      copyMessageBtn: 'Copiar Mensaje',
      copied: 'Copiado',
      orderRefLabel: 'Referencia',
      editDetails: 'Editar Datos',
    },
    repairs: {
      headline: 'Servicios Expertos de Reparación Electrónica',
      subheading:
        '¿Tienes problemas con tu dispositivo? Contacta a RÉGIS ELECTRONICS para solicitar una evaluación y presupuesto de reparación.',
      pricingBannerTitle: 'Presupuestos Transparentes',
      pricingDefault:
        'Los costos de reparación dependen del dispositivo, el problema y las piezas requeridas. Contáctanos para un presupuesto.',
      startingAt: 'Desde',
      fixedPrice: 'Precio configurado',
      requestRepairBtn: 'Solicitar Reparación',
      noEnabledServicesTitle: 'Categorías Propuestas Pendientes de Activación',
      noEnabledServicesBody:
        'Las categorías de servicio aparecerán aquí cuando el propietario de RÉGIS ELECTRONICS las habilite. Aún puedes enviar una solicitud abajo para cualquier dispositivo.',
      goToAdminServices: 'Gestionar Reparaciones en Admin',
      supportedLocationsTitle: 'Ubicaciones de Servicio Configuradas',
      locationsTbc: 'Las ubicaciones de servicio se confirman directamente por WhatsApp.',
      formTitle: 'Solicitar Evaluación de Reparación',
      formSubtitle:
        'Completa los datos de tu dispositivo para generar una consulta prellenada por WhatsApp al +1 829 653 4437.',
      fullName: 'Nombre Completo del Cliente',
      whatsappPhone: 'Número de WhatsApp',
      country: 'País',
      cityLocation: 'Ciudad / Ubicación',
      deviceCategory: 'Categoría del Dispositivo',
      deviceBrand: 'Marca del Dispositivo',
      deviceModel: 'Modelo del Dispositivo',
      problemDescription: 'Descripción del Problema',
      issueStarted: 'Cuándo Comenzó el Problema (Opcional)',
      issueStartedPlaceholder: 'Ej.: Ayer, hace 3 días, tras una caída...',
      preferredContact: 'Método de Contacto Preferido',
      contactWhatsapp: 'WhatsApp',
      contactPhone: 'Llamada Telefónica',
      photoLabel: 'Fotos del Dispositivo (Opcional)',
      photoHelper:
        'Los enlaces de texto de WhatsApp no pueden adjuntar archivos locales automáticamente. Cuando se abra WhatsApp, adjunta tus fotos manualmente en el chat.',
      additionalNotes: 'Notas Adicionales (Opcional)',
      submitBtn: 'Solicitar Reparación por WhatsApp',
      validationError: 'Por favor completa todos los campos obligatorios marcados con *.',
      generatedTitle: 'Solicitud de Reparación Lista para Enviar',
      generatedNotice:
        'Tu solicitud AÚN NO ha sido recibida. Haz clic abajo para abrir WhatsApp y presiona Enviar manualmente hacia el +1 829 653 4437.',
      openWhatsappBtn: 'Abrir WhatsApp y Enviar Solicitud',
      copyMessageBtn: 'Copiar Mensaje',
      copied: 'Copiado',
      manualPhotoReminder: 'Recuerda adjuntar las fotos seleccionadas directamente dentro del chat de WhatsApp.',
    },
    about: {
      title: 'Sobre RÉGIS ELECTRONICS',
      subtitle: 'Conectamos a clientes en República Dominicana y Haití con tecnología confiable y soporte honesto.',
      missionTitle: 'Comunicación Directa y Responsabilidad Real',
      missionBody:
        'RÉGIS ELECTRONICS combina la venta de equipos seleccionados con evaluaciones transparentes de reparación. Cada pedido o consulta es atendido directamente por nuestro equipo vía WhatsApp.',
      valuesTitle: 'Cómo Trabajamos',
      value1Title: 'Claridad en Dos Monedas',
      value1Body: 'Consulta precios en Pesos Dominicanos (DOP / RD$) o Dólares (USD / $) con tasas mantenidas por la administración.',
      value2Title: 'Enfoque Binacional',
      value2Body: 'Formularios adaptados a provincias de República Dominicana y departamentos de Haití.',
      value3Title: 'Diagnósticos Honestos',
      value3Body: 'Nunca garantizamos reparaciones ni precios fijos sin revisar primero el equipo y las piezas necesarias.',
    },
    contact: {
      title: 'Contacto — RÉGIS ELECTRONICS',
      subtitle: 'Comunícate por WhatsApp para disponibilidad, confirmación de envíos o presupuestos de reparación.',
      whatsappDirectTitle: 'WhatsApp Oficial del Negocio',
      whatsappDirectBody: 'Escríbenos directamente al +1 829 653 4437 para verificar pedidos o reparaciones.',
      openChatBtn: 'Escribir por WhatsApp',
      quickFormTitle: 'Enviar Consulta Rápida por WhatsApp',
      nameLabel: 'Tu Nombre',
      countryLabel: 'País',
      messageLabel: '¿En qué podemos ayudarte?',
      sendWhatsappBtn: 'Preparar Mensaje de WhatsApp',
      locationsTitle: 'Ubicaciones Configuradas',
      locationsEmpty: 'Aún no hay sucursales físicas configuradas. Contáctanos por WhatsApp para coordinar entrega.',
    },
    footer: {
      tagline: 'Venta de electrónica y servicios de reparación para República Dominicana y Haití.',
      catalogHeading: 'Navegación',
      supportHeading: 'Atención',
      marketsHeading: 'Mercados',
      marketsList: 'República Dominicana · Haití',
      whatsappLabel: 'WhatsApp',
      currencyNote: 'Precios mostrados en DOP o USD según tasa configurada por el administrador.',
      rights: 'Todos los derechos reservados.',
    },
  },
  ht: {
    nav: {
      home: 'Akèy',
      shop: 'Boutik',
      smartphones: 'Telefòn',
      laptops: 'Òdinatè',
      accessories: 'Akseswa',
      repairs: 'Reparasyon',
      about: 'Sou Nou',
      contact: 'Kontak',
      admin: 'Admin',
      searchPlaceholder: 'Chèche telefòn, òdinatè, akseswa...',
      wishlist: 'Favori',
      cart: 'Panye',
      menu: 'Meni',
    },
    currency: {
      dopLabel: 'DOP (RD$)',
      usdLabel: 'USD ($)',
      confirmNotice: 'Lajan final pou peye a ak to echanj lan dwe konfime ak mèt magazen an anvan ou peye.',
      rateLabel: 'To referans',
    },
    home: {
      heroKicker: 'Repiblik Dominiken ak Ayiti',
      heroTitle: 'Elektwonik Presizyon ak Swen Aparèy Konfyans.',
      heroSubtitle:
        'Achte telefòn debloke, òdinatè, ak akseswa an DOP oswa USD, oubyen kontakte teknisyen nou yo sou WhatsApp pou estimasyon reparasyon.',
      heroShopCta: 'Vizite Boutik la',
      heroRepairsCta: 'Sèvis Reparasyon',
      featuredHeading: 'Pwodwi Seleksyone',
      featuredSubheading: 'Telefòn, òdinatè, ak akseswa ki pare pou konfimasyon kòmand sou WhatsApp.',
      viewAllProducts: 'Wè Tout Pwodwi yo',
      repairExploreCta: 'Dekouvri Sèvis Reparasyon',
      repairRequestCta: 'Mande yon Reparasyon',
      marketsHeading: 'Fèt pou Repiblik Dominiken ak Ayiti',
      marketsSubheading: 'Total klè nan yon sèl lajan ak konfimasyon dirèk anvan nenpòt peman.',
      drCardTitle: 'Sèvis nan Repiblik Dominiken',
      drCardBody:
        'Chan pwovens ak minisipalite ak frè livrezon ki konfime dirèkteman oswa selon zòn ki konfigire.',
      htCardTitle: 'Sèvis an Ayiti',
      htCardBody:
        'Chan depatman ak komin ki adapte pou kowòdone livrezon lokal an Ayiti.',
      whatsappOrderTitle: 'Verifikasyon Dirèk sou WhatsApp',
      whatsappOrderBody:
        'Pa gen peman kat sou entènèt. Chak kòmand oswa demann reparasyon ale dirèk nan +1 829 653 4437.',
    },
    product: {
      inStock: 'Disponib pou demann',
      outOfStock: 'Pa gen nan stòk',
      addToCart: 'Ajoute nan Panye',
      addedToCart: 'Ajoute nan Panye',
      viewDetails: 'Wè Detay',
      saveToWishlist: 'Sere nan Favori',
      savedInWishlist: 'Nan Favori ou',
      selectVariant: 'Konfigirasyon / Varyan',
      specifications: 'Espesifikasyon Teknik',
      askWhatsapp: 'Mande sou WhatsApp',
      sku: 'SKU',
      category: 'Kategori',
      backToShop: 'Retounen nan Boutik',
      notFound: 'Pwodwi sa a pa jwenn.',
    },
    shop: {
      allProducts: 'Tout Elektwonik',
      smartphones: 'Telefòn',
      laptops: 'Òdinatè',
      accessories: 'Akseswa',
      filterByBrand: 'Mak',
      allBrands: 'Tout Mak yo',
      sortBy: 'Klase',
      sortFeatured: 'Seleksyon',
      sortPriceAsc: 'Pri: Pi piti pou pi wo',
      sortPriceDesc: 'Pri: Pi wo pou pi piti',
      resultsCount: 'atik',
      noResults: 'Pa gen pwodwi ki koresponn ak filtè ou yo.',
      clearFilters: 'Efase Filtè yo',
    },
    wishlist: {
      title: 'Lis Favori',
      subtitle: 'Sere aparèy ou vle kòmande an DOP oswa USD.',
      emptyTitle: 'Lis favori ou vid',
      emptyBody: 'Sere telefòn, òdinatè, oswa akseswa pandan w ap gade boutik la.',
      moveToCart: 'Ajoute nan Panye',
      remove: 'Retire',
    },
    cart: {
      title: 'Panye Acha',
      empty: 'Panye ou vid kounye a.',
      subtotal: 'Sou-total',
      currencyDisclaimer: 'Lajan final pou peye a ak to echanj lan dwe konfime ak mèt magazen an anvan ou peye.',
      proceedCheckout: 'Ale nan Kesye WhatsApp',
      continueShopping: 'Kontinye Achte',
      remove: 'Retire',
      qty: 'Kantite',
    },
    checkout: {
      title: 'Fini Kòmand sou WhatsApp',
      subtitle: 'Ranpli enfòmasyon destinasyon ou pou voye kòmand lan nan +1 829 653 4437.',
      countryLabel: 'Peyi Destinasyon',
      drName: 'Repiblik Dominiken',
      htName: 'Ayiti',
      fulfillmentLabel: 'Metòd Resepsyon',
      deliveryOption: 'Livrezon',
      pickupOption: 'Ranmase nan Magazen',
      pickupSelectLabel: 'Chwazi Magazen pou Ranmase',
      deliveryZoneLabel: 'Zòn Livrezon',
      noZonesConfigured: 'Disponiblite ak frè livrezon: Pou konfime ak mèt magazen an.',
      fullName: 'Non Konplè',
      whatsappNumber: 'Nimewo WhatsApp',
      province: 'Pwovens',
      municipality: 'Minisipalite / Vil',
      streetAddress: 'Adrès Ri',
      department: 'Depatman',
      commune: 'Komin / Vil',
      deliveryAddress: 'Adrès Livrezon',
      deliveryNotes: 'Nòt Livrezon (Opsyonèl)',
      deliveryNotesPlaceholder: 'Pwen referans, batiman, oswa lè ki bon pou ou...',
      selectOption: 'Chwazi yon opsyon',
      orderSummary: 'Rezime Kòmand',
      itemsSubtotal: 'Sou-total Atik yo',
      deliveryFee: 'Frè Livrezon',
      toBeConfirmed: 'Pou konfime',
      total: 'Total Estime',
      currencyRuleNote:
        'Kòmand lan pa peye ni konfime jiskaske RÉGIS ELECTRONICS verifye li. Lajan final ak to echanj ap konfime anvan peman.',
      submitWhatsapp: 'Prepare Kòmand WhatsApp',
      validationRequired: 'Tanpri ranpli tout chan obligatwa yo.',
      validationPhone: 'Tanpri antre yon nimewo WhatsApp ki valab.',
      emptyCartWarning: 'Ajoute omwen yon pwodwi nan panye anvan ou kontinye.',
      generatedTitle: 'Mesaj Kòmand lan Pare pou WhatsApp',
      generatedNotice:
        'Kòmand ou a POKO voye ni konfime. Klike anba a pou louvri WhatsApp epi voye mesaj la nan +1 829 653 4437.',
      openWhatsappBtn: 'Louvri WhatsApp & Voye Kòmand',
      copyMessageBtn: 'Kopye Mesaj la',
      copied: 'Kopye',
      orderRefLabel: 'Referans Kòmand',
      editDetails: 'Modifye Enfòmasyon',
    },
    repairs: {
      headline: 'Sèvis Reparasyon Elektwonik Pwofesyonèl',
      subheading:
        'Ou gen pwoblèm ak aparèy ou a? Kontakte RÉGIS ELECTRONICS pou mande yon evalyasyon ak estimasyon reparasyon.',
      pricingBannerTitle: 'Estimasyon Klè pou Reparasyon',
      pricingDefault:
        'Pri reparasyon yo depann de aparèy la, pwoblèm nan, ak pyès ki nesesè yo. Kontakte nou pou yon estimasyon.',
      startingAt: 'Kòmanse a',
      fixedPrice: 'Pri konfigire',
      requestRepairBtn: 'Mande Reparasyon',
      noEnabledServicesTitle: 'Kategori Reparasyon yo ap Tann Aktivasyon Mèt la',
      noEnabledServicesBody:
        'Kategori sèvis yo ap parèt isit la lè administratè RÉGIS ELECTRONICS aktive yo. Ou ka toujou voye yon demann reparasyon anba a pou nenpòt aparèy.',
      goToAdminServices: 'Jere Sèvis Reparasyon nan Admin',
      supportedLocationsTitle: 'Kote Sèvis Reparasyon Konfigire',
      locationsTbc: 'Kote sèvis yo konfime dirèkteman lè n ap evalye sou WhatsApp.',
      formTitle: 'Mande yon Evalyasyon Reparasyon',
      formSubtitle:
        'Ranpli detay aparèy ou a anba a pou prepare yon mesaj WhatsApp pou +1 829 653 4437.',
      fullName: 'Non Konplè Kliyan an',
      whatsappPhone: 'Nimewo Telefòn WhatsApp',
      country: 'Peyi',
      cityLocation: 'Vil / Kote',
      deviceCategory: 'Kategori Aparèy',
      deviceBrand: 'Mak Aparèy',
      deviceModel: 'Modèl Aparèy',
      problemDescription: 'Deskripsyon Pwoblèm nan',
      issueStarted: 'Kilè Pwoblèm nan Kòmanse (Opsyonèl)',
      issueStartedPlaceholder: 'Egz.: Yè, sa gen 3 jou, apre li te tonbe...',
      preferredContact: 'Mwayen Kontak Prefere',
      contactWhatsapp: 'WhatsApp',
      contactPhone: 'Apèl Telefonik',
      photoLabel: 'Foto Aparèy la (Opsyonèl)',
      photoHelper:
        'Lyen tèks WhatsApp yo pa ka voye fichye foto lokal otomatikman. Apre WhatsApp louvri, tanpri tache foto ou yo dirèkteman nan chat la.',
      additionalNotes: 'Lòt Nòt (Opsyonèl)',
      submitBtn: 'Mande Reparasyon sou WhatsApp',
      validationError: 'Tanpri ranpli tout chan obligatwa ki gen * yo.',
      generatedTitle: 'Demann Reparasyon an Pare pou Voye',
      generatedNotice:
        'Demann ou a POKO resevwa. Klike sou bouton anba a pou louvri WhatsApp epi peze Voye pou mennen l nan +1 829 653 4437.',
      openWhatsappBtn: 'Louvri WhatsApp & Voye Demann',
      copyMessageBtn: 'Kopye Mesaj',
      copied: 'Kopye',
      manualPhotoReminder: 'Sonje tache foto ou te chwazi yo dirèkteman anndan chat WhatsApp la.',
    },
    about: {
      title: 'Sou RÉGIS ELECTRONICS',
      subtitle: 'Nou sèvi kliyan nan Repiblik Dominiken ak Ayiti ak bon jan kalite aparèy ak sipò teknik onèt.',
      missionTitle: 'Kominikasyon Dirèk ak Konfyans Reyèl',
      missionBody:
        'RÉGIS ELECTRONICS mete ansanm vant aparèy elektwonik ak evalyasyon reparasyon klè. Ekip nou an revize chak kòmand ak chak demann dirèkteman sou WhatsApp anvan nenpòt peman.',
      valuesTitle: 'Fason Nou Travay',
      value1Title: 'Klète nan De Lajan',
      value1Body: 'Gade pri yo an Peso Dominiken (DOP / RD$) oswa Dola Ameriken (USD / $) ak to administratè a mete.',
      value2Title: 'Sèvis pou De Peyi',
      value2Body: 'Fòmilè ki adapte pou pwovens Repiblik Dominiken ak depatman Ayiti.',
      value3Title: 'Dyagnostik Onèt',
      value3Body: 'Nou pa janm bay fo garanti oswa pri fiks san nou pa egzamine aparèy la ak pyès ki nesesè yo.',
    },
    contact: {
      title: 'Kontakte RÉGIS ELECTRONICS',
      subtitle: 'Ekri ekip nou an sou WhatsApp pou disponiblite pwodwi, livrezon, oswa estimasyon reparasyon.',
      whatsappDirectTitle: 'WhatsApp Ofisyèl Biznis la',
      whatsappDirectBody: 'Pale dirèkteman ak ekip nou an nan +1 829 653 4437.',
      openChatBtn: 'Ekri sou WhatsApp',
      quickFormTitle: 'Voye yon Kesyon Dirèk sou WhatsApp',
      nameLabel: 'Non ou',
      countryLabel: 'Peyi',
      messageLabel: 'Kijan nou ka ede ou?',
      sendWhatsappBtn: 'Prepare Mesaj WhatsApp',
      locationsTitle: 'Adrès Magazen Konfigire',
      locationsEmpty: 'Pa gen magazen fizik ki konfigire ankò. Kontakte nou sou WhatsApp pou kowòdone livrezon.',
    },
    footer: {
      tagline: 'Vant elektwonik ak sèvis reparasyon pou Repiblik Dominiken ak Ayiti.',
      catalogHeading: 'Navigasyon',
      supportHeading: 'Sipò Kliyan',
      marketsHeading: 'Mache Sèvis',
      marketsList: 'Repiblik Dominiken · Ayiti',
      whatsappLabel: 'WhatsApp',
      currencyNote: 'Pri yo afiche an DOP oswa USD selon to administratè a konfigire.',
      rights: 'Tout dwa rezève.',
    },
  },
};
