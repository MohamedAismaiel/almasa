export const formatPrice = (p, currency = "EGP") => {
  let price = p;
  let formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: `${currency}`,
    minimumFractionDigits: 0,
  });
  if (currency === "USD") {
    price = p * 0.054;
  }
  if (currency === "EUR") {
    price = p * 0.051;
  }
  if (currency === "GBP") {
    price = p * 0.043;
  }
  price = formatter.format(price).replaceAll(".", ",");
  
  return price;
};
