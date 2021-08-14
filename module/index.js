console.log("我是主程式");

let car = require("./car1");
console.log("我在car1之後");
const car2 = require("./car2");
// require檢查 car2 剛剛引用過,不會再執行
console.log("我在car2之後");
console.log(car2.getOwner());
// console.log(car);
// console.log(car.showBrand());

// require為CJS規範,非JS內建,瀏覽器不可使用
