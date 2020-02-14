export const cleanString = string => string.replace(/{.*?}/g, '');
export const isSuff = (string, criteria = []) => {
  return criteria.some(item => string.includes(item));
};
