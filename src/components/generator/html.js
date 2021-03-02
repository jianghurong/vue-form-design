/*
 * @Author: Richard Chiang
 * @Date: 2021-02-26 09:45:28
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-02 17:35:22
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
    let htmlStr = `<a-form :label-col="{span: ${formConfig.labelCol.span}}" :wrapper-col="{span: ${formConfig.wrapperCol.span}}">\n${el}\n</a-form>`
    return htmlStr
}

// 属性解析函数
function attributesBuilder(el) {
    return {
        tag: el.__config__.htmlTag,
        model: `v-model="${el.__vModel__}"`,
        placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
        disabled: el.disabled ? `disabled=true` : '',
        allowClear: el.allowClear ? `allowClear="${el.allowClear}"` : '',
        addonBefore: el.addonBefore ? `addonBefore=${el.addonBefore}` : '',
        addonAfter: el.addonAfter ? `addonAfter=${el.addonAfter}` : '',
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
        closable: el.closable ? `closable="${el.closable}"` : '',
        message: el.message ? `message="${el.message}"` : '',
        description: el.description ? `description="${el.description}"` : '',
        type: el.type ? `type="${el.type}"` : '',
        checkedChildren: el.checkedChildren ? `checkedChildren="${el.checkedChildren}"` : '',
        unCheckedChildren: el.unCheckedChildren ? `unCheckedChildren="${el.unCheckedChildren}"` : ''
    }
}
// 下拉框子组件解析
function selectChildrenBuilder(el) {
    const children = []
    children.push(`<a-select-option v-for="(item, index) in ${el.__vModel__}.optionList :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></a-select-option>`) 
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
const tags = {
    'a-input': el => {
        const { tag, placeholder, disabled, allowClear } = attributesBuilder(el)
        return `<${tag} ${placeholder} ${disabled} ${allowClear}></${tag}>`
    },
    'a-textarea': el => {
        const { tag, placeholder, disabled, allowClear } = attributesBuilder(el)
        return `<${tag} ${placeholder} ${disabled} ${allowClear}></${tag}>`
    },
    'a-input-password': el => {
        const { tag, placeholder, disabled, allowClear } = attributesBuilder(el)
        return `<${tag} ${placeholder} ${disabled} ${allowClear} ></${tag}>`
    },
    'a-switch': el => {
        const { tag, disabled, checkedChildren, unCheckedChildren } = attributesBuilder(el)
        return `<${tag} ${disabled} ${checkedChildren} ${unCheckedChildren}></${tag}>`
    },
    'a-radio-group': el => {
        const { tag } = attributesBuilder(el)
        return `<${tag}>\n${optionChildrenBuilder(tag, el.__slot__.optionList)}</${tag}>`
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
        const { tag, model, closable, message, description, type } = attributesBuilder(el)
        return `<${tag} ${model} ${closable} ${message} ${description} ${type}></${tag}>`
    }
}

export {
    tags,
    templateBuilder,
    formBuilder
}