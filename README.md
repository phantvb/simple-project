# 400

> 400

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    
│   │   └── resourse.js        // 所有请求链接
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             
│   │   ├── login               // 登录模块
│   │   ├── view                // 所有视图即模块
│   │   │    └── component        // 所有基本组件集合
│   │   └── index               // 布局
└────── router                 // 路由