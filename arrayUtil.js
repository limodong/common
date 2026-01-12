function sort(arr, callback) {
    let temp;
    if (!callback) {
        callback = (a, b) => a - b;
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (callback(arr[j], arr[j + 1]) > 0) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    // console.log(arr);
}
const numArr = [4, 77, 22, 3, 11, 1];
const objArr = [{ name: 'c', age: 19, height: 180 }, { name: 'b', age: 15, height: 177 }, { name: 'a', age: 20, height: 167 }, { name: 'f', age: 28, height: 180 }];
sort(objArr, (param1, param2) => param2.age - param1.age)

/**
 * i第一次循环当i=1时
 * j=0 -- 4<77  ==> 4, 77, 22, 3, 11, 1
 * j=1 -- 77>22 ==> 4, 22, 77, 3, 11, 1
 * j=2 -- 77>3  ==> 4, 22, 3, 77, 11, 1
 * j=3 -- 77>11 ==> 4, 22, 3, 11, 77, 1
 * j=4 -- 77>1  ==> 4, 22, 3, 11, 1, 77
 * 
 * i第二次循环当i=2时
 * j=0 -- 4<22  ==> 4, 22, 3, 11, 1, 77
 * j=1 -- 22>3  ==> 4, 3, 22, 11, 1, 77
 * j=2 -- 22>11 ==> 4, 3, 11, 22, 1, 77
 * j=3 -- 22>1  ==> 4, 3, 11, 1, 22, 77
 * j=4 -- 22<77 ==> 4, 3, 11, 1, 22, 77
 */

function filter(arr, callback) {
    if (!callback) {
        return [];
    }
    const result = [];
    // 如果满足条件就往新数组中添加
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            result.push(arr[i]);
        }
    }
    return result;
}
const temp = filter(objArr, (param, idx) => param.age === 28);
// console.log(temp);

function find(arr, callback) {
    if (!callback) return undefined;
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            return arr[i];
        }
    }
}
const findObj = find(objArr, (e) => e.name === "a");
// console.log("执行find方法查找到的第一个元素：", findObj);

function cout(arr, callback) {
    if (!callback) return 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            ++count;
        }
    }
    return count;
}
const num = cout(objArr, (e) => e.height < 180);
// console.log(`身高小于180的有${num}人`);


/**
 * 斐契那波数列
 * 1 1 2 3 5 8 13 21
 */
function func(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return func(n - 1) + func(n - 2)
}
// console.log(func(8));

/**
 * 阶乘
 * 5*4*3*2*1
 * 输入一个数，计算小于这个数之前的数字之和
 * 2*1
 */
function jc(n) {
    if (n - 1 === 0) {
        return 1
    }
    return jc(n - 1) * n
}

console.log(jc(5))