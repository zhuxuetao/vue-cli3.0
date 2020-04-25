# 文档规范

> 光大

## 使用命令

```bash
# 安装 node_modules
npm install

# 开发用命令
npm run serve

# 生产环境打包命令
npm run build

#用来自动修复规则所报告的问题
npm run lint


#用来自动创建组件目录
npm run new:comp

#用来自动创建页面目录
npm run new:page
```

## 开发

###一、页面文件定义

##### 1、页面文件结构
在views下新建文件,文件名称对应该页面名称,如存在私有组件与index.vue同级创建

```javascript
views
|- page
|-- index.vue
```
介于每次定义组件都需要新建文件夹和index.vue这些重复动作,在本项目使用npm run new:page 命令自动创建

##### 2、页面私有组件
```javascript
views
|- page
|-- index.vue
|-- component.vue
```
文件私有组件与当前index.vue同级创建


###二、 组件使用

##### 1、命名（必要）

组件名称单词之间使用中划线。组件文件名同样。

```javascript
// my-component.vue 文件
export default {
  name: 'my-component',
  // ...
}
```

##### 2、引入（必要）

组件引入名务必使用 PascalCase 格式（也叫大驼峰格式——每个单词首字母大写）

```javascript
import MyComponent from './my-component.vue'
```

在 DOM 模板中使用中划线（必要）

```html
<my-component></my-component>
```

##### 3、全局基础组件

一个输入框或按钮之类的元素，相对通用。会在各个组件中被频繁的用到。

1、定义：

- 放在 components/global 目录下，文件命名使用大驼峰方式命名

```javascript
global/
|- BaseButton
|-- index.vue
```
介于每次定义组件都需要新建文件夹和index.vue这些重复动作,在本项目使用npm run new:comp 命令自动创建

2、使用：（注：不需要 import 导入和注册）

```vue
<template>
    <div>
      <!-- 直接使用即可 -->
      <base-button></base-button>
    </div>
</template>

<script type="text/ecmascript-6">
 // 不需要 import 导入和注册
</script>

<style scoped lang="scss">
</style>

```

##### 4、单例组件命名

单例组件非只使用一次的组件，而是不需要通过 props 传值的组件，
命名必须以 The 开头的 PascalCase 格式。（The 单词有唯一的意思）

```javascript
components/
|- TheHeading.vue
|- TheSidebar.vue
```

##### 5、只要父组件存在复用性很低的子组件，禁止建立子文件夹。而采用以父组件的名字作为前缀的父子组件同级结构。

``` javascript
components/
|- TodoList.vue // 父组件
|- TodoListItem.vue // 子组件
|- TodoListItemButton.vue // 子组件
```

##### 6、组件名中的单词顺序

组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

```javascript
例：search-button-clear.vue // 一个有清空功能的搜索按钮

   search           button  clear.vue
      |                |       |
    搜索              按钮    清空
      |                |       |
直接描述性形容词       主体    功能
```

```javascript
好例子：
components/
|- search-button-clear.vue
|- search-button-run.vue
|- search-input-exclude-glob.vue
|- search-input-query.vue
|- settings-checkbox-launchOn-startup.vue
|- settings-checkbox-terms.vue
```

```javascript
反例：
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

### 三、 prop 使用

##### 1、命名规范
在声明 prop 的时候，其命名应该始终使用 camelCase（小驼峰格式），而在模板和 JSX 中应该始终使用 kebab-case（烤串模式——单词小写，中划线分隔）。

```javascript
props: {
  greetingText: String
       |
   小驼峰格式
}
```
```html
<WelcomeMessage greeting-text="hi"/>
                        |
               DOM 中使用中划线格式
```

##### 2、多个特性的元素

多个特性的元素应该分多行撰写，每个特性一行。结构清晰，易于查看。建议有绑定属性的元素均采纳。

```html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
></MyComponent>
```

##### 3、prop 定义

prop 的定义应该尽量详细，至少需要指定其类型。

```javascript
好例子：
props: {
  status: {
    type: String, // 定义类型
    default: '', // 默认值
    required: true, // 是否必传
    validator: function (value) { // 校验
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### 四、 根路经引用

template 中图片引用根路径使用 ~images 即可。

```html
<img src="~images/***.png" alt="">
```

script 中引入 common下js 文件的使用
```JavaScript
// js 引用
import validator from 'common/validator'
```

style 中 scss 文件的引用根路径使用 ~sass 即可

```scss
// scss 引用
@import '~sass/***';

// 图片引用
div {
  background: url(~images/***.jpg) center no-repeat;
}
```

### 五、px 单位

所有 scss 编写使用 px 单位时，会自动转化为 rem

```text
不需要转化的 1px，在其属性末尾加 /*no*/
```

```scss
// 编译前
div { border: 1px solid red; /*no*/ padding: 0 26px;}

// 编译后
div { border: 1px solid red; padding: 0 0.856278rem;}
```

### 六、v-for

v-for 务必使用 key 绑定属性

```html
<ul>
  <li
    v-for="(user,index) in activeUsers"
    :key="index"
  >
    {{ user.name }}
  </li>
</ul>
```

### 七、vuex规范

1、 禁止修改 store 中的 index.js、guangda.js 文件

2、 添加vuex管理需在store/modules文件下添加js文件,文件名称以功能名称定义,该文件会自动写入vuex且每个模块内必须设置命名空间

```javascript
// 例：
export default {
  namespaced: true,
  state: {
    
  },
  actions: {
    
  },
  mutations: {
        
  }
}
```

- 在组件中提交 mutations，统一使用 mapMutations

```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations('guangda/page',[
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations('guangda/page',{
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

- 组件中分发异步 actions 的一般用法，统一使用 mapActions

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions('guangda/page',[
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions('guangda/page',{
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### 八、数据请求

使用全局 axios 来请求数据，禁止在 vue 文件中通过 import 引入

```javascript
// 例
this.$axios.get(url, {}).then(...).catch(...)
this.$axios.post(url, {}).then(...).catch(...)
```

### 九、图片存放路径

- 需要动态替换的图片统一放在根目录下的 static/images 下，动态替换即需要通过接口请求或js修改等后期维护的图片

- 不需要动态替换的小图标统一放在 src/common/images 下

### 十、项目内引入ES-Lint代码检查工具

- 引入版本为standard版本具体默认规则请查阅https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json



### 十一、Minxin

- 