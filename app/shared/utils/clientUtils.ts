"use client";

export const pluralize = (count: number, cases: [string, string, string]) => {
  if (count === 0) return cases[2];
  if (count > 0 && count < 5) return cases[1];
  if (count > 4) return cases[2];
  return cases[0];
};
