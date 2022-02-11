import { PackageGroup } from "utils/const";

type PackageKey = keyof typeof PackageGroup;
export type PackageValue = typeof PackageGroup[PackageKey]["value"];
export type PackageLabel = typeof PackageGroup[PackageKey]["label"];

export type ProductType = {
  id: string;
  name: string;
  type: string;
  img: string;
  price: number;
  amount: number;
};
