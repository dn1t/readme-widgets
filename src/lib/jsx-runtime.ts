export function jsx<P>(type: string, props: P) {
  return { type, props };
}

export const jsxs = jsx;
