/*
 * @Author: Richard Chiang
 * @Date: 2021-03-02 15:56:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-02 17:40:23
 * @Email: 19875991227@163.com
 * @Description: vue 动态表单 js 代码生成
 */
import { deepClone } from '@/utils/common'

// 脚本生成函数
function scriptBuilder(el) {
    return `<script>\n${el}\n</script>`
}


// js 生成函数
function jsBuilder(config) {
    const configClone = deepClone(config)
    const data = dataBuilder(configClone).join(',\n')
    const optionList = optionBuilder(configClone)
    return assembleBuilder(configClone, data, optionList)
}

// data 生成函数
function dataBuilder(config) {
    let data = []
    config.componentList.forEach(component => {
        data.push(`${component.__vModel__}: ${component.defaultValue}`)
    })
    return data
}

// 有子选项的组件选项参数
function optionBuilder(config) {
    let data = []
    config.componentList.forEach(component => {
        if (component.slot && component.slot.optionList) {
            let list = []
            component.slot.optionList.forEach(option => {
                list.push(option)
            })
            data.push(`${component.__vModel__}OptionList: ${JSON.stringify(list)}`)
        }
    })
    return data
}

// script 生成
function assembleBuilder(config, data, optionList) {
    return `
        export default {
           data() {
               return {
                    ${config.__vModel__}: { 
                        ${data}
                    },
                    ${optionList}
               }
           },
           created() {

           },
           methods: {
               
           }
        }
    `
}

export {
    scriptBuilder,
    jsBuilder
}