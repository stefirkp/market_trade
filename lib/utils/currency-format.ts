export const formatCurrency = (currency: string, value: number) => {
  return `${currency} ${new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value)}`;
};
