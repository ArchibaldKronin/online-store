export const saveStringToSession = (param: string, q: string) => sessionStorage.setItem(param, q);
export const getStringFromSession = (param: string) => sessionStorage.getItem(param) || '';
export const clearStringInSession = (param: string) => sessionStorage.removeItem(param);
