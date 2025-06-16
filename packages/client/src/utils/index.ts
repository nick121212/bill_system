import BigNumber from 'bignumber.js';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import tinyPinyin from 'tiny-pinyin';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectIsEmpty(obj: Record<string, unknown>) {
  if (obj === null || obj === undefined) {
    return true;
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return true;
  }

  for (const key of keys) {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== '') {
      return false;
    }
  }

  return true;
}

export function convertEmptyToSearchAll(val: string) {
  if (val === ' ') {
    return '%';
  }
  return val;
}

export function fixStrLen(str: string, len: number) {
  if (str.length >= len) {
    return str;
  }

  return '0'.repeat(len - str.length) + str;
}

export function getPinYinFirstChar(str: string, lowerCase = true) {
  const pinyin = tinyPinyin.convertToPinyin(str, '-', lowerCase);

  return pinyin
    .split('-')
    .map((str) => {
      return str.charAt(0);
    })
    .join('');
}

export const convertPriceToServer = (price: number) => price;

export const convertPriceFromServer = (price: number) =>
  (BigNumber(price, 10).toNumber().toFixed(2) as any) * 1;

export const convertNo = (no: string) => {
  return no.split('-').pop() || no;
};
