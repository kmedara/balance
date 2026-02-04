/**
 * Given an object type T and some subset descriptor Subset, keep only the properties of T that are represented by Subset
 * If Subset is a key → keep that key

If Subset is an array of keys → keep those keys

If Subset is an object type → keep overlapping keys

If Subset is a discriminated union → keep overlapping keys
 * @param obj
 * @returns
 */
export function filterProps(obj) {
    const o = obj;
    return { ...o };
}
/**
 * Gets a subset of properties in T that are specified in K
 * @param o
 * @returns
 */
// export const filter = <T extends K, K extends object>(o: T): Pick<T, keyof K> => {
//   return { 
//     ...Object.entries(o).filter(e => Object.hasOwnProperty(e[0]))
//   }
// }
//# sourceMappingURL=util.js.map