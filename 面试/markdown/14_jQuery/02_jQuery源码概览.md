###核心对象
    jQuery的核心对象: $ (jQuery)
    
###jQuery对象 & Dom对象
    jQuery对象是Dom对象的集合
    jQuery对象包含了很多原生dom对象没有的方法
    jQuery插件使用的就是 $.extend({})
    
    检测 jQuery对象 & Dom对象
        Dom对象.nodeType
        jQuery对象.jquery
    
    jQuery对象 和 原生dom对象的装换
        $(domObj)           ---> jQueryObj
        
        jQueryObj[0]        --->    domObj
        jQueryObj.get(0)    --->    domObj 
                    
###$(document).ready(function(){})   
    $(function(){}) 