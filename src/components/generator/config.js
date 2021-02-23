/*
 * @Author: Richard Chiang
 * @Date: 2021-02-23 10:32:53
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-02-23 11:42:47
 * @Email: 19875991227@163.com
 * @Description: 表单设计器配置
 */
// 表单设计器组件分为输入型组件、选择型组件
export const inputComponents = [
    {
        __config__: {
            label: '单行文本',
            labelWidth: null,
            htmlTag: 'a-input',
            icon: 'edit'
        }
    },
    {
        __config__: {
            label: '多行文本',
            labelWidth: null,
            icon: 'snippets'
        }
    }
]

export const selectComponents = [
    {
        __config__: {
            label: '下拉选择',
            labelWidth: null,
            icon: 'select'
        }
    },
    {
        __config__: {
            label: '单选框',
            labelWidth: null,
            icon: 'select'
        }
    },
    {
        __config__: {
            label: '多选框',
            labelWidth: null,
            icon: 'select'
        }
    },
    {
        __config__: {
            label: '开关',
            labelWidth: null,
            icon: 'switcher'
        }
    },
]
