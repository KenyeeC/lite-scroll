## 介绍
Lite-scroll 是个非常轻量的下拉刷新的插件，总代码不到100行。由于使用了UMD规范编写，它可以使用在Node.js或浏览器中，同时它也兼容移动端和PC端。另外，此插件的配置项也十分丰富

## 使用
Lite-scroll 主要分为两部分，block和wrapper
1. block: 即下拉时展开的部分，你可以再这里插入文字或图片，使得下拉时的提示更人性化。通常，这是一个高度为0的div;
2. wrapper: 即用户触碰的部分，如果你已写好一整个html页面，只需用一个div将其包住，就这么简单.

知道这两点后，我们就开始使用lite-scroll吧

#### 浏览器

以下例子是最简单的lite-scroll实例
```html
<body>
    <style>
        #scroll_block{
            height: 0px;
            overflow: hidden;
            text-align: center;
        }
        #scroll_wrapper{
            width: 100%;
            height: 500px;
            background-color: #333;
        }
    </style>
    <!-- block -->
    <div id="scroll_block">
        <p>下拉刷新</p>
    </div>
    <!-- wrapper -->
    <div id="scroll_wrapper"></div>
    <script src="./litescroll.min.js"></script>
    <script>
        var liteScroll = new LiteScroll({
            block: document.getElementById('scroll_block'),
            wrapper: document.getElementById('scroll_wrapper'),
        })
        liteScroll.init()
    </script>
</body>
```

以下例子包含所有的配置项并附上说明

```javascript
<script src="./litescroll.min.js"></script>
<script>
    var liteScroll = new LiteScroll({
        
        // 改变高度的元素，放在wrapper块的前面，下拉时，主要是这一块会被展开，因此初始高度一般为0
        block: document.getElementById('scroll_block'), 
        
        // 用户所滑动的区域
        wrapper: document.getElementById('scroll_wrapper'),
        
        // 平滑的滑动的距离，此部分没有阻尼效果, 默认为50px,你也可以通过rangePrefix来修改单位
        smoothScroll: 50,
        
        // 阻尼滑动距离，在平滑的滑动后会出现，此距离会乘以阻尼的系数roughcoefficient
        // 默认值为120px,你也可以通过rangePrefix来修改单位
        // 计算后的阻尼滑动距离为 roughScroll*roughcoefficient = 120*0.3 = 36 (当然这是默认的)
        roughScroll:120,
        
        // 阻尼系数, 默认是0.3
        roughcoefficient: 0.3,
        
        // 下拉后复原的时间，单位是ms，默认800ms
        revertSpeed: 800,
        
        // 下拉开始的事件
        scrollStart: function(e){
            blockCtn.innerText = 'pull to refresh'
        },
        
        // 下拉过程的事件
        scrollMoving: function(e){
            blockCtn.innerText = 'refreshing...'
        },

        // 下拉结束的事件
        scrollEnd: function(e){
            blockCtn.innerText = 'refresh end'
        },
        
        // 此属性可修改距离单位，默认直接返回px，你也可通过计算返回rem等单位
        rangePrefix: function(range){
            return range + 'px'
        },
        
        // 当你释放下拉，revertHandler会执行某些操作
        // revertHandler会判断condition的条件是否满足（condition需返回boolean），如果满足，则执行handler函数
        // 下面例子的效果是，下拉滑块会先恢复30px的高度，然后过两秒后再缩回到0
        // 默认地，revertHandler不会做任何事情，即马上恢复到0px的高度
        revertHandler: {
            condition: function(){
                return true
            },
            handler: function(revert){
                revert(30)
                setTimeout(function(){
                    revert(0)
                }, 2000)
            }
        }
    })
    liteScroll.init()
</script>
```
## Demo
![image](https://raw.githubusercontent.com/KenyeeC/lite-scroll/master/demo.gif)