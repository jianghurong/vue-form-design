<template>
    <a-config-provider :locale="zhCN">
        
        <div id="app">
            <div class="container-left">
                <a-row class="app-header" type="flex" align="middle">
                    <a-col flex="200">
                        <span class="app-name">Vue Form Design</span>
                    </a-col>
                    <a-col flex="auto">
                        <a href="https://github.com/jianghurong/vue-form-design" target="_blank">
                            <a-icon type="github" :style="{ fontSize: '24px' }"></a-icon>
                        </a>
                    </a-col>
                </a-row>
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
                                        <a-icon :type="component.self.icon" />
                                        {{ component.self.label }}
                                    </div>
                                </a-col>
                            </draggable>
                        </a-row>
                    </div>
                    <action-menu :formConfig="formConfig" :drawingList="drawingList"></action-menu>
                </div>
            </div>
            <div class="container-content">    
                <a-form v-bind="formConfig" class="container-form">
                    <draggable :list="drawingList" :group="{ name: 'componentsGroup' }" style="height: 100%">
                            <div v-for="(item, index) in drawingList" :key="index" class="component-item" @click="onActiveComponentChange(item)">
                                <a-form-item :label="item.self.showLabel ? item.self.label : ''">
                                    <render :render-slot="item" @input="onInput($event, item)" />
                                    <!-- 已废弃 原生组件 component 写法
                                        <component
                                        :is="item.self.htmlTag"
                                        v-bind="getComponentAttribute(item)"
                                    >
                                        <render v-if="item.slot"  :render-slot="item"></render>
                                    </component> -->
                                </a-form-item>
                                <div v-show="item === activeComponent" class="action-delete">
                                    <a-button shape="circle" icon="delete" @click="deleteComponent(index)"></a-button>
                                </div>
                            </div>
                    </draggable>
                </a-form>
                <div v-show="!drawingList.length" class="content-empty-info">
                    <a-empty description="点击左侧组件或拖入组件"></a-empty>
                </div>
            </div>
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
import { deepClone } from '@/utils/common'

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
            let clone = deepClone(component)
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
            let clone = deepClone(item)
            if (clone.self) delete clone.self
            if (clone.slot) delete clone.slot
            return clone
        },
        // 监听组件点击事件
        onActiveComponentChange(item) {
            this.activeComponent = item
        },
        // 删除组件
        deleteComponent(index) {
            this.drawingList.splice(index, 1)
        },
        // 监听表单项值的变化
        onInput(val, currentComponent) {
            this.activeComponent = currentComponent
            if (val !== undefined && val !== null) {
                if (this.activeComponent.checked !== undefined) {
                    this.activeComponent.checked = val
                }
                if (val.currentTarget !== undefined) { 
                    val = val.currentTarget.value
                }
                if (val.target !== undefined) {
                    val = val.target.value
                }
                if (this.activeComponent.defaultValue !== undefined) {
                    this.activeComponent.defaultValue = val
                } else if (this.activeComponent.checked !== undefined) {
                    this.activeComponent.checked = val
                }
            } else {
                 this.activeComponent.defaultValue = val
            }
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
        padding: 0 24px;
        height: 100%;
        overflow: auto;
        .app-header {
            padding: 12px 0;
            border-bottom: 1px solid #e8e8e8;
            .app-name {
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 1px;
            }
        }
        .component-list {
            padding: 12px 0;
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
        position: relative;
        flex: auto;
        height: 100%;
        overflow: auto;
        .container-form { height: 100%; }
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
                    background: #d9363e;
                }
            }
        }
        .content-empty-info {
            width: 100%;
            height: 100px;
            position: absolute;
            top: calc(50% - 50px);
        }
        .component-item {
            position: relative;
            padding: 24px 24px 0 24px;
            border: 1px solid transparent;
            &:hover {
                background: rgba(24, 144, 255, 0.1);
                border: 1px dashed #1890ff;
                color: #1890ff;
                cursor: move; 
            }
            .action-delete {
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
        }
    }
    .container-right {
        width: 350px;
        height: 100%;
        overflow: auto;
    }
    .container-left, 
    .container-content {
        border-right: 1px solid #e8e8e8;
    }

    // 谷歌滚动条样式
    ::-webkit-scrollbar{
        width: 8px;
        height: 8px;
        background-color: rgba(0, 0, 0, 0.05);
    }
    // 滚动条的轨道
    ::-webkit-scrollbar-track{
        background-color: rgba(0, 0, 0, 0.05);
    }
    // 滚动条的滑块按钮
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }
    // 滚动条的上下两端的按钮
    ::-webkit-scrollbar-button{
        height: 0px;
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
