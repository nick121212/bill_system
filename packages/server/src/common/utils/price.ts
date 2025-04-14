import BigNumber from "bignumber.js";

export function toPrice(price: number) {
  return BigNumber(price, 10).toNumber();
}

export function fromPrice(price: number) {
  return BigNumber(price / 100, 10).toNumber();
}
