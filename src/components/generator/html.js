/*
 * @Author: Richard Chiang
 * @Date: 2021-02-26 09:45:28
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-04 18:15:35
 * @Email: 19875991227@163.com
 * @Description: vue 动态表单 html 代码生成
 */

import { formConfig } from "./config"

// 模板生成函数
function templateBuilder(el) {
    return `<template>\n${el}\n</teamplate>`
}

// 表单生成函数
function formBuilder(config, el) {
    const str = `<a-form :label-col="{span: ${formConfig.labelCol.span}}" :wrapper-col="{span: ${formConfig.wrapperCol.span}}">\n${el}\n</a-form>`
    return str
}

// 表单项生成函数
function formItemBuilder(component, el) {
    const label = labelBuilder(component)
    const style = inlineStyleBuilder(component.style)
    const str = `<a-form-item ${label} ${style}>${el}</a-form-item>`
    return str
}

// 行内样式生成函数
function inlineStyleBuilder(style) {
    const { width } = style
    return width && width !== '100%' ? `style="width: ${width}"` : ''
}

// 表单项标签生成函数
function labelBuilder(component) {
    const { showLabel } = component.self
    return showLabel ? `label="${component.self.label}"` : ''
}

// 属性解析函数
function attributesBuilder(el) {
    return {
        tag: el.self.htmlTag,
        model: `v-model="${el.__vModel__}"`,
        placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
        disabled: el.disabled ? `disabled` : '',
        allowClear: el.allowClear ? `allow-clear` : '',
        addonBefore: el.addonBefore ? `addonBefore="${el.addonBefore}"` : '',
        addonAfter: el.addonAfter ? `addonAfter="${el.addonAfter}"` : '',
        count: el.count ? `count="${el.count}"` : '',
        defaultValue: el.defaultValue ? `defaultValue="${el.defaultValue}"` : '',
        allowHalf: el.allowHalf ? `allowHalf="${el.allowHalf}"` : '',
        inputReadOnly: el.inputReadOnly ? `inputReadOnlay="${el.inputReadOnly}"` : '',
        showToday: el.showToday ? `showToday="${el.showToday}"` : '',
        hourStep: el.hourStep !== undefined ? `hourStep="${el.hourStep}"` : '',
        max: el.max !== undefined ? `max="${el.max}"` : '',
        min: el.min !== undefined ? `min="${el.min}"` : '',
        vertical: el.vertical ? `vertical="${el.vertical}"` : '',
        reverse: el.reverse ? `reverse="${el.reverse}"` : '',
        tooltipVisible: el.tooltipVisible ? `tooltipVisible="${el.tooltipVisible}"` : '',
        message: el.message ? `message="${el.message}"` : '',
        description: el.description ? `description="${el.description}"` : '',
        type: el.type ? `type="${el.type}"` : '',
        checkedChildren: el.checkedChildren ? `checkedChildren="${el.checkedChildren}"` : '',
        unCheckedChildren: el.unCheckedChildren ? `unCheckedChildren="${el.unCheckedChildren}"` : '',
        maxLength: el.maxLength  ? `:maxLength="${el.maxLength}"` : ''
    }
}
// 下拉框子组件解析
function selectChildrenBuilder(el) {
    const children = []
    children.push(`<a-select-option v-for="(item, index) in ${el.__vModel__}OptionList" :key="index" :value="item.value" :disabled="item.disabled">{{ item.label }}</a-select-option>`) 
    return children
}
// 选项子组件解析
function optionChildrenBuilder(tag, list) {
    let htmlList = []
    for (let i = 0; i < list.length; i++) {
        htmlList.push(`<${tag} label="${list[i].label}" value="${list[i].value}"></${tag}>\n`)
    }
    return htmlList
}
// 输入框子组件解析
function inputChildrenBuilder(el) {
    const children = []
    Object.keys(el.slot).forEach(key => {
        if (el.slot[key] !== '') {
            children.push(`<a-icon slot="${key}" type="${el.slot[key]}"></a-icon>`)
        }
    })
    return children.join('\n')
}

const tags = {
    'a-input': el => {
        const { tag, model, defaultValue, placeholder, maxLength, addonBefore, addonAfter, allowClear, disabled } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${placeholder} ${maxLength} ${addonBefore} ${addonAfter} ${allowClear} ${disabled} >${inputChildrenBuilder(el)}</${tag}>`
    },
    'a-textarea': el => {
        const { tag, model, defaultValue, maxLength, placeholder, disabled, allowClear } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${placeholder} ${maxLength} ${disabled} ${allowClear}></${tag}>`
    },
    'a-input-password': el => {
        const { tag, model, defaultValue, placeholder, maxLength, addonBefore, addonAfter, disabled, allowClear } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${placeholder} ${maxLength} ${addonBefore} ${addonAfter} ${disabled} ${allowClear} ></${tag}>`
    },
    'a-switch': el => {
        const { tag, disabled, checkedChildren, unCheckedChildren } = attributesBuilder(el)
        return `<${tag} ${disabled} ${checkedChildren} ${unCheckedChildren}></${tag}>`
    },
    'a-radio-group': el => {
        const { tag } = attributesBuilder(el)
        return `<${tag}>\n${optionChildrenBuilder(tag, el.slot.optionList)}</${tag}>`
    },
    'a-select': el => {
        const { tag } = attributesBuilder(el)
        return `<${tag}>\n${selectChildrenBuilder(el)}\n</${tag}>`
    },
    'a-rate': el => {
        const { tag, count, defaultValue, allowHalf } = attributesBuilder(el)
        return `<${tag} ${count} ${defaultValue} ${allowHalf}></${tag}>`
    },
    'a-date-picker': el => {
        const { tag, model, defaultValue, placeholder, allowClear, inputReadOnly, showToday, disabled } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${placeholder} ${allowClear} ${inputReadOnly} ${showToday} ${disabled}></${tag}>`
    },
    'a-time-picker': el => {
        const { tag, model, defaultValue, placeholder, hourStep, inputReadOnly, disabled } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${placeholder} ${hourStep} ${inputReadOnly} ${disabled}></${tag}>`
    },
    'a-slider': el => {
        const { tag, model, defaultValue, max, min, vertical, reverse, tooltipVisible } = attributesBuilder(el)
        return `<${tag} ${model} ${defaultValue} ${max} ${min} ${vertical} ${reverse} ${tooltipVisible}></${tag}>`
    },
    'a-alert': el => {
        const { tag, model, message, description, type } = attributesBuilder(el)
        return `<${tag} ${model} ${type} ${message} ${description} ></${tag}>`
    }
}

export {
    tags,
    templateBuilder,
    formBuilder,
    formItemBuilder
}