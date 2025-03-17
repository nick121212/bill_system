/**
 * @description 随机id
 */
export const getRandomId = () => {
  let now = Date.now();
  return () => {
    return now++;
  }
}
