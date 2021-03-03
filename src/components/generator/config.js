/*
 * @Author: Richard Chiang
 * @Date: 2021-02-23 10:32:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-03 17:29:37
 * @Email: 19875991227@163.com
 * @Description: 表单设计器配置
 */
import moment from 'moment'

// 表单设计器组件分为输入型组件、选择型组件
export const inputComponents = [
    {
        // 组件的配置
        __config__: {
            label: '单行文本',
            showLabel: true,
            htmlTag: 'a-input',
            icon: 'edit',
        },
        __slot__: {
            prefix: '',
            suffix: ''
        },
        // 组件的标签属性
        defaultValue: '', // 默认值
        disabled: false, // 是否禁用
        style: { width: '100%' }, // 行内样式
        placeholder: '请输入单行文本', // 占位提示
        maxLength: null, // 最大长度
        allowClear: true, // 允许点击清除图标删除内容
        addonBefore: '', // 前置标签
        addonAfter: '', // 后置标签
    },
    {
        __config__: {
            label: '多行文本',
            showLabel: true,
            htmlTag: 'a-textarea',
            icon: 'snippets',
            defaultValue: ''
        },
        defaultValue: '', // 默认值
        disabled: false, // 是否禁用
        style: { width: '100%' }, // 行内样式
        placeholder: '请输入多行文本', // 占位提示
        maxLength: null, // 最大长度
        allowClear: true, // 允许点击清除图标删除内容
    },
    {
        // 组件的配置
        __config__: {
            label: '密码框',
            showLabel: true,
            htmlTag: 'a-input-password',
            icon: 'lock'
        },
        // 组件的标签属性
        defaultValue: '', // 默认值
        disabled: false, // 是否禁用
        style: { width: '100%' }, // 行内样式
        placeholder: '请输入密码', // 占位提示
        maxLength: null, // 最大长度
        allowClear: true, // 允许点击清除图标删除内容
        addonBefore: '', // 前置标签
        addonAfter: '', // 后置标签
    }
]

export const selectComponents = [
    {
        __config__: {
            label: '下拉选择',
            showLabel: true,
            htmlTag: 'a-select',
            icon: 'select',
        },
        __slot__: {
            optionList: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
                { label: '选项三', value: '3' },
            ]
        },
        defaultValue: '1', // 默认值
        disabled: false, // 禁用
        showArrow: true, // 是否展示小箭头 
    },
    {
        __config__: {
            label: '单选框',
            showLabel: true,
            htmlTag: 'a-radio-group',
            icon: 'select',
            type: '',
        },
        __slot__: {
            optionList: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
                { label: '选项三', value: '3' },
            ]
        },
        defaultValue: '1',
        disabled: false,
        buttonStyle: 'solid'
    },
    {
        __config__: {
            label: '多选框',
            showLabel: true,
            htmlTag: 'a-checkbox-group',
            icon: 'select'
        },
        __slot__: {
            optionList: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
                { label: '选项三', value: '3' },
            ]
        },
        defaultValue: ['1', '2'],
        disabled: false,
    },
    {
        __config__: {
            label: '开关',
            showLabel: true,
            htmlTag: 'a-switch',
            icon: 'switcher',
        },
        checked: false,
        disabled: false,
        checkedChildren: '',
        unCheckedChildren: ''
    },
    {
        __config__: {
            label: '评分',
            showLabel: true,
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
            showLabel: true,
            htmlTag: 'a-date-picker',
            icon: 'calendar'
        },
        disabled: false,
        placeholder: '',
        allowClear: true,
        inputReadOnly: false,
        showToday: true,
        valueFormat: moment().format('YYYY-MM-DD'),
        defaultValue: '2021-03-03'
    },
    {
        __config__: {
            label: '时间选择器',
            showLabel: true,
            htmlTag: 'a-time-picker',
            icon: 'calendar'
        },
        disabled: false,
        placeholder: '',
        allowClear: true,
        defaultValue: '',
        hourStep: 1, // 小时间隔
        inputReadOnly: false, // 设置输入框为只读，避免在移动设备上打开虚拟键盘
    },
    {
        __config__: {
            label: '滑动输入条',
            showLabel: true,
            htmlTag: 'a-slider',
            icon: 'sliders'
        },
        defaultValue: 60,
        max: 100,
        min: 0,
        vertical: false, // 组件方向 false - 水平 true - 垂直
        reverse: false, // 反向坐标轴
        tooltipVisible: false, // 显示提示
        disabled: false,
    }
]

export const promptComponents = [
    {
        __config__: {
            label: '提示',
            showLabel: true,
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
    __vModel__: 'form',
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
    labelAlign: 'left',
    ref: '',
    // hideRequiredMark: false,
    layout: 'horizontal'
}
