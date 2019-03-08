# google map

刚接触 React 的时候做的项目，先将它移植过来。

## 运行

项目使用create-react-app[https://github.com/facebook/create-react-app] 构建

* 进入项目根目录，npm install安装依赖
* 在生产环境下运行: npm start
* npm build 编译

## 使用的主要依赖及 api

* google map api
* wiki api 用来获取地点简介
* martirial ui用于样式

## 目录

* src/index.js为入口文件
* components内组件包括：地图、地图标记、非地图展示容器、搜索框、地点展示列表
* configs 内配置文件包括：地图默认配置
* apis 内接口包括：谷歌地图相关API-组件，wiki api

## 其他

项目使用 create-react-app 默认的 service-worker, 生产环境下支持

## 配置 google map key

在 src/configs 中新建一个 key.json 文件，在里面写入 google map key 字符串