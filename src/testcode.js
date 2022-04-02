const nextId = require("./utils/nextId");
const test = () => {

  function generateRandomArray(arrayLength) {
    const randomVariableArray = [];
    for (let i = 0; i < arrayLength; i++) {
      randomVariableArray.push(nextId());
    }
    return randomVariableArray;
  }




  return generateRandomArray(5)
};

console.log(test());
