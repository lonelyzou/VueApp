###DOM操作-element
####R
1. jQuery选择器 + jQuery对象-CRUD
            
2. 父子级
     jqueryObj.children([seletor])  : (不考虑文本节点  子节点)
     jqueryObj.contents([seletor])  : (考虑文本节点    子节点)
     jqueryObj.find(seletor)         :  (不考虑文本节点  后代节点)
     
     jqueryObj.parent([seletor])    :   (父节点)
     jqueryObj.parents([seletor])   :   (祖先节点)
     jqueryObj.parentsUntil([seletor]): (到某一层为止的祖先节点)
     
     jqueryObj.closest([seletor])     :  (先找自己 再往上找最近的)
     注意：
         parents()将查找所有祖辈元素，
         children()只考虑子元素而不考虑所有后代元素

3. 兄弟级
     prev([seletor])
     prevall([seletor])
     prevUntil([seletor])
     
     next([seletor])
     nextall([seletor])
     nextUntil([seletor])
     
     siblings([seletor])    

4. 破坏性操作
        任何可以改变原始jQuery对象的操作都叫破坏性操作
            使用end()方法解决
            
5. addBack()                  
           
####C
    $("HTML代码片段") : 返回对应片段的jQ对象
    
    //需要注意的是此处的HTML代码片段 必须 是空的代码片段
    $("HTML代码片段",{  
        标签属性与属性值键值对，
        标签属性与属性值键值对
    })
    
    //此处的HTML代码片段不做要求
    $("HTML代码片段").attr({
        标签属性与属性值键值对，
        标签属性与属性值键值对
    })
####U
    内部插入(移动)
        append(content,[content,...,content])   
        prepend(content,[content,...,content])  
            : content可以是一个html片段 也可以是一个jQuery对象 也可以是一个包含前两者的数组 
        appendTo(target)
        prependTo(target)
            : target 一般是一个再页面上存在的jQuery对象
    外部插入（移动）
        after(content,[content,...,content])
        before(content,[content,...,content])
        insertAfter(target)
        insertBefore(target)
        
    复制
        clone([Even[,deepEven]])
            Even:是否复制本身的事件和数据
            deepEven:是否复制子元素的事件和数据
            
    替换
        replaceWith(content)
            将所有匹配的元素替换为指定的元素
        replaceAll(content)  
            replaceWith的反向方法
            
    包裹
            wrap(wrapper)： 为所有匹配的元素包裹一个wrapper
            wrapAll(wrapper)：将所有匹配的元素包裹在wrapper中
            wrapInner(wrapper)：将所有匹配的元素的内容包裹在wrapper中
                wrapper可以一个html片段 也可以是一个jQuery对象
            unwrap()：取消包裹    
####D
    remove([selector])
        会把对应的dom节点从文档中移除 但不会从jQuery对象中移除
        dom节点绑定的事件 和 数据 是不会恢复的
    detach([selector])    
        会把对应的dom节点从文档中移除 但不会从jQuery对象中移除
        dom节点绑定的事件 和 数据 是会恢复的
    empty()
        清空元素内的全部内容  保留dom结构 
    