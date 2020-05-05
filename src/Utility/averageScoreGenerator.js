export default (array) => {
  if (Array.isArray(array)) {
    let length = array.length;
    let total = array.reduce((acc, curr) => {return acc + curr}, 0);
    return total / length;
  }
}