/*
 * @Author: Richard Chiang
 * @Date: 2021-03-02 14:22:22
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-02 15:45:49
 * @Email: 19875991227@163.com
 * @Description: 格式化 html 代码
 */
import formatConfig from './formatConfig'
import beautify from 'js-beautify'

export function formatHtml(htmlStr) {
    return beautify.html(htmlStr, formatConfig)
}
