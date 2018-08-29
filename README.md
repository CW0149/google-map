# google map

## 运行
项目使用create-react-app[https://github.com/facebook/create-react-app] 构建
* 进入项目根目录，npm install安装依赖
* 在生产环境下运行: npm start
* npm build 编译

## 使用的主要依赖及api
* google map api
* wiki api用来获取地点简介
* martirial ui用于样式

## 目录
* src/index.js为入口文件
* components内组件包括：地图、地图标记、非地图展示容器、搜索框、地点展示列表
* configs内配置文件包括：地图默认配置
* apis内接口包括：谷歌地图相关API-组件，wiki api

## 其他
项目使用create-react-app默认的service-worker, 生产环境下支持