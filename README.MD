## Introduce
Lite-scroll is a very lite scroll plugin for nodejs and browser(written in UMD). It can make a horizon sroll easily with less than 100 rows code.

## Usage
There are two parts in lite-scroll
1. block: It's a height change block.What you can see when you scroll, is block;
2. wrapper: The area that you touch and have some feeback, is wrapper.

Ok, let's start use lite-scroll

#### Broswer

The following example is easily instance
```html
<body>
    <div id="scroll_block"></div>
    <div id="scroll_wrapper">
        <!-- content -->
    </div>
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

This is an example with whole param and there descript

```javascript
<script src="./litescroll.min.js"></script>
<script>
    var liteScroll = new LiteScroll({
        
        // A block with changed height. Initially, it should have 0px height
        block: document.getElementById('scroll_block'), 
        
        // A wrapper can scroll
        wrapper: document.getElementById('scroll_wrapper'),
        
        // A scroll before roughScroll, and it's easy to scroll
        // default in 50
        smoothScroll: 50,
        
        // A scroll after smoothScroll, and it's difficult to scroll
        // default in 120
        // its distance is roughScroll*roughcoefficient  = 120*0.3 = 36 (by default)
        roughScroll:120,
        
        // Roughcoefficient, default in 0.3
        roughcoefficient: 0.3,
        
        // Speed of reverting to 0px height
        revertSpeed: 800,
        
        // Event when you start scroll
        scrollStart: function(e){
            blockCtn.innerText = 'pull to refresh'
        },
        
        // Event when you moving
        scrollEnd: function(e){
            blockCtn.innerText = 'refreshing...'
        },
        
        // If you need to change range Units, for example, change 'px' to 'rem'
        // By default, it will use 'px' as range units
        rangePrefix: function(range){
            return range + 'px'
        },
        
        // When you release the wrapper, revertHandler will do something
        // In this example, revertHandler will stay at 30px height in 2 minutes
        // By default, it will do nothing
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



