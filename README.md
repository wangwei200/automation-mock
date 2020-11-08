## 安装

```shell
npm i automation-mock
```

## 导入

```js
const autoMock = require("automation-mock");
```

## 使用

项目根目录创建 mockjs 文件夹，然后通过 export default 进行导出

导出的 key 包含了请求路径和请求方法
导出的 value 就是处理函数

```js
export default {
  "http://localhost..... |get": (options) => {
    return {};
  },
};
```

## 开源协议
ISC