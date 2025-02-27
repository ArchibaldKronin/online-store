// export const saveQueryToSession = (q: string) => sessionStorage.setItem('q', q);
// export const getQueryFromSession = () => sessionStorage.getItem('q') || '';
// export const clearQueryFromSession = () => sessionStorage.removeItem('q');

export function configureSessionStorageToStrings(field: string) {
  const saveStringToSession = (q: string) => sessionStorage.setItem(field, q);
  const getStringFromSession = () => sessionStorage.getItem(field) || '';
  const clearStringFromSession = () => sessionStorage.removeItem(field);
  return [saveStringToSession, getStringFromSession, clearStringFromSession] as const;
}
