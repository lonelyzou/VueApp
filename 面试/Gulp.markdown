##什么是项目构建?
* 项目构建包括如下内容：
  * 代码转换：将 TypeScript 编译成JavaScript、将 LESS 编译成 CSS等。
  * 文件优化：压缩JavaScript、CSS、HTML 代码，压缩合并图片等。
  * 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分代码让其异步记在。
  * 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件。
  * 自动刷新：监听本地源代码变化，自动重新构建、刷新浏览器。
  * 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
  * 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。
* 构建工具就是做以上这些事，将源代码转换成可以执行的JavaScript、CSS、HTML 代码。

##构建环境的认识
* 我们对平时开发的代码区分了两种环境：
  * 开发环境 development
    * 自动编译运行项目、检查语法错误、详细的错误提示等... （能帮助程序员更好的写代码, 在内存中编译运行，没有任何文件输出）
  * 生产环境 production
    * 压缩代码、兼容性处理等...（生成打包后的项目文件，提供项目上线使用）
* 而我们使用的库也分为两种依赖：    
  * 开发依赖 devDependencies
    * 项目构建打包需要的依赖
  * 生产依赖 dependencies
    * 项目上线运行时需要的依赖
    
## 1、Gulp
###介绍
* gulp中文网：https://www.gulpjs.com.cn/
* gulp是与grunt功能类似的前端项目构建工具, 是基于nodejs平台运行
* 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
  合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
* gulp更高效(异步多任务), 更易于使用, 插件高质量
* 使用gulp插件
* 下文中使用的插件你都可以在npm或者gulp官网上找到具体的使用用法，我下面说做的配置都是基础或者默认的，你也可以自行配置
###gulp开发套路
* 开发套路：
    1. 去https://gulpjs.com/plugins/搜相关的插件  gulp-xxx
    2. 打开插件的npm仓库 看文档使用
    3. 下载并引入gulp插件
    4. 配置插件任务

###相关插件:

const uglify = require('gulp-uglify');
const LessAutoprefix = require('less-plugin-autoprefix');
// https://github.com/browserslist/browserslist
const autoprefix = new LessAutoprefix({ browsers: ["cover 99.5%", "not dead"] });

* gulp-eslint : js文件语法检查
* gulp-babel:  js语法转换
* gulp-browserify: 将commonjs模块化转换浏览器能识别的语法
* gulp-connect: 
* open:
* less-plugin-autoprefix:
* gulp-cssmin:  
* gulp-concat : 合并文件(js/css)
* gulp-uglify : 压缩js文件
* gulp-rename : 文件重命名
* gulp-less : 编译less
* gulp-clean-css : 压缩css
* gulp-livereload : 实时自动编译刷新
* 

###重要API

* gulp.src(filePath/pathArr) :指向指定路径的所有文件, 返回文件流对象,用于读取文件
* gulp.dest(dirPath/pathArr):指向指定的所有文件夹,用于向文件夹中输出文件
* gulp.task(name, [deps], fn):定义一个任务
* gulp.watch() :监视文件的变化

###* 安装gulp
  * npm install gulp-cli -g 全局安装
  * npm install gulp --save-dev 局部安装
  
### 配置编码: gulpfile.js
* 将所有要配置的的代码写到里面

##处理js文件

### 1、js文件语法检查
* 准备工作：创建js文件
  * src/js/module1.js
  * src/js/module2.js
  * src/js/module3.js
  * src/js/main.js
* 下载插件:
  * npm install gulp-eslint --save-dev
* 配置编码
  ```
  const gulp = require('gulp');
  const eslint = require('gulp-eslint');
  
  // 语法检查  必须有一个eslint的配置文件
  gulp.task('eslint', function () {
  // 读取所有的js文件， 返回值就是一个可读流
   return gulp.src(['src/js/*.js'])
    // 对流中的文件/数据进行语法检查
     .pipe(eslint())
     .pipe(eslint.format())
     .pipe(eslint.failAfterError())
     .pipe(livereload());
  })
  ```
* 在package.json中配置eslint的检查项
  ```
  
  "eslintConfig": {
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
        "module": true
      }
    }
  }
  
  //package.json文件内容，eslint的检查项放置位置
   "author": "",
   "license": "ISC",
   "dependencies": {},
   "devDependencies": {},
   "eslintConfig": {
     "parserOptions": {
       "ecmaVersion": 7,
       "sourceType": "module",
       "ecmaFeatures": {
         "module": true
       }
     }
   }
  ```
* 运行指令: `gulp eslint`

## 2、js语法转换
* 下载插件:
  * npm install --save-dev gulp-babel @babel/core @babel/preset-env
