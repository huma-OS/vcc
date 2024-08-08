export const toUrlPath = (str: string): string => {
  return str.toLowerCase().replace(/ /g, '-');
};
