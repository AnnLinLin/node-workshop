// console.log("Hello~")

function getSum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(getSum(2));
console.log(getSum(5));
console.log(getSum(10));
