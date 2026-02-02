export type RequireAll<T extends any[]> = Exclude<any[], T[number]> extends never ? T : never;

// Get the last member of a union
type LastOf<U> =
  UnionToIntersection<U extends any ? () => U : never> extends () => infer R ? R : never;

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void
  ? I
  : never;

/*
 * Convert union to tuple
LastOf<U> extracts one member from the union at a time.
UnionToTuple recursively removes that member and builds a tuple.
The result is a tuple containing all members exactly once.
 */
export type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
  ? T
  : UnionToTuple<Exclude<U, LastOf<U>>, [LastOf<U>, ...T]>;
