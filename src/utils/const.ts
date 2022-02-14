export const productsURL =
  "https://run.mocky.io/v3/59f47e8e-2a09-48c3-8a1d-0af8e5817f7c";

export const PackageGroup = {
  Without: { label: "Без упаковки", value: "package-without" },
  Standart: { label: "Стандартная", value: "package-standart" },
  Present: { label: "Подарочная", value: "package-present" },
} as const;

export const HeaderNavGroup = {
  Page1: { label: "Страница 1", ref: "/" },
  Page2: { label: "Страница 2", ref: "/" },
  Page3: { label: "Страница 3", ref: "/" },
  Page4: { label: "Страница 4", ref: "/" },
  Page5: { label: "Страница 5", ref: "/" },
  Page6: { label: "Страница 6", ref: "/" },
} as const;

export const MIN_PRODUCT_AMOUNT = 1;
export const MAX_PRODUCT_AMOUNT = 99;
