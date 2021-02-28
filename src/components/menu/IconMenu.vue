<!-- TODO ICON 选择 -->
<template>
	<a-drawer width="50%" :visible="visable" @close="onClose">
		<ul class="icon-list">
			<li v-for="(icon, index) in IconList" :key="index" @click="onSelectIcon(icon)">
				<a-icon :type="icon" class="icon" />
				<span class="icon-name">{{ icon }}</span>
			</li>
		</ul>
	</a-drawer>
</template>

<script>
import IconObject from '@/utils/icon.json'

const IconList = []
Object.keys(IconObject).forEach(key => {
	IconList.push(key)
})

export default {
	name: 'IconMenu',
	data() {
		return {
			IconList
		}
	},
	props: {
		visable: {
			type: Boolean
		}
	},
	methods: {
		// 图标选中
		onSelectIcon(icon) {
			this.$emit('select', icon)
		},
		// 关闭图标抽屉
		onClose() {
			this.visable = false
		}
	}
}
</script>

<style lang="scss" scoped>
ul.icon-list {
	overflow: hidden;
	list-style: none;
	li {
		float: left;
		width: 16.6%;
		height: 100px;
		border-radius: 4px;
		text-align: center;
		transition: color .3s, background .3s;
		cursor: pointer;
		.icon {
			font-size: 36px;
			margin: 16px 0;
			transition: transform .3s;
		}
		.icon-name {
			display: block;
		}
		&:hover {
			background: #1890ff;
			color: #fff;
		}
		&:hover .icon {
			transform: scale(1.4);
		}
	}
}
</style>