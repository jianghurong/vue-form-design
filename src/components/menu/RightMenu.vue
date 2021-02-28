<!--
 * @Author: Richard Chiang
 * @Date: 2021-02-24 14:14:24
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-26 17:14:45
 * @Email: 19875991227@163.com
 * @Description: 右侧面板（组件属性与表单属性）
-->
<template>
    <div class="right-menu">
        <a-tabs v-model="currentTab">
            <a-tab-pane key="component-properties">
                <span slot="tab">
                    <a-icon type="control"></a-icon>组件属性
                </span>
            </a-tab-pane>
            <a-tab-pane key="form-properties">
                <span slot="tab">
                    <a-icon type="container"></a-icon>表单属性
                </span>
            </a-tab-pane>
        </a-tabs>
        <div v-show="currentTab === 'component-properties'">
            <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <!-- input 模块 -->
				<a-form-item v-if="activeComponent.__vModel__" label="字段名">
                    <a-input
                        v-model="activeComponent.__vModel__"
                        placeholder="请输入字段名"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.__config__ && activeComponent.__config__.label !== undefined"
                    label="标签名称"
                >
                    <a-input
                        v-model="activeComponent.__config__.label"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.placeholder !== undefined"
                    label="提示内容"
                >
                    <a-input
                        v-model="activeComponent.placeholder"
                        placeholder="请输入提示内容"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="
                        activeComponent.style &&
                        activeComponent.style.width !== undefined
                    "
                    label="组件宽度"
                >
                    <a-input
                        v-model="activeComponent.style.width"
                        placeholder="请输入组件宽度"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.defaultValue !== undefined"
                    label="默认值"
                >
                    <a-input
                        v-model="activeComponent.defaultValue"
                    ></a-input>
                </a-form-item>
				<a-form-item
					v-if="activeComponent.message !== undefined"
					label="提示内容"
				>
					<a-input v-model="activeComponent.message"></a-input>
				</a-form-item>
                <a-form-item
					v-if="activeComponent.maxLength !== undefined"
					label="最大长度"
				>
					<a-input-number v-model="activeComponent.maxLength"></a-input-number>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.description !== undefined"
					label="辅助内容"
				>
					<a-input v-model="activeComponent.description"></a-input>
				</a-form-item>
				<!-- radio 模块 -->
				<a-form-item
					v-if="activeComponent.__config__ && activeComponent.__config__.type !== undefined"
					label="按钮样式"
				>
					<a-radio-group v-model="activeComponent.__config__.type" button-style="solid">
						<a-radio-button value="">默认</a-radio-button>
						<a-radio-button value="button">按钮</a-radio-button>
					</a-radio-group>
				</a-form-item>
				<a-form-item
					v-if="activeComponent.__config__ && activeComponent.__config__.type === 'button'"
					label="描边填色"
				>
					<a-radio-group v-model="activeComponent.buttonStyle" button-style="solid">
						<a-radio-button value="outline">描边</a-radio-button>
						<a-radio-button value="solid">填色</a-radio-button>
					</a-radio-group>
				</a-form-item>
                <a-form-item
                    v-if="activeComponent.vertical !== undefined"
                    label="方向"
                >
                    <a-radio-group v-model="activeComponent.vertical" button-style="solid">
                        <a-radio-button :value="false">水平</a-radio-button>
                        <a-radio-button :value="true">垂直</a-radio-button>
                    </a-radio-group>
                </a-form-item>
				<!-- 选项模块 -->
				<template v-if="activeComponent.__slot__ && activeComponent.__slot__.optionList !== undefined">
					<a-row :gutter="[0, 24]">
						<a-col :offset="2" :span="8">标签名</a-col>
						<a-col :offset="4" :span="8">标签值</a-col>
					</a-row>
					<a-row
						v-for="(option, index) in activeComponent.__slot__.optionList"
						:key="index"
						:gutter="[0, 24]"
					>
						<a-col :offset="2" :span="8">
							<a-input v-model="option.label" placeholder="请输入标签名"></a-input>
						</a-col>
						<a-col :offset="4" :span="8">
							<a-input v-model="option.value" placeholder="请输入标签值"></a-input>
						</a-col>
					</a-row>
					<a-row>
						<a-col :offset="2">
							<a-button type="primary" @click="addComponentOption">添加选项</a-button>
						</a-col>
					</a-row>
				</template>
                <!-- TODO 标记刻度 -->
				<!-- select 模块 -->
				<a-form-item
					v-if="activeComponent.type !== undefined"
					label="提示类型"
				>
					<a-select v-model="activeComponent.type">
						<a-select-option value="success">
							成功
						</a-select-option>
						<a-select-option value="info">
							信息
						</a-select-option>
						<a-select-option value="warning">
							警告
						</a-select-option>
						<a-select-option value="error">
							错误
						</a-select-option>
					</a-select>
				</a-form-item>

                <a-form-item
                    v-if="activeComponent.checkedChildren !== undefined"
                    label="开启提示"
                >
                    <a-input
                        v-model="activeComponent.checkedChildren"
                        placeholder="请输入开启提示"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.unCheckedChildren !== undefined"
                    label="关闭提示"
                >
                    <a-input
                        v-model="activeComponent.unCheckedChildren"
                        placeholder="请输入关闭提示"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.addonBefore !== undefined"
                    label="前置标签"
                >
                    <a-input
                        v-model="activeComponent.addonBefore"
                        placeholder="请输入标签内容"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.addonAfter !== undefined"
                    label="后置标签"
                >
                    <a-input
                        v-model="activeComponent.addonAfter"
                        placeholder="请输入标签内容"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.__slot__ && activeComponent.__slot__.prefix !== undefined"
                    label="前缀图标"
                >
                    <a-input-search
                        v-model="activeComponent.__slot__.prefix"
                        placeholder="请输入前缀图标"
                        @search="activeIconMenu('prefix')"
                    >
                        <a-button type="primary" slot="enterButton">
                            <a-icon type="search"></a-icon>
                        </a-button>
                    </a-input-search>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.__slot__ && activeComponent.__slot__.suffix !== undefined"
                    label="后缀图标"
                >
                    <a-input-search
                        v-model="activeComponent.__slot__.suffix"
                        placeholder="请输入后缀图标"
                        @search="activeIconMenu('suffix')"
                    >
                        <a-button type="primary" slot="enterButton">
                            <a-icon type="search"></a-icon>
                        </a-button>
                    </a-input-search>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.count !== undefined"
                    label="最大值"
                >
                    <a-input-number
                        v-model="activeComponent.count"
                    ></a-input-number>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.max !== undefined"
                    label="最大值"
                >
                    <a-input-number
                        v-model="activeComponent.max"
                    ></a-input-number>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.min !== undefined"
                    label="最小值"
                >
                    <a-input-number
                        v-model="activeComponent.min"
                    ></a-input-number>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.hourStep !== undefined"
                    label="小时选项间隔"
                >   
                    <a-input-number
                        v-model="activeComponent.hourStep"
                    ></a-input-number>
                </a-form-item>


                <!-- switch 模块 -->
                <a-form-item
                    v-if="activeComponent.__config__ && activeComponent.__config__.showLabel !== undefined"
                    label="标签显示"
                >
                    <a-switch
                        v-model="activeComponent.__config__.showLabel"
                        placeholder="请输入开启提示"
                    ></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.allowClear !== undefined"
                    label="允许清空"
                >
                    <a-switch v-model="activeComponent.allowClear"></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.showToday !== undefined"
                    label="显示今天"
                >
                    <a-switch v-model="activeComponent.showToday"></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.closable !== undefined"
                    label="允许关闭"
                >
                    <a-switch v-model="activeComponent.closable"></a-switch>
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
                    v-if="activeComponent.showArrow !== undefined"
                    label="箭头显示"
                >
                    <a-switch v-model="activeComponent.showArrow"></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.tooltipVisible !== undefined"
                    label="刻度显示"
                >
                    <a-switch v-model="activeComponent.tooltipVisible"></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.reverse !== undefined"
                    label="反向坐标轴"
                >
                    <a-switch v-model="activeComponent.reverse"></a-switch>
                </a-form-item>
                <a-form-item
                    v-if="activeComponent.inputReadOnly !== undefined"
                    label="禁用输入框"
                >
                    <a-switch v-model="activeComponent.inputReadOnly"></a-switch>
                </a-form-item>
            </a-form>
        </div>
        <div v-show="currentTab === 'form-properties'">
            <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <a-form-item
                    v-if="formConfig.labelCol !== undefined"
                    label="标签栅格"
                >
                    <a-input
                        v-model="formConfig.labelCol.span"
                        placeholder="请输入组件宽度"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="formConfig.wrapperCol !== undefined"
                    label="组件栅格"
                >
                    <a-input
                        v-model="formConfig.wrapperCol.span"
                        placeholder="请输入组件宽度"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    v-if="formConfig.labelAlign !== undefined"
                    label="标签对齐"
                >
                    <a-radio-group
                        v-model="formConfig.labelAlign"
                        button-style="solid"
                    >
                        <a-radio-button value="left">左对齐</a-radio-button>
                        <a-radio-button value="right">右对齐</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </div>
        <icon-menu :visable="iconVisiable" @select="iconSelect" />
    </div>
</template>

<script>
import IconMenu from './IconMenu'

export default {
    name: 'RightMenu',
    components: {
        IconMenu
    },
    props: {
        activeComponent: {
            required: true,
            type: Object,
        },
        formConfig: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            currentTab: "component-properties",
            currentIconType: '',
            iconVisiable: false,
        };
    },
    methods: {
        // 添加组件
		addComponentOption() {
			this.activeComponent.__slot__.optionList.push({
				label: '',
				value: ''
			})
        },
        // 激活图标菜单
        activeIconMenu(type) {
            this.iconVisiable = true
            this.currentIconType = type
        },
        iconSelect(icon) {
            this.iconVisiable = false
            this.activeComponent.__slot__[this.currentIconType] = icon
        }
    },
};
</script>

<style lang="scss" scoped>
.right-menu {
	::v-deep {
		.ant-tabs-nav {
			width: 100%;
		}
		.ant-tabs-nav .ant-tabs-tab {
			width: 50%;
			margin: 0;
			text-align: center;
			box-sizing: border-box;
		}
	}
}
</style>