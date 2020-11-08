const MockJS = require("mockjs");

const path = require("path");
MockJS.setup({
  timeout: 400,
});

// 获取到导出的对象
const files = require.context(
  path.join(__dirname, "./src/mockjs"),
  true,
  /\.js$/
);

const currentArr = [];
files.keys().forEach((key) => {
  // 通过files.keys() 能够获取到对应目录下所有的文件名称,通过 default 属性可以获取到对应导出的内容
  if (files(key).default) currentArr.push(files(key).default);
  else throw new Error(`${key}没有通过 export default 进行导出`);
});

// 遍历 currentArr 进行mock
currentArr.length > 0 &&
  currentArr.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
      if (!path.includes("|"))
        throw new Error(`导出的${path}中没有利用|进行分割`);
      // 进行截取
      const protocal = path.split("|");
      // 进行mock
      MockJS.mock(new RegExp(`^${protocal[0]}`), protocal[1], target);
    }
  });
