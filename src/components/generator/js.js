/*
 * @Author: Richard Chiang
 * @Date: 2021-03-02 15:56:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-05 15:18:57
 * @Email: 19875991227@163.com
 * @Description: vue 动态表单 js 代码生成
 */
import { deepClone } from '@/utils/common'
import moment from 'moment'

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
        let defaultValue = ''
        // 处理不同组件的 defaultValue
        if (component.self.htmlTag === 'a-date-picker') {
            defaultValue = component.defaultValue !=='' ? `moment('${moment(component.defaultValue).format('YYYY-MM-DD')}', 'YYYY-MM-DD')` : null
        } else if (component.self.htmlTag === 'a-time-picker') {
            defaultValue = component.defaultValue !=='' ? `moment('${moment(component.defaultValue).format('hh:mm:ss')}', 'hh:mm:ss')` : null
        } else if (component.self.htmlTag === 'a-switch') {
            defaultValue = JSON.stringify(component.checked)
        } else if (component.self.htmlTag === 'a-alert') {
            defaultValue = JSON.stringify(component.message)
        } else {
            defaultValue =  JSON.stringify(component.defaultValue)
        } 
        data.push(`${component.__vModel__}: ${defaultValue}`)
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
    const momentShouldImport = config.componentList.some(component => {
       return (component.self.htmlTag === 'a-date-picker' || component.self.htmlTag === 'a-time-picer') && component.defaultValue !== ''
    })
    const importList = momentShouldImport ? "import moment from 'moment'" : ''
    return `
        ${importList}
        export default {
           data() {
               return {
                    ${config.__vModel__}: { 
                        ${data}
                    },
                    ${optionList}
               }
           }
        }
    `
}

export {
    scriptBuilder,
    jsBuilder
}