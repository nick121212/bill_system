import { chain } from "ramda";

/**
 * Flatten an array containing a tree structure
 * @param {T[]} trees - An array containing a tree structure
 * @returns {T[]} - Flattened array
 */
export function flattenTrees<T extends { children?: T[] }>(
  trees: T[] = [],
  sort: ((a: T, b: T) => number) | null = null
): T[] {
  return chain((node) => {
    let children = node.children || [];

    if (sort) {
      children = children.sort(sort);
    }

    return [node, ...flattenTrees(children)];
  }, trees);
}
