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
  DatePicker,
  TimePicker,
  Alert,
  Select,
  Button,
  Checkbox,
  Slider,
  ConfigProvider,
  Drawer,
  Empty
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
  .use(TimePicker)
  .use(Alert)
  .use(Select)
  .use(Button)
  .use(Checkbox)
  .use(Slider)
  .use(ConfigProvider)
  .use(Drawer)
  .use(Empty)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
