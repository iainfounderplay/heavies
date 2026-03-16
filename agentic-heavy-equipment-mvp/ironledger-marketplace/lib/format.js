export function money(value, currency = 'USD') {
  const number = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(number)
}

export function fullLocation(listing) {
  return [listing.location_city, listing.location_region, listing.country]
    .filter(Boolean)
    .join(', ')
}
