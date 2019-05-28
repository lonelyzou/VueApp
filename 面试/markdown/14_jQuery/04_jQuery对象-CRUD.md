###jQuery对象-CRUD
1. 检查获取到的jquery对象中的元素数量
    jqueryObj.length
    
2. R
    jqueryObj[index]        :返回对应的Dom元素
    jqueryObj.get([index])  :返回对应的Dom元素
    jqueryObj.get()          :返回jquery对象对应的 dom元素数组      
        jqueryObj.toArray() 
    jqueryObj.get(负值)      :返回对应的Dom元素从后往前获取
    jqueryObj.eq([index])   :返回对应的jquery对象 
    jqueryObj.eq(负值)       :返回jquery对象 从后往前获取
    jqueryObj.first()        :返回jquery对象 第一个  
    jqueryObj.last()         :返回jquery对象 最后一个
            绝大部分的jQuery对象的方法是不会报错的！！！！！
            
    filter(selector|fn)    
        fn: 返回值为true的时候当前对象被纳入   
    has(selector)  
        筛选出拥有特定后代（selector）的元素
    slice(start[,end])
    map(fn)
    each(fn)
    is(selector)
    
3. C
    add(selector)
    
4. D    
    not(selector|fn)           
         fn: 返回值为true的时候当前对象被排除

                   
               

