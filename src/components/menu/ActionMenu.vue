<!--
 * @Author: Richard Chiang
 * @Date: 2021-02-25 16:31:59
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-26 17:35:37
 * @Email: 19875991227@163.com
 * @Description: 执行表单动作
-->
<template>
    <div class="action-menu">
        <a-row>
            <a-col :span="12">
                <a-button type="primary" @click="exportVuePage">导出 vue 页面</a-button>
            </a-col>
        </a-row>
    </div> 
</template>

<script>
import { tags, templateBuilder, formBuilder } from '@/components/generator/html'

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
        exportVuePage() {
            this.setFormData()
            let data = this.setHtmlCode()
            return data
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
        //
        setHtmlCode() {
            let htmlStr = ''
            this.formData.componentList.forEach(item => {
                htmlStr = htmlStr + `${tags[item.__config__.htmlTag](item)}\n`
            })
            htmlStr = templateBuilder(formBuilder(this.formConfig, htmlStr))
            console.log(htmlStr)
            return htmlStr
        },
    }
}
</script>