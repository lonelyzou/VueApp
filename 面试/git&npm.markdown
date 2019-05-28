##使用git管理仓库
###1. 管理本地仓库
```
  - git init -y
  - 建立git忽略文件  .gitignore  只能忽略工作区文件
  - git add . / * / -A  将文件纳入git管理
  - git commit -m 'xxxxx'  提交更新
  - git reset HEAD 文件名      将文件从暂存区中撤回到工作目录
  - git branch  分支名               创建 ，查看一个分支
  - git checkout testing          切换分支（每次在切换分支前 提交一下当前分支）
```
### 2. 创建远程仓库
       github创建
###3. 本地和远程关联起来
      git remote add origin <url>  添加一个新的远程 Git 仓库
      git remote remove origin 删除关联
###4. 将本地代码推送到远程仓库去
      git clone xxxxx  克隆仓库
     * git push origin master/dev 提交
	 * git pull origin master/dev 更新
     * 克隆到本地只有master分支，需要再dev开发
	 * git fetch origin dev:development 拉取远程仓库dev分支的内容到本地development分支上
    
##npm
###初始化
    使用 NPM 生成 package.json 文件。package.json 相当于是一个项目的整体描述，其中记录了该项目的 git 地址，项目简介，依赖模块，bug 汇报地址等等信息
    npm init
    npm init –y
###全局安装
    全局安装：npm install <package> –g   /   npm i –g <package>
    全局更新：npm update -g <package>
    全局卸载: npm uninstall -g <package>
    查看全局目录: npm config get prefix  -->C:\Users\damu\AppData\Roaming\npm
            	npm root -g		-->C:\Users\damu\AppData\Roaming\npm\node_modules
###本地安装
    npm install webpack --save	
    将模块写入package.josn的dependencies属性(项目应用运行时依赖)
    npm install webpack --save-dev	
    将模块写入package.josn的devDependencies属性(项目应用开发时依赖)
    其他命令与全局安装的差不多，一一对应上即可。
###全局和本地区别
    全局安装：使开发者能在任何目录底下运行webpack命令
    局部安装：使项目使用本地的webpack版本
    npm install: 不带任何参数，这会安装 package.json 中记录的模块。
###npm 脚本
    npm允许在package.josn文件中，使用scripts字段定义脚本命令:
    "scripts":{ "build": "webpack" }
    运行脚本只需要 npm run build 即可。
    npm start是npm run start的简写
    查看npm可用的所有脚本 : npm run
###npx包执行器
    npx是内置的包执行器，npx会自动查找当前依赖包中的可执行文件，或者去 PATH 里找。如果依然找不到，就会帮你安装！
###淘宝镜像

##Gulp
###1、Gulp介绍
* 中文主页: http://www.gulpjs.com.cn/
* gulp是与grunt功能类似的**前端项目构建**工具, 也是基于Nodejs的自动**任务运行器**
* 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
  合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
* gulp更高效(异步多任务), 更易于使用, 插件高质量

### 2、重要API介绍
* gulp.src(filePath/pathArr) 
  * 用于读取文件
* gulp.dest(dirPath/pathArr)
  * 用于向文件夹中输出文件
* gulp.task(name, [deps], fn) 
  * 定义一个任务
* gulp.watch() 
  * 监视文件的变化
###使用
* 安装gulp
  * npm install gulp-cli -g 全局安装
  * npm install gulp --save-dev 局部安装
* 配置编码: gulpfile.js
    ```
    //引入gulp模块
    var gulp = require('gulp');
    //定义任务
    gulp.task('任务名', function() {
      // 将你的任务的任务代码放在这
    });
    //定义默认任务
    gulp.task('default', '任务')
    ```
* 构建命令: `gulp`

## webpack快速入门教程
### 1、了解Webpack相关
* 什么是webpack
  * Webpack是一个模块打包器(bundler)。
  * 在Webpack看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
  * 它将根据模块的依赖关系进行静态分析，生成对应的静态资源
* 五个核心概念
  * Entry：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
  * Output：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
  * Loader：loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只能解析 JavaScript）。
  * Plugins：插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。
  * Mode：模式，有生产模式production和开发模式development
* 理解Loader
  * Webpack 本身只能加载JS/JSON模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载
  * Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
  * 它本身是一个函数，接受源文件作为参数，返回转换的结果
  * loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。
* 理解Plugins
  * 插件可以完成一些loader不能完成的功能。
  * 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
* 配置文件(默认)
  * webpack.config.js : 是一个node模块，返回一个 json 格式的配置信息对象
	
### 2、开启项目
* 初始化项目，生成package.json文件
* 安装webpack（npm）
    
### 作用：
  * webpack能够编译打包js和json文件
  * 能将es6的模块化语法转换成浏览器能识别的语法
  * 能压缩代码
* 缺点：
  * 不能编译打包css、img等文件
  * 不能将js的es6基本语法转化为es5以下语法
* 改善：使用webpack配置文件解决，自定义功能
### 使用webpack配置文件
* 目的：在项目根目录定义配置文件，通过自定义配置文件，还原以上功能
* 文件名称：webpack.config.js

###基础配置，要先下载相关包
```
js语法检查，js语法转换， 打包less资源， 打包样式文件中的图片资源 ，打包html文件，打包html中图片资源
打包其他资源（字体） 自动编译打包运行 准备生产环境 提取css成单独文件 添加css兼容 压缩css 图片压缩 压缩html
```
###优化配置
* tree shaking，通常用于描述移除 JavaScript 上下文中的未引用代码。
* 懒加载 让特定的js文件不要一上来就加载
* code split，代码分割，提取公共代码成单独模块。方便缓存。
* 渐进式网络应用程序，其中最重要的是，在离线时应用程序能够继续运行功能。关掉服务器或者断开网络，这时神奇的事就发生了，我们网页还能正常浏览~

##node包查找机制
* 顺序查找，想看是不是node内建包，再看是不是自己的文件路径，再看是不是第三方包
1.node内建包
2.自己的文件路径（绝对/相对）
3.第三方包
###第三方包
根据module.paths查找（node查找第三方包需要依据的目录数组）
循环module.paths找到对应包目录
查找对应包目录下的package.json
查看package.json中的main字段
如果main字段指向一个路径，则找到相应文件
如果main不能解析位一个路径则找当前包目录下index.js
没index.js --> index.json --> 没有报错


