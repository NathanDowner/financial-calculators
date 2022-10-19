export function numberInputdFormatter(value?: string) {
  return value && !Number.isNaN(parseFloat(value))
    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '$ ';
}

export function numberInputPercentageFormatter(value?: string) {
  return value && !Number.isNaN(parseFloat(value)) ? `${value}%` : '% ';
}

export function numberInputParser(value?: string) {
  return value ? value.replace(/\$\s?|(,*)/g, '') : '';
}

export function numberInputpercentageParser(value?: string) {
  return value ? value.replace(/%/, '') : '';
}

export function currencyFormatter(value = 0, decimalPlaces = 2) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
  }).format(value);
}
