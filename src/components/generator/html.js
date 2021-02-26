/*
 * @Author: Richard Chiang
 * @Date: 2021-02-26 09:45:28
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-26 17:39:47
 * @Email: 19875991227@163.com
 * @Description: vue 表单生成代码
 */

import { formConfig } from "./config"

// 模板生成函数
function templateBuilder(el) {
    return `<template>
       ${el}
    </teamplate>`
}
// 表单生成函数
function formBuilder(config, el) {
    let htmlStr = `<a-form :label-col="{span: ${formConfig.labelCol.span}}" :wrapper-col="{span: ${formConfig.wrapperCol.span}}">
        ${el}
    </a-form>`
    return htmlStr
}
// 属性解析函数
function attributesBuilder(el) {
    return {
        tag: el.__config__.htmlTag,
        placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
        disabled: el.disabled ? `disabled=true` : '',
        allowClear: el.allowClear ? `allowClear="${el.allowClear}"` : '',
        addonBefore: el.addonBefore ? `addonBefore=${el.addonBefore}` : '',
        addonAfter: el.addonAfter ? `addonAfter=${el.addonAfter}` : '',
        count: el.count ? `count="${el.count}"` : '',
        defaultValue: el.defaultValue ? `defaultValue="${el.defaultValue}"` : '',
        allowHalf: el.allowHalf ? `allowHalf="${el.allowHalf}"` : ''
    }
}
// 子组件解析函数
function childrenBuilder(tag, list) {
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
    'a-radio-group': el => {
        const { tag } = attributesBuilder(el)
        return `<${tag}>\n${childrenBuilder(tag, el.__slot__.optionList)}</${tag}>`
    },
    'a-rate': el => {
        const { tag, count, defaultValue, allowHalf } = attributesBuilder(el)
        return `<${tag} ${count} ${defaultValue} ${allowHalf}></${tag}>`
    }
}

export {
    tags,
    templateBuilder,
    formBuilder
}