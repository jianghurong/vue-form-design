import Vue from 'vue'
import App from './App.vue'

// 按需引入ant-design-vue
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  InputNumber,
  Tabs,
  Switch,
  Radio,
  Rate,
  DatePicker
} from 'ant-design-vue'

Vue.use(Row)
  .use(Col)
  .use(Icon)
  .use(Form)
  .use(Input)
  .use(InputNumber)
  .use(Tabs)
  .use(Switch)
  .use(Radio)
  .use(Rate)
  .use(DatePicker)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
