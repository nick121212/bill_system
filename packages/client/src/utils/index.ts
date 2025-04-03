import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

	  if (value !== null && value !== undefined && value !== "") {
		return false;
	  }
	}
  
  return true;
}