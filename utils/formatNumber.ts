export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("en-IN").format(digit);
};
