/*
 * @Author: Richard Chiang
 * @Date: 2021-02-23 10:32:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-25 15:48:56
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
        value: '',
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
    // {
    //     __config__: {
    //         label: '下拉选择',
    //         labelWidth: null,
    //         htmlTag: 'a-select',
    //         icon: 'select',
    //     },
    //     __slot__: {
    //         optionList: [
    //             { label: '选项一', value: '1' },
    //             { label: '选项二', value: '2' },
    //         ]
    //     },
    //     defaultValue: '1',
    // },
    {
        __config__: {
            label: '单选框',
            labelWidth: null,
            htmlTag: 'a-radio-group',
            icon: 'select',
            type: '',
        },
        __slot__: {
            optionList: [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
            ]
        },
        defaultValue: 1,
        disabled: false,
        buttonStyle: 'solid'
    },
    {
        __config__: {
            label: '多选框',
            labelWidth: null,
            htmlTag: 'a-checkbox-group',
            icon: 'select'
        },
        options: ['选项一', '选项二', '选项三', '选项四']
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
    },
    {
        __config__: {
            label: '日期选择器',
            labelWidth: null,
            htmlTag: 'a-date-picker',
            icon: 'date'
        },
        disabled: false,
    }
]

export const promptComponents = [
    {
        __config__: {
            label: '提示',
            labelWidth: null,
            htmlTag: 'a-alert',
            icon: 'alert'
        },
        closable: false,
        message: '提示信息',
        description: '',
        type: 'info'
    }
]

// 表单属性
export const formConfig = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
    labelAlign: 'left'
}
