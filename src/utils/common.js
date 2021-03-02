/*
 * @Author: Richard Chiang
 * @Date: 2021-03-02 16:03:43
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-03-02 17:59:28
 * @Email: 19875991227@163.com
 * @Description: 通用函数
 */
export function deepClone(obj) {
    if (typeof obj === 'object' && obj !== null) {
        let clone = obj.constructor === Array ? [] : {}
        for (let key in obj) {
            if (obj[key] instanceof Date) {
                clone[key] = new Date(obj[key].getTime())
            } else if (obj[key] instanceof RegExp) {
                clone[key] = new RegExp(obj[key])
            } else {
                if (typeof obj === 'object') {
                    clone[key] = deepClone(obj[key])
                } else {
                    clone[key] = obj[key]
                }
            }
        }
        return clone
    } else {
        return obj
    }
}