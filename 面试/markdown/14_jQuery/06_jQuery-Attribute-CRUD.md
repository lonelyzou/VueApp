###DOM操作-属性节点
####Attr
    处理 预定义属性中的 非布尔值属性
    attr(name)
    attr(name,val|obj|fn)
        fn(index,preval) ; 使用返回值设置
    removeAttr(name)
        name 可以以空格分隔代表多个
        
    
####Prop
    处理 预定义属性中的 布尔值属性
    prop(name)
    prop(name,val|obj|fn)
    removeProp(name)
         name 不可以以空格分隔代表多个
    
####Data
    代替 自定义属性 在元素中存储数据
    data([name])
    data(name,val|obj)
    removeData([name])
    jQuery.hasData(dom对象)
    
