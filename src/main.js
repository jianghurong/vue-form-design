import Vue from 'vue'
import App from './App.vue'

// 按需引入ant-design-vue
import {
  Row,
  Col,
  Icon
} from 'ant-design-vue'

Vue.use(Row)
  .use(Col)
  .use(Icon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
