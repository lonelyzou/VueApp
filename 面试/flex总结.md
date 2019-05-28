#flex���ֻ���
##����֪ʶ
* ���� �� һ����Ч�Ĳ��ַ�ʽ����ʹ��֪���Ӵ��Ĵ�С����Ԫ��δ֪����������ܵģ����ĵ����ͷ���Ԫ�غͿռ�����֮��Ĺ�ϵ
* ���� 
   * Ĭ��ˮƽ����
   * Ĭ�ϲ�����
   * Ĭ��ʹ������Ԫ��ռ��һ�У����Զ�������Ԫ�صĴ�С(�ı�Ĭ�Ͽ��)
* ��������
   * flex��������(displayΪflex�ĸ�Ԫ��)
   * flex��Ŀ(flex���������е���Ԫ��)
   * flexbox��ʽ��������
   * ����: Main-Axis��
   * ����: Cross-Axis��
* �������ࣺ flex inline-flex
* flex �������ԣ� flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-conten

 * ��������
 
        ```
        flex-direction: row(����Ĭ��ֵ)  || 
                        column(����)  ||
                        row-reverse(���ᷭת)  || 
                        column-reverse(���ᷭת)
        ````
 * ��������

        ````
        flex-wrap : wrap(����) || nowrap(������Ĭ��ֵ) || wrap-reverse(������)
        
        ��д
        flex-flow: row wrap;
        ````

 * ���᲼������
````
justify-content: flex-start(�����Ĭ��ֵ) || 
                        flex-end(�Ҷ���) ||
                        center(���ж���) || 
                        space-between(���˶���:ƽ�������м����) ||
                        space-around(��ÿ��flex��Ŀ������ͬ�Ŀռ�)
 ````
 * ���᲼������
````
align-item: flex-start(�϶���) || 
                    flex-end(�¶���) || 
                    center(����) || 
                    stretch(����Ĭ��ֵ: ռ�������߶�) || 
                    baseline(���߶���)
````
 * ���в�������
````
align-content: flex-start(�����϶���) || 
                        flex-end(�����¶���) || 
                        center(���о���) || 
                        stretch(����Ĭ��ֵ: ����ռ�������߶�)
````
* flex��Ŀ����: order || flex-grow || flex-shrink || flex-basis

 * order : ����flex��Ŀ��flex��������������
 
        ````
        > Ĭ��ֵΪ 0
        > ���Խ�����ֵ�Լ���ֵ
        > flex��Ŀ���� `order` ��������
        > �����ͬ��ֵ����html�ĵ�˳�����(��float��ͬ)
        ````
  * flex-grow �� flex-shrink: ��������flex��Ŀ�������ж���Ŀռ��ʱ����ηŴ�û�пռ��ʱ�������С
        ````
        > �ɽ��� 0 ����������� 0 ������
        > flex-grow: Ĭ��ֵΪ 0 `flex-shrink`: Ĭ��ֵΪ 1
        > 0 �� ���� �ֱ��ʾ���ĹغͿ�
        > flex-grow: ����  `flex-shrink`: ����
        ````
 * flex-basis: ָ����Ŀ�� ��ʼ���� ��С
````
> Ĭ��ֵ auto�� flex��Ŀ��Ȼ����������Զ�����
> ȡֵ��ΧΪ width���Ե�����ֵ px || rem || em || % || vw || wh ��
> ���flex-basis ����ֵΪ 0��Ҳ��Ҫ�ṩ��λ
````
 * ��д: flex: flex-grow flex-shrink flex-basis
````
> `flex: 0 1 auto  //ȫΪĬ��ֵ`
> ���� flex��Ŀ `flex: 1 1`
> ��� flex��Ŀ `flex-basis: 150px`
> flex: none `flex: 0 0 auto` ������������ҹ�
> flex: auto `flex: 1 1 auto` ��ʼ������������ҹ������в�Ҫ���Զ�����
> flex: 'positive number' �������Դ����κ�����(�ȼ��� `flex: ���� 1 0`)
> ��� flex-grow ��ͬ��ֵ�ᰴ��������ʣ�µĿռ�
````

 * algin-self:  auto || flex-start || flex-end || center || baseline || stretch(���ڿ��Ƶ�ǰflex��Ŀ���᷽���ϵĲ���)
``
> auto �̳��Ը�Ԫ��, Ĭ��ֵΪ stretch(ʵ�ʻ��Ǽ̳��Ը�Ԫ�ص�Ĭ��ֵ)
``
* ���������flex��Ŀ
````
���� flex��Ŀ�ڵļ��ֻ�������ݴ�С���� flex-basis: 0
> ���� `flex-grow` ����ռ�
````
````
��� flex��Ŀ��������flex-grow���������� flex-basis: auto
> ͨ�������������ʼ��С
````
* Auto-margin����
```
ʹ�� margin: auto ���������������ռ������ʣ��ռ�
ʹ�� margin: auto �ᵼ��justify-contentʧЧ

* �л� flex-direction

    ````
    flex-direction: column ��������������л�����ʹ justify-content �� algin-item ���÷������ı�
    ```
* ������� (6��)
  * ������
  * [bug�б��Լ���ͨ��] https://github.com/philipwalt...
ĳЩ�����������������ԭ���ߴ�С flex: 0 0 90px;

  * �������: flex: 1 0 auto