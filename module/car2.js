console.log("我是car2");

let owner = "Jack";

module.exports = {
  setOwner: function (name) {
    owner = name;
  },
  getOwner: function () {
    return owner;
  },
};
