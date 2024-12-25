/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let arr = [];
  nums.forEach((value, index, arr1) => {
    if (value != 0) arr.push(value);
  });

  nums.forEach((value, index, arr1) => {
    if (value == 0) arr.push(value);
  });
  return arr;
};

console.log(moveZeroes([0,1,0,3,12]));
