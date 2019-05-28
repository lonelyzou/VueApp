#flex布局基础
##基础知识
* 概念 ： 一个有效的布局方式，即使不知道视窗的大小或者元素未知的情况下智能的，灵活的调整和分配元素和空间两者之间的关系
* 特性 
   * 默认水平对齐
   * 默认不换行
   * 默认使所有子元素占满一行，并自动调整子元素的大小(改变默认宽度)
* 包含概念
   * flex布局容器(display为flex的父元素)
   * flex项目(flex布局容器中的子元素)
   * flexbox格式化上下文
   * 主轴: Main-Axis轴
   * 侧轴: Cross-Axis轴
* 包含种类： flex inline-flex
* flex 容器属性： flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-conten

 * 对齐属性
 
        ```
        flex-direction: row(主轴默认值)  || 
                        column(侧轴)  ||
                        row-reverse(主轴翻转)  || 
                        column-reverse(侧轴翻转)
        ````
 * 换行属性

        ````
        flex-wrap : wrap(换行) || nowrap(不换行默认值) || wrap-reverse(反向换行)
        
        缩写
        flex-flow: row wrap;
        ````

 * 主轴布局属性
````
justify-content: flex-start(左对齐默认值) || 
                        flex-end(右对齐) ||
                        center(居中对齐) || 
                        space-between(两端对齐:平均分配中间距离) ||
                        space-around(让每个flex项目具有相同的空间)
 ````
 * 侧轴布局属性
````
align-item: flex-start(上对齐) || 
                    flex-end(下对齐) || 
                    center(居中) || 
                    stretch(拉伸默认值: 占满整个高度) || 
                    baseline(基线对齐)
````
 * 多行布局属性
````
align-content: flex-start(多行上对齐) || 
                        flex-end(多行下对齐) || 
                        center(多行居中) || 
                        stretch(拉伸默认值: 多行占满整个高度)
````
* flex项目属性: order || flex-grow || flex-shrink || flex-basis

 * order : 允许flex项目在flex容器中重新排序。
 
        ````
        > 默认值为 0
        > 可以接受正值以及负值
        > flex项目根据 `order` 重新排序
        > 面对相同的值，由html文档顺序决定(与float相同)
        ````
  * flex-grow 与 flex-shrink: 允许设置flex项目在容器有多余的空间的时候如何放大，没有空间的时候如何缩小
        ````
        > 可接受 0 或者任意大于 0 的正数
        > flex-grow: 默认值为 0 `flex-shrink`: 默认值为 1
        > 0 和 正数 分别表示填充的关和开
        > flex-grow: 主轴  `flex-shrink`: 侧轴
        ````
 * flex-basis: 指定项目的 初始计算 大小
````
> 默认值 auto， flex项目宽度基于内容物自动计算
> 取值范围为 width属性的任意值 px || rem || em || % || vw || wh 等
> 如果flex-basis 属性值为 0，也需要提供单位
````
 * 连写: flex: flex-grow flex-shrink flex-basis
````
> `flex: 0 1 auto  //全为默认值`
> 绝对 flex项目 `flex: 1 1`
> 相对 flex项目 `flex-basis: 150px`
> flex: none `flex: 0 0 auto` 计算与内容物挂钩
> flex: auto `flex: 1 1 auto` 初始计算与内容物挂钩，如有不要会自动缩放
> flex: 'positive number' 正数可以代表任何正数(等价于 `flex: 正数 1 0`)
> 多个 flex-grow 不同的值会按比例分配剩下的空间
````

 * algin-self:  auto || flex-start || flex-end || center || baseline || stretch(用于控制当前flex项目侧轴方向上的布局)
``
> auto 继承自父元素, 默认值为 stretch(实际还是继承自父元素的默认值)
``
* 绝对与相对flex项目
````
绝对 flex项目内的间距只根据内容大小计算 flex-basis: 0
> 基于 `flex-grow` 分配空间
````
````
相对 flex项目根据他的flex-grow属性做计算 flex-basis: auto
> 通过内容物决定初始大小
````
* Auto-margin对齐
```
使用 margin: auto 导致左右两方向会占据所有剩余空间
使用 margin: auto 会导致justify-content失效

* 切换 flex-direction

    ````
    flex-direction: column 导致主轴与侧轴切换，致使 justify-content 与 algin-item 作用方向发生改变
    ```
* 解决问题 (6类)
  * 兼容性
  * [bug列表以及变通性] https://github.com/philipwalt...
某些浏览器允许收缩后会比原本尺寸小 flex: 0 0 90px;

  * 解决方案: flex: 1 0 auto