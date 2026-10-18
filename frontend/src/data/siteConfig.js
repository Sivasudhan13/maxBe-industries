/**
 * MAXBE PUMPS — Site Configuration
 * Real company details for MAXBE INDUSTRIES, Coimbatore.
 */

export const SITE_CONFIG = {
  companyName:   'MAXBE INDUSTRIES',
  brandName:     'MAXBE PUMPS',
  tagline:       'Low Voltage King',
  subTagline:    'Reliable Pumps. Powerful Performance.',
  established:   '1992',
  description:
    'MAXBE PUMPS by MAXBE INDUSTRIES — Low Voltage King. Premium monoblock, open well submersible and V4 submersible pumps for agriculture, residential and industrial applications. Est. 1992, Coimbatore.',

  // ── Contact ───────────────────────────────────────────────────────────────
  phone:          '94883 53564',
  phoneMobile2:   '94425 73564',
  phoneLandline:  '0422-2654185',
  email:          'maxbeindustries@yahoo.co.in',
  emailAlt:       'maxbeindustries@hotmail.com',
  website:        'www.maxbepumps.in',

  address:        '264/5, Kurukkampalayam Road, Ganeshapuram, MGC Palayam Post, Coimbatore – 641107',
  addressLine1:   '264/5, Kurukkampalayam Road, Ganeshapuram',
  addressLine2:   'MGC Palayam Post, Coimbatore – 641107',
  addressCity:    'Coimbatore',
  addressState:   'Tamil Nadu',
  addressPIN:     '641107',
  addressCountry: 'India',

  businessHours:  'Mon – Sat: 9:00 AM – 6:00 PM',

  // ── Social & WhatsApp ─────────────────────────────────────────────────────
  // WhatsApp: use the primary mobile number
  whatsappNumber:  '919488353564',   // 91 + 9488353564
  whatsappMessage: 'Hello MAXBE PUMPS, I would like to enquire about your pumps.',

  instagram: 'https://instagram.com/maxbepumps',   // update when available
  facebook:  'https://facebook.com/maxbepumps',    // update when available

  // ── Logo ──────────────────────────────────────────────────────────────────
  logo:    '/images/products/Maxbe Pumps Logo with Crest Emblem.png',
  logoAlt: 'MAXBE PUMPS — Low Voltage King',

  // ── Google Maps (real coordinates from Google Maps listing) ─────────────
  // No API key needed — uses the standard /maps/embed iframe format
  googleMapsEmbed: 'https://maps.google.com/maps?q=11.1649397,77.0569817&z=17&output=embed',
  googleMapsLink:  'https://www.google.com/maps/place/Maxbe+Industries/@11.1649397,77.0569817,17z',
  // Direct link to the street-view photo from the Maps listing (for display)
  googleMapsStreetviewUrl: 'https://www.google.com/maps/place/Maxbe+Industries/@11.1649397,77.0569817,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhDICzCztL7FfDKp1m-V2kyZ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9QvS8tauqFb_UeUl_z347POjCaSVI2pGlpCgTvU62_7ppWpWEAMM48kUGNYD31CPK85KaHzliOsvMv2gIBHbnV_9NeeANzdhwAEDmndwa3AtFlbceg2dK3WJ-FHwdxLCA4kchTvgePlmIpC%3Dw224-h306-k-no!7i4181!8i5712',

  // ── SEO ───────────────────────────────────────────────────────────────────
  siteUrl:  'https://www.maxbepumps.in',
  ogImage:  '/images/og-image.jpg',
}

export function getWhatsAppUrl(message = '') {
  const text = encodeURIComponent(message || SITE_CONFIG.whatsappMessage)
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`
}

export function getProductWhatsAppUrl(productName, model) {
  const text = encodeURIComponent(
    `Hello MAXBE PUMPS, I am interested in the ${productName} (Model: ${model}). Please share more details and pricing.`
  )
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`
}
