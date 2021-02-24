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
            </div>
        </div>
        <div class="container-content">
            <draggable :list="drawingList" :group="{ name: 'componentsGroup' }">
                <a-form v-bind="formConfig">
                    <div v-for="(item, index) in drawingList" :key="index">
                        <a-form-item :label="item.__config__.label">
                            <component
                                :is="item.__config__.htmlTag"
                                v-bind="getComponentAttribute(item)"
                            >
                                <div v-if="item.__slot__ !== undefined" v-html="buildRadioGroupChildren()">
                                </div>
                            </component>
                        </a-form-item>
                    </div>
                </a-form>
            </draggable>
            <div v-show="!drawingList.length" class="content-empty-info">
                从左侧拖入或点选组件进行表单设计
            </div>
        </div>
        <!-- @todo 独立右侧模块 -->
        <div class="container-right">
            <right-menu
                :activeComponent="activeComponent"
                :formConfig="formConfig"
            >

            </right-menu>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { RightMenu } from '@/components/menu'
import {
    inputComponents,
    selectComponents,
    formConfig
} from '@/components/generator/config.js'

export default {
    name: 'App',
    components: {
        draggable,
        RightMenu
    },
    data() {
        return {
            inputComponents,
            formConfig,
            drawingList: [],
            activeComponent: {},
            baseField: 1000,
            leftComponents: [
                { title: '输入型组件', list: inputComponents },
                { title: '选择型组件', list: selectComponents },
            ],
        };
    },
    methods: {
        // 添加组件（顺序）
        addComponent(component) {
            // 深拷贝组件
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
            // @todo 删除__config__
            return item
        },
        // 生成a-radio-group子级
        buildRadioGroupChildren() {
            return `<a-radio >123</a-radio><a-radio >245</a-radio>`
        },
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
