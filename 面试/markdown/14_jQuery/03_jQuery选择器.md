###jQuery选择器（css3中没有的）
    基本              内容                  可见性
    :eq(index)      :contains(text)         :hidden
    :gt(index)      :empty                  :visible
    :lt(index)      :has(selector)
    :header         :parent
    :animated 


###选择器性能建议
1. 尽量使用CSS中有的选择器
1. 避免过渡的约束
1. 尽量以ID开头
1. 让选择器的右边更具特征
1. 避免使用全局选择器
1. 缓存选择器的结果
    