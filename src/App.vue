<template>
  <div id="app">
    <div class="container-left">
      <div class="component-list">
        <div v-for="(item, index) in leftComponents" :key="index">
          <div class="component-title">
            <a-icon type="apartment" />
            {{ item.title }}
          </div>
          <a-row :gutter="[12, 12]" style="margin-bottom: 12px">
            <draggable
              :list="item.list"
              class="component-draggable"
            >
              <a-col :md="12" :sm="24" v-for="(component, componentIndex) in item.list" :key="componentIndex">
                <div class="component-inner" @click="addComponent(component)">
                  <a-icon :type="component.__config__.icon" />
                  {{ component.__config__.label }}
                </div>
              </a-col>
          </draggable>
          </a-row>
        </div>
      </div>
    </div>
    <div class="container-content">

    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { inputComponents, selectComponents } from '@/components/generator/config.js'

export default {
  name: 'App',
  components: {
    draggable
  },
  data() {
    return {
      inputComponents,
      leftComponents: [
        { title: '输入型组件', list: inputComponents },
        { title: '选择型组件', list: selectComponents }
      ]
    }
  },
  methods: {
    // 添加组件（顺序）
    addComponent(component) {
      // 深拷贝组件
      let clone = JSON.parse(JSON.stringify(component))
      console.log(clone)
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  .container-left {
    width: 300px;
    height: 100%;
    .component-list {
      padding: 24px;
      .component-title {
        margin-bottom: 12px;
      }
      .component-draggable {
        padding-bottom: 24px;
      }
      .component-inner {
        padding: 8px;
        background: #f5f5f5;
        border: 1px solid transparent;
        &:hover {
          border: 1px dashed #1890ff;
          color: #1890ff;
          cursor: move;
        }
      }
    }
  }
  .container-content {
    width: 100%;
    height: 100%;
  }
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
