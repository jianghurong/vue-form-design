<template>
    <a-config-provider :locale="zhCN">
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
                                :group="{
                                    name: 'componentsGroup',
                                    pull: 'clone',
                                    put: 'false',
                                }"
                            >
                                <a-col
                                    :md="12"
                                    :sm="24"
                                    v-for="(component, componentIndex) in item.list"
                                    :key="componentIndex"
                                >
                                    <div
                                        class="component-inner"
                                        @click="addComponent(component)"
                                    >
                                        <a-icon :type="component.__config__.icon" />
                                        {{ component.__config__.label }}
                                    </div>
                                </a-col>
                            </draggable>
                        </a-row>
                    </div>
                    <action-menu :formConfig="formConfig" :drawingList="drawingList"></action-menu>
                </div>
            </div>
            <div class="container-content">    
                <a-form v-bind="formConfig">
                    <draggable :list="drawingList" :group="{ name: 'componentsGroup' }">
                        <div v-for="(item, index) in drawingList" :key="index" class="compoment-item" @click="onActiveComponentChange(item)">
                            <a-form-item :label="item.__config__.showLabel ? item.__config__.label : ''">
                                <render :render-slot="item" @input="onInput" />
                                <!-- 已废弃 原生组件 component 写法
                                    <component
                                    :is="item.__config__.htmlTag"
                                    v-bind="getComponentAttribute(item)"
                                >
                                    <render v-if="item.__slot__"  :render-slot="item"></render>
                                </component> -->
                            </a-form-item>
                        </div>
                    </draggable>
                </a-form>
                <div v-show="!drawingList.length" class="content-empty-info">
                    从左侧拖入或点选组件进行表单设计
                </div>
            </div>
            <!-- TODO: 独立右侧模块 -->
            <div class="container-right">
                <right-menu
                    :activeComponent="activeComponent"
                    :formConfig="formConfig"
                >
                </right-menu>
            </div>
        </div>
    </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import draggable from 'vuedraggable'
import { RightMenu, ActionMenu } from '@/components/menu'
import {
    inputComponents,
    selectComponents,
    promptComponents,
    formConfig
} from '@/components/generator/config.js'
import render from '@/utils/render.js'

export default {
    name: 'App',
    components: {
        draggable,
        RightMenu,
        ActionMenu,
        render
    },
    data() {
        return {
            zhCN,
            formConfig,
            drawingList: [],
            activeComponent: {},
            baseField: 1000,
            leftComponents: [
                { title: '输入型组件', list: inputComponents },
                { title: '选择型组件', list: selectComponents },
                { title: '提示型组件', list: promptComponents }
            ]
        };
    },
    methods: {
        // 添加组件（顺序）
        addComponent(component) {
            // 深拷贝组件
            /* eslint-disable */
            let clone = JSON.parse(JSON.stringify(component))
            clone = this.createField(clone)
            this.drawingList.push(clone)
            this.activeComponent = clone
        },
        // 生成字段ID
        createField(clone) {
            ++this.baseField
            clone.__vModel__ = `fieId${this.baseField}`
            return clone
        },
        // 生成组件属性
        getComponentAttribute(item) {
            // TODO: 删除__config__优化
            let clone = JSON.parse(JSON.stringify(item))
            if (clone.__config__) delete clone.__config__
            if (clone.__slot__) delete clone.__slot__
            return clone
        },
        // 监听组件点击事件
        onActiveComponentChange(item) {
            this.activeComponent = item
        },
        // 监听表单项值的变化
        onInput(val) {
            if (val.currentTarget !== undefined) {
                val = val.currentTarget.value
            }
            this.activeComponent.defaultValue = val
        }
    },
};
</script>

<style lang="scss" scoped>
#app {
    width: 100%;
    height: 100vh;
    display: flex;
    .container-left {
        flex: 0 0 300px;
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
        flex: auto;
        height: 100%;
        ::v-deep {
            .sortable-ghost {
                position: relative;
                display: block;
                overflow: hidden;
                &::before {
                    content: " ";
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    height: 2px;
                    background: red;
                }
            }
        }
        .compoment-item {
            padding: 8px;
            border: 1px solid transparent;
            &:hover {
                background: rgba(24, 144, 255, 0.1);
                border: 1px dashed #1890ff;
                color: #1890ff;
                cursor: move; 
            }
        }
    }
    .container-right {
        width: 350px;
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
