###什么是jQuery?
    JQuery 是继 prototype 之后又一个优秀的 Javascript 库(注意jQ不是框架);
    其本质是一套跨浏览器的 JavaScript 函数库，简化javascript与html之间的操作.
 
###jQuery的口号
    write less do more
    
###jQuery特点
    jQuery 的语法设计使得许多操作变得容易，
        如
            操作文档对象（document）、
            选择 DOM 元素、
            处理事件、
            
            创建动画效果、
            
            开发Ajax 程序、
            
            jQuery插件
                jQuery 也提供了给开发人员在其上创建插件的能力。
                这使开发人员可以对底层交互与动画、高级效果和高级主题化的组件进行抽象化。
                模块化的方式使 jQuery 函数库能够创建功能强大的动态网页以及网络应用程序。   
    
###jQuery优势
    1.jQuery1.x 系列浏览器层面的兼容性很强(几乎是兼容ie 678的)
           此处的兼容性 一般是指:dom的兼容性  ajax的兼容性
    2.庞大的插件生态
    3.语法比较精简 write less do more
    
###jQuery当下受到的冲击
    1.浏览器逐渐趋于标准化，除了国企和事业单位，IE8的兼容问题几乎可以忽略了，所以jQuery的兼容优势，越来越弱。
    2.随着浏览器的发展，css3越来越普及，那jQuery引以为傲的动画优势也越来越弱
    3.ajax这部分,出现了更轻量级的axios    
        
###jQuery版本
    V1.x  http://hemin.cn/jq/index.html（1.12.1API中文手册）
    V2.x  不支持ie 678;代码比较精简  
    V3.x  在2.x版本的基础上做了大量的性能优化 
            普通版:包括ajax 动画等....
            精简版:基本的dom操作 其他方面可以用更轻量级的库代替
    (我们一般使用1.x系列)

###jQuery编码风格
    编码函数化
    隐式迭代
    取赋值合体(读写二合一)
    链式调用    
          破坏性方法 会使链式调用出现问题
                    find
                    add
                    children
                    filter
          有些方法返回的不是jquery对象 会使链式调用失效
                    get
        
    
        
    
         
    