* 配置编码
  ```
  const babel = require('gulp-babel');

  // babel能将es6模块化语法转换为commonjs模块化语法
  // 能将es6及其以上的语法转换为es5及其以下的语法
  gulp.task('babel', () =>
    // 读取所有js文件
    gulp.src('src/js/*.js')
      // 进行语法转换
     .pipe(babel({
       presets: ['@babel/preset-env'] //此处需要修改，官网有误
     }))
     // 输出出去，输出路径
     .pipe(gulp.dest('build/js'))   
);
  ```
* 运行指令: `gulp babel`

## 3、将commonjs模块化转换浏览器能识别的语法
* 下载插件:
  * npm install --save-dev gulp-browserify
  * 注意：这里是将commonjs模块化语法后的js文件转换浏览器能识别的语法
* 配置编码
  ```
  const browserify = require('gulp-browserify');
  const rename = require("gulp-rename"); 
  //重命名文件，为了不与babel产生的文件命名起冲突，可以保留banel产生的js文件
  
  gulp.task('browserify', function() {
   // 只要放入口文件
    return gulp.src('build/js/app.js')
      .pipe(browserify())
      // 重命名文件
      .pipe(rename("built.js"))
      .pipe(gulp.dest('build/js'))  
   });
  ```
* 运行指令: `gulp browserify`

## 4、压缩JS
* 下载插件:
	* npm install --save-dev gulp-uglify
* 配置编码
	```
	const uglify = require('gulp-uglify');
	const rename = require('gulp-rename');
	
	gulp.task('uglify', function() {
	  return gulp.src('./build/js/built.js')
	    .pipe(uglify())
	    .pipe(rename('dist.min.js'))
	    .pipe(gulp.dest('./dist/js/'))
	});
	
	gulp.task('js-prod', gulp.series('js-dev', 'uglify'));  //顺序执行
	```
* 运行指令: `gulp js-prod`

##处理less文件
* 准备工作：创建less文件
  * src/less/test1.less
  * src/less/test2.less
  
### 1.将less编译成css
* 下载插件:
	* npm install gulp-less --save-dev 
* 配置编码
  ```
  const less = require('gulp-less');
  
  gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
     .pipe(less())
     .pipe(gulp.dest('./build/css')) 
  });
  
* 运行指令: `gulp less`
    
### 2、压缩css
* 下载插件
	* npm install gulp-clean-css less-plugin-autoprefix --save-dev 
	
* 配置编码
	```
	//第一种方案，采用gulp-clean-css
	const cleanCSS = require('gulp-clean-css');
	const LessAutoprefix = require('less-plugin-autoprefix');
	const autoprefix = new LessAutoprefix({ browsers: ["cover 99.5%", "not dead"] });
	const connect = require('gulp-connect');合并css文件
	
	gulp.task('css', function () {
	  return gulp.src('./src/less/*.less')
	    .pipe(less({
	      plugins: [autoprefix] //自动扩展样式的兼容性前缀
	    }))  //将less文件转换成css文件
	    .pipe(concat('dist.min.css'))  //合并css文件
	    .pipe(cleanCSS({compatibility: 'ie8'}))  //压缩css文件
	    .pipe(gulp.dest('./dist/css'))
	});
	
	//第二种方案，采用gulp-cssmin
	const cssmin = require('gulp-cssmin');合并css文件
	const LessAutoprefix = require('less-plugin-autoprefix');
	const autoprefix = new LessAutoprefix({ browsers: ["cover 99.5%", "not dead"] });
	//与LessAutoprefix相配合，使用autoprefixer从less转换后为css添加前缀，因为有些浏览器对一些带有前缀的css才能识别
	const connect = require('gulp-connect');
	
    gulp.task('css', function () {
     return gulp.src('./src/less/*.less')
      .pipe(concat('dist.min.css'))
      .pipe(less({
       plugins: [autoprefix]
      }))
      .pipe(cssmin())
      .pipe(gulp.dest('./dist/css'))
    });
	```
* 运行指令: `gulp css`  

##处理html
### 1.压缩html
* 下载插件:
  * npm install gulp-htmlmin --save-dev
* 配置编码
  ```
  var htmlmin = require('gulp-htmlmin');
  //压缩html任务
  gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除空格
      removeComments: true // 去掉注释
    }))
    .pipe(gulp.dest('dist'));
});
  
  ```
* 修改页面引入
  ```
  <link rel="stylesheet" href="css/dist.min.css">
  <script type="text/javascript" src="js/dist.min.js"></script>
  ```
* 运行指令: `gulp html`

##自动编译代码
* 下载插件
  * npm install gulp-livereload --save-dev
* 配置编码:
  ```
  const livereload = require('gulp-livereload');
            
  //所有的任务最后加上 .pipe(livereload()) 这条代码决定自动编译哪个任务
 
  gulp.task('watch', function() {
    livereload.listen();
    
    gulp.watch('src/less/*.less', gulp.series('less'));
    gulp.watch('src/js/*.js', gulp.series('js'));
  });
  
  ```
* 运行指令: `gulp watch`

##自动打开/更新页面（热更新）
* 下载插件
  * npm install gulp-connect open --save-dev
* 配置编码
  ```
  // 自动化 --> 自动编译  --> 自动刷新浏览器（热更新） --> 自动打开浏览器
    gulp.task('watch', function() {
      livereload.listen();
      // 开启服务器
      connect.server({
        name: 'Dev App',
        root: ['build'], //提供服务的根路径
        port: 3000,      //开启端口号
        livereload: true  //是否实时刷新
      });
      // 自动打开浏览器,开启链接
      open('http://localhost:3000');
      
      // 监视指定文件，一旦文件发生变化，就执行后面的任务
      gulp.watch('src/less/*.less', gulp.series('less'));
      gulp.watch('src/js/*.js', gulp.series('js-dev'));
    });
  ```
* 运行指令: `gulp watch`  

##配置默认任务 --> 执行以上多个任务
 ```
   //  gulp.series（）同步顺序执行，同一时间只能执行一个任务  速度慢
   // gulp.parallel（）异步执行，同一时间执行多个任务   速度快
    gulp.task('js-dev', gulp.series('eslint', 'babel', 'browserify')); 
    gulp.task('js-prod', gulp.series('js-dev', 'uglify')); 
    gulp.task('build', gulp.parallel('js-dev', 'less'));
    
    // 生产环境的指令: gulp prod
    gulp.task('prod', gulp.parallel('js-prod', 'css', 'html'));
    
    // 开发环境的指令： gulp start
    gulp.task('start', gulp.series('build', 'watch'));
 ```
 
##下面是我的 gulpfile.js配置文件
 ```
