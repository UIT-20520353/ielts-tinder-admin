const isEmptyObject = (obj: object): boolean =>
  !obj ||
  (Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype);

export { isEmptyObject };
