console.log("我是car1")
const car2 = require("./car2")

car2.setOwner("Paul")

let brand = "Tesla";
let model = "Model 3";
let color = "red";
let owner = "";

function showBrand() {
  return brand;
}

function showModel() {
  return model;
}
function showColor() {
  return color;
}

function setOwner(name){
    owner = name;
}

function showOwner() {
  return owner;
}

// 有兩種匯出方式(為物件)
// exports
// module.exports

// 1.會先做出空物件
// 兩者皆指向空物件
// exports = module.exports = {};
// module.exports = {};
// exports = module.exports;

// exports.showBrand=showBrand
// exports.showModel=showModel
// exports.showColor=showColor

//2.偷偷return module.exports;
//  不要為 exports 重新宣告一個物件

module.exports = {
  showBrand,
  showModel,
  showColor,
};