/*
  所有构建工具都是基于nodejs平台运行
 */
// 引入gulp
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require("open");
const uglify = require('gulp-uglify');
const LessAutoprefix = require('less-plugin-autoprefix');
// https://github.com/browserslist/browserslist
const autoprefix = new LessAutoprefix({ browsers: ["cover 99.5%", "not dead"] });
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');


// 语法检查  必须有一个eslint的配置文件
gulp.task('eslint', function () {
  // 读取所有的js文件， 返回值就是一个可读流
  return gulp.src(['src/js/*.js'])
    // 对流中的文件/数据进行语法检查
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(livereload());
})

// 语法转换
// babel能将es6模块化语法转换为commonjs模块化语法
// 能将es6及其以上的语法转换为es5及其以下的语法
gulp.task('babel', () =>
  // 读取所有js文件
  gulp.src('src/js/*.js')
    // 进行语法转换
    .pipe(babel({
      presets: ['@babel/preset-env'] //此处需要修改，官网有误
    }))
    // 输出出去
    .pipe(gulp.dest('build/js'))
    .pipe(livereload())
);

// 将commonjs的模块化语法转换成浏览器能识别语法
gulp.task('browserify', function() {
  // 只要放入口文件
  return gulp.src('build/js/app.js')
    .pipe(browserify())
    // 重命名文件
    .pipe(rename("built.js"))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});

// 压缩js代码
gulp.task('uglify', function () {
  return gulp.src('./build/js/built.js')
    .pipe(uglify())
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
})

// 将less编译成css
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

// 压缩css
gulp.task('css', function () {
  return gulp.src('./src/less/*.less')
    .pipe(concat('dist.min.css'))
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
});

// 压缩html
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除空格
      removeComments: true // 去掉注释
    }))
    .pipe(gulp.dest('dist'));
});

// 自动化 --> 自动编译  --> 自动刷新浏览器（热更新） --> 自动打开浏览器
gulp.task('watch', function() {
  livereload.listen();
  // 开启服务器
  connect.server({
    name: 'Dev App',
    root: ['build'],
    port: 3000,
    livereload: true  //热更新
  });
  // 打开浏览器
  open('http://localhost:3000');
  
  // 监视指定文件，一旦文件发生变化，就执行后面的任务
  gulp.watch('src/less/*.less', gulp.series('less'));
  gulp.watch('src/js/*.js', gulp.series('js-dev'));
});

// 配置默认任务 --> 执行以上多个任务
gulp.task('js-dev', gulp.series('eslint', 'babel', 'browserify')); 
gulp.task('js-prod', gulp.series('js-dev', 'uglify'));
// gulp.task('default', gulp.parallel('eslint', 'babel', 'browserify')); 
gulp.task('build', gulp.parallel('js-dev', 'less'));
// 生产环境的指令: gulp prod
gulp.task('prod', gulp.parallel('js-prod', 'css', 'html'));
// 开发环境的指令： gulp start
gulp.task('start', gulp.series('build', 'watch'));

//我的文件目录
![avatar](https://i.loli.net/2019/03/24/5c9737b812ca2.png)
