<!--
 * @Author: Richard Chiang
 * @Date: 2021-02-25 16:31:59
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-04 16:52:30
 * @Email: 19875991227@163.com
 * @Description: 执行表单动作
-->
<template>
    <div class="action-menu">
        <a-button type="primary" icon="download" @click="exportVuePage">导出 vue 页面</a-button>
    </div> 
</template>

<script>
import { tags, templateBuilder, formBuilder, formItemBuilder } from '@/components/generator/html'
import { scriptBuilder, jsBuilder } from '@/components/generator/js'
import { formatHtml } from '@/utils/format'

export default {
    name: 'ActionMenu',
    data() {
        return {
            formData: {},
            tags,
            templateBuilder
        }
    },
    props: {
        drawingList: {
            type: Array
        },
        formConfig: {
            type: Object
        }
    },
    methods: {
        // 导出 vue 界面
        exportVuePage() {
            this.setFormData()
            const html = this.setHtmlCode()
            const script = this.setScriptCode()
            console.log(formatHtml(html + script))
            return html + script
            // let urlObject = window.URL || window.webkitURL || window
            // let exportBlob = new Blob([data])
            // let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            // link.href = urlObject.createObjectURL(exportBlob)
            // link.download = new Date().getTime() + '.vue'
            // link.click()
        },
        // 组装表单数据
        setFormData() {
            this.formData = {
                componentList: this.drawingList,
                ...this.formConfig
            }
        },
        // 生成 html 代码
        setHtmlCode() {
            let str = ''
            this.formData.componentList.forEach(item => {
                str = str + formItemBuilder(item, `${tags[item.self.htmlTag](item)}\n`)
            })
            str = formatHtml(templateBuilder(formBuilder(this.formConfig, str)))
            return str
        },
        // 生成 script 代码
        setScriptCode() {
            let str = ''
            str = formatHtml(scriptBuilder(jsBuilder(this.formData, str)))
            return str
        }
    }
}
</script>

<style lang="scss" scoped>
.action-menu {
    border-top: 1px solid #e8e8e8;
    padding: 12px 0;
}
</style>