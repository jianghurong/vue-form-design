/*
 * @Author: Richard Chiang
 * @Date: 2021-02-23 10:32:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-24 18:06:52
 * @Email: 19875991227@163.com
 * @Description: 表单设计器配置
 */
// 表单设计器组件分为输入型组件、选择型组件
export const inputComponents = [
    {
        // 组件的配置
        __config__: {
            label: '单行文本',
            labelWidth: null,
            htmlTag: 'a-input',
            icon: 'edit'
        },
        // 组件的标签属性
        disabled: false,
        style: { width: '100%' },
        placeholder: '请输入单行文本',
        allowClear: true, // 允许点击清除图标删除内容
        addonBefore: '', // 前置标签
        addonAfter: '', // 后置标签
    },
    {
        __config__: {
            label: '多行文本',
            labelWidth: null,
            htmlTag: 'a-textarea',
            icon: 'snippets'
        },
        disabled: false,
        style: { width: '100%' },
        placeholder: '请输入多行文本',
        allowClear: false, // 允许点击清除图标删除内容
    },
    {
        // 组件的配置
        __config__: {
            label: '密码框',
            labelWidth: null,
            htmlTag: 'a-input-password',
            icon: 'lock'
        },
        // 组件的标签属性
        disabled: false,
        style: { width: '100%' },
        placeholder: '请输入密码',
        allowClear: true, // 允许点击清除图标删除内容
        addonBefore: '', // 前置标签
        addonAfter: '', // 后置标签
    }
]

export const selectComponents = [
    {
        __config__: {
            label: '下拉选择',
            labelWidth: null,
            icon: 'select'
        }
    },
    {
        __config__: {
            label: '单选框',
            labelWidth: null,
            htmlTag: 'a-radio-group',
            icon: 'select'
        },
        __slot__: {
            optionList: [
                { label: '选项一', value: 1 },
            ]
        },
        disabled: false
    },
    {
        __config__: {
            label: '多选框',
            labelWidth: null,
            icon: 'select'
        }
    },
    {
        __config__: {
            label: '开关',
            labelWidth: null,
            htmlTag: 'a-switch',
            icon: 'switcher'
        },
        // 'v-model': false,
        disabled: false,
        checkedChildren: '',
        unCheckedChildren: ''
    },
    {
        __config__: {
            label: '评分',
            labelWidth: null,
            htmlTag: 'a-rate',
            icon: 'star'
        },
        disabled: false,
        allowClear: false,
        count: 5,
        defaultValue: 5,
        allowHalf: false
    }
]

// 表单属性
export const formConfig = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
    labelAlign: 'left'
}
