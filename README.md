# react-view-design
一个可视化生成H5的探索项目。目前住主要的目录还是记录和分享思路。正式可用，还需要继续打磨。

# 业务场景
1. 生成简单的h5页面
2. 一些页面虽然很像活动，但是要长期维护。比如一些和销售相关的页面，很简单，但是因为和转化率直接关联，相关人员有强烈的欲望频繁修改这些页面，比如换图片，调整一些结构的顺序，减少一些输入框之类的。这些细节，如果每次必须通过工程师来实施，上线的效率低下，而且工程师的时间一直被打断。
3. 可以根据已有模板，快速上线项目，如果没有，应该比较快速的生成。
4. 有版本管理的功能，生成的东西，如果直接上线，没有回退和历史记录，非常危险。

# 使用
1. clone project
2. npm install
3. `npm start` to start client. visit: `localhost:3027`
4. `npm run server` to start server. visit: `localhost:3333/static/c_499/design.html` or `http://localhost:3333/static/demo-form/design.html` to see demo.

# client 端的使用(server必须已经启动)

1. 访问：`localhost:3027`会有两个预定义的demo， 点击链接进入设计页面。
2. 随便玩玩，然后左侧第二个`tab`是保存，保存你修改
3. 返回首页， `localhost:3027`，可以生产页面
4. 访问 `localhost: 3333/static/${designId}/design.html`看效果


# 实现情况
这个项目比我最初的构想复杂很多。因此这个版本，是一边做，一边改。有些代码，能很明显看出实现思路的混乱。

不过磕磕绊绊，总算把我想实现的功能，实现的七七八八。不过因为没有其他资源，交互和视觉设计目前的原则是: 拍脑袋 + 怎么好实现怎么来 + antd 默认的设计;

另外有些react本身的机制，比如 jsx 不能直接使用数组 dom 和 react reconciliation的机制，拖拽这块实现的很蛋疼。

设计思路的前后有重大变化的点有：

## 组件关系：
  > 之前：每个组件占一个h5 页面的一横块，组件直接独立，没有嵌套关系.
  这种假设在只有简单组件的时候，是成立的，但是当涉及 `form`, `swipe`， `modal` 这类复杂组件时，完全没法应付。而这些组件不支持，这个项目永远只是玩具

  > 现在：组件有children的概念，支持无限嵌套

## 组件交互

  > 之前： 把用户设计的组件展示出来就可以了。
  swipe组件（轮播）等组件，是有行为，button的点击事件，也会触发相应的业务逻辑，所以只展示，对使用者来说很不友好

  有两种方式：
  1. 设计时，还是只有展示，当用户觉得设计的差不多了，可以通过预览看带有交互和逻辑的页面
  2. 直接支持设计时可交互

这两种方式实现难度都不小，n多细节。

  > 现在：目前选择的是第2种方式，但是同时要考虑生产的html也要自动有这些工程（实际时用的react,生成的是纯html + js), 所以很难做的，比如现在的swipe，添加任何的slide后，都必须点击下`初始化`按钮，才能在设计时有正确的行为

## 组件的布局

  > 之前： 按照dom流依次渲染即可
  实际上就是只有`position:static` 这一种情况支持，无力支持实际的项目

  >现在： 支持`position`的各种属性
  但是这样，对用户来说，是需要理解一些基本的css概念，而且支持拖拽就变得很必要。现在基本拖拽已经支持，但是有些困难（如上面的`实现情况`里所说)，目前没有思路去完美解决



# 特点
1. 生成html。 虽然使用项目的时候使用`react + mobx + ant-design`, 但是最终生产的是纯html + 预定义js/css,不依赖react生态
2. 设计事，使用可以直接使用数字(或者加px，效果一样)设置类似`宽度`这样的属性，生成的`html`使用`rem`，解决适配问题。但是这种情况下会有些假设，比如`lineHeight`会自动把设计数字，自动加上rem，但是`lineHeight`本身是允许无单位值的；因为h5上 1px 线问题，所以`border`的px不会转 rem，如果这些假设和你的情况不符，通过二次开发进行覆盖。
3. 可以进行二次开发。设计完成后，保存会生成一个 `design.json` 文件（参考 `server/designFiles/demo-form/design.json`）。可以在这个json文件所在目录下，编写`index.entry-script.js`注入js，添加业务逻辑；编写`index.scss`注入css，修改样式
4. 生成的代码有一定的维护性, 生成的结构大致如下（如果使用默认的生成模板）

```html
  <style>
    #design-dom-id-generate-when-design {
      ...style props
    }
  </style>
  <style>
    #your-custom-css-in-index-scss {}
  </style>
  <div>
    <div id="design-dom-id-generate-when-design">
      <!-- children dom-->
    </div>
  </div>
  <script>
    // 预定义的js，如果组件需要一些js逻辑，这里添加相关代码
  </script>
  <script>
    // your code
  </script>
```
