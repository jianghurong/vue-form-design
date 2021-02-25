<!--
 * @Author: Richard Chiang
 * @Date: 2021-02-25 16:31:59
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-25 17:15:06
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
const tags = {
    'a-input': e => {
        console.log(e)
    }
}

export default {
    name: 'ActionMenu',
    data() {
        return {
            formData: {},
            tags
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
            this.setHtmlCode()
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
            return
            // const htmlStr = ''
            // this.formData.componentList.forEach(element => {
            //     htmlStr = ``
            // })
            // console.log(this.formData)
        }
    }
}
</script>