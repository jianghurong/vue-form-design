import Vue from 'vue'
import App from './App.vue'

// 按需引入ant-design-vue
import {
  Row,
  Col,
  Icon,
  Form,
  Input
} from 'ant-design-vue'

Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(Form)
  .use(Input)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
