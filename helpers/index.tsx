export const formatCurrency = (num: number, currency = "USD") => {
  return num.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
};
