/*
 * @Author: Richard Chiang
 * @Date: 2021-02-25 10:10:06
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-02 17:54:41
 * @Email: 19875991227@163.com
 * @Description: 动态表单设计器-生成器（负责将 JSON 数据渲染成 HTML）
 */

/**
 * 阅读前请熟悉 jsx 语法
 * https://cn.vuejs.org/v2/guide/render-function.html
 */

// 获取 VNode 的 property ,以便绑定 HTML 的 attribute
function originDataObjectBuilder() {
    return {
        class: {},
        style: {},
        attrs: {},
        props: {},
        domProps: {},
        on: {},
        nativeOn: {},
        directives: [],
        scopedSlots: {},
        slot: '',
        key: '',
        ref: '',
        refInFor: true
    }
}

// 将 JSON 的配置转化成 vue 解析器能识别的格式
function nodeDataObjectBuilder(dataObject, config) {
    Object.keys(config).forEach(key => {
        const val = config[key]
        if (dataObject[key] !== undefined) {
            dataObject[key] = val
        } else {
            if (key === 'defaultValue') {
                nodeBindVModel.call(this, dataObject, config.defaultValue)
            } else if (key === 'defaultChecked') {
                nodeBindVModel.call(this, dataObject, config.defaultChecked)
            }
            dataObject.attrs[key] = val
        }
        deleteExtraAttribute(dataObject)
    })
}

// 将 v-model 绑定到组件的 props
function nodeBindVModel(dataObject, val) {
    dataObject.props.value = val
    // 注意这里只能实现组件属性的单向绑定，我们需要实现双向绑定给组件添加 input 事件
    // input 事件支持绝大部分组件
    dataObject.on.input = e => {
        // 注意组件的 input 事件回调类型可能是几种
        this.$emit('input', e)
    }
    // change 事件支持下拉选择组件
    dataObject.on.change = e => {
        this.$emit('input', e)
    }
}

// 删除多余属性
function deleteExtraAttribute(dataObject) {
    delete dataObject.attrs.__config__
    delete dataObject.attrs.__slot__
}

// 子组件生成
function nodeChildrenBuilder(h, nodeClone, children) {
    const htmlTag = nodeClone.__config__.htmlTag
    if (compoentChild[htmlTag]) {
        children.push(compoentChild[htmlTag](h, nodeClone))
    }
}

// 子组件解析
const compoentChild = {
    'a-input': (h, nodeClone) => {
        const nodeList = []
        Object.keys(nodeClone.__slot__).forEach(key => {
            if (nodeClone.__slot__[key] !== '') {
                nodeList.push(<a-icon slot={key} type={nodeClone.__slot__[key]}></a-icon>)
            }
        })
        return nodeList
    },
    'a-radio-group': (h, nodeClone) => {
        const nodeList = []
        nodeClone.__slot__.optionList.forEach(option => {
            if (nodeClone.__config__.type === 'button') {
                nodeList.push(<a-radio-button value={option.value} disabled={option.disabled} button-style={nodeClone.buttonStyle}>{option.label}</a-radio-button>)
            } else {
                nodeList.push(<a-radio value={option.value} disabled={option.disabled}>{option.label}</a-radio>)
            }
        })
        return nodeList
    },
    'a-checkbox-group': (h, nodeClone) => {
        const nodeList = []
        nodeClone.__slot__.optionList.forEach(option => {
            nodeList.push(<a-checkbox value={option.value} disabled={option.disabled}>{option.label}</a-checkbox>)
        })
        return nodeList
    },
    'a-select': (h, nodeClone) => {
        const nodeList = []
        nodeClone.__slot__.optionList.forEach(option => {
            nodeList.push(<a-select-option value={option.value}>{option.label}</a-select-option>)
        })
        return nodeList
    }
}

export default {
    props: {
        renderSlot: {
            type: Object,
            required: true
        }
    },
    render(h) {
        const nodeDataObject = originDataObjectBuilder()
        const htmlTag = this.renderSlot.__config__.htmlTag
        const nodeClone = JSON.parse(JSON.stringify(this.renderSlot))
        const children = []
        nodeChildrenBuilder.call(this, h, nodeClone, children)
        nodeDataObjectBuilder.call(this, nodeDataObject, nodeClone)
        return h(htmlTag, nodeDataObject, children)
    }
}
