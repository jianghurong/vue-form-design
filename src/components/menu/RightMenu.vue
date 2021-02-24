<!--
 * @Author: Richard Chiang
 * @Date: 2021-02-24 14:14:24
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-24 18:07:52
 * @Email: 19875991227@163.com
 * @Description: 右侧面板（组件属性与表单属性）
-->
<template>
    <div>
        <a-tabs v-model="currentTab">
            <a-tab-pane key="component-properties">
                <span slot="tab">
                    <a-icon type="control"></a-icon>
                    组件属性
                </span>
            </a-tab-pane>
            <a-tab-pane key="form-properties">
                <span slot="tab">
                    <a-icon type="container"></a-icon>
                    表单属性
                </span>
            </a-tab-pane>
        </a-tabs>
        <div v-show="currentTab === 'component-properties'">
            <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <a-form-item
                    v-if="activeComponent.style && activeComponent.style.width !== undefined"
                    label="组件宽度"
                >
                    <a-input v-model="activeComponent.style.width" placeholder="请输入组件宽度"></a-input>
                </a-form-item>
				<!-- <a-form-item
					v-if="activeComponent['v-model'] !== undefined"
					label="默认选中"
				>
					{{activeComponent['v-model']}}
					<a-radio-group v-model="activeComponent['v-model']" button-style="solid">
						<a-radio-button :value="false">
							否
						</a-radio-button>
						<a-radio-button :value="true">
							是
						</a-radio-button>
					</a-radio-group>
				</a-form-item> -->
				<a-form-item
					v-if="activeComponent.checkedChildren !== undefined"
					label="开启提示"
				>
					<a-input v-model="activeComponent.checkedChildren" placeholder="请输入开启提示"></a-input>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.unCheckedChildren !== undefined"
					label="关闭提示"
				>
					<a-input v-model="activeComponent.unCheckedChildren" placeholder="请输入关闭提示"></a-input>
				</a-form-item>
				<!-- <a-form-item
					v-if="activeComponent.defaultValue !== undefined"
					label="默认值"
				>
					<a-input-number v-model="activeComponent.defaultValue"></a-input-number>
				</a-form-item> -->
				<a-form-item
					v-if="activeComponent.count !== undefined"
					label="最大值"
				>
					<a-input-number v-model="activeComponent.count"></a-input-number>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.allowClear !== undefined"
					label="允许清空"
				>
					<a-switch v-model="activeComponent.allowClear"></a-switch>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.allowHalf !== undefined"
					label="允许半选"
				>
					<a-switch v-model="activeComponent.allowHalf"></a-switch>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.disabled !== undefined"
					label="是否禁用"
				>
					<a-switch v-model="activeComponent.disabled"></a-switch>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.addonBefore !== undefined"
					label="前置标签"
				>
					<a-input v-model="activeComponent.addonBefore" placeholder="请输入标签内容"></a-input>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.addonAfter !== undefined"
					label="后置标签"
				>
					<a-input v-model="activeComponent.addonAfter" placeholder="请输入标签内容"></a-input>
				</a-form-item>
            </a-form>
        </div>
		<div v-show="currentTab === 'form-properties'">
			<a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
				<a-form-item
                    v-if="formConfig.labelCol !== undefined"
                    label="标签栅格"
                >
                    <a-input v-model="formConfig.labelCol.span" placeholder="请输入组件宽度"></a-input>
                </a-form-item>
				<a-form-item
                    v-if="formConfig.wrapperCol !== undefined"
                    label="组件栅格"
                >
                    <a-input v-model="formConfig.wrapperCol.span" placeholder="请输入组件宽度"></a-input>
                </a-form-item>
				<a-form-item
					v-if="formConfig.labelAlign !== undefined"
					label="标签对齐"
				>
					<a-radio-group v-model="formConfig.labelAlign" button-style="solid">
						<a-radio-button value="left">
							左对齐
						</a-radio-button>
						<a-radio-button value="right">
							右对齐
						</a-radio-button>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</div>
    </div>
</template>

<script>
export default {
	name: 'RightMenu',
	props: {
		activeComponent: {
			required: true,
			type: Object
		},
		formConfig: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
            currentTab: 'component-properties'
		}
	}
};
</script>

<style lang="scss" scoped>
</style>