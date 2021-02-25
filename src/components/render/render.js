/*
 * @Author: Richard Chiang
 * @Date: 2021-02-25 10:10:06
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-25 15:48:03
 * @Email: 19875991227@163.com
 * @Description: jsx 渲染组件
 */
export default {
    props: {
        renderSlot: {
            type: Object,
            required: true
        }
    },
    /* eslint-disable */
    render: function(h) {
        let renderList = []
        const htmlTag = this.renderSlot.__config__.htmlTag
        switch (true) {
            case  htmlTag === 'a-radio-group':
                renderList = this.buildRadioGroupChildren(this.renderSlot.__slot__.optionList)
                break
            // case this.renderSlot.__config__.htmlTag === 'a-select':
            //     renderList = this.buildSelectChildren(this.renderSlot.__slot__.optionList)
            //     break
            // case htmlTag === 'a-checkbox-group':
            //     renderList = this.buildCheckboxGroupChildren(this.renderSlot)
            //     break
            default:
                break
        }
        return <div>{renderList}</div>
    },
    methods: {
        // 生成单选组件子组件
        buildRadioGroupChildren(optionList) {
            const list = []
            if (this.renderSlot.__config__.type === 'button') {
                optionList.forEach(item => {
                    list.push(<a-radio-button value={item.value}>{item.label}</a-radio-button>)
                })
            } else {
                optionList.forEach(item => {
                    list.push(<a-radio value={item.value}>{item.label}</a-radio>)
                })
            }
            return list
        },
        // 生成多选组件子组件
        buildCheckboxGroupChildren(optionList) {
            const list = []
            optionList.forEach(item => {
                list.push()
            })
        },
        // 生成选择框组件子组件
        buildSelectChildren(optionList) {
            const list = []
            optionList.forEach(item => {
                list.push(<a-select-option value={item.value}>{item.label}</a-select-option>)
            })
            return list
        },
    }
}
