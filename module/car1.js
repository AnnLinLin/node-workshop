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

// exports = module.exports = {};
// module.exports = {};
// exports = module.exports;

// exports.showBrand=showBrand
// exports.showModel=showModel
// exports.showColor=showColor

//偷偷return module.exports;
//不要為 exports 重新宣告一個物件

module.exports = {
  showBrand,
  showModel,
  showColor,
};
