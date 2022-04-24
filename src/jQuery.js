window.$ = window.jQuery = function (selectorOrArray) { // window.$ = window.jQuery, $可以代替jQuery使其更简洁
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    // const api = {
    return {
        // 闭包：函数访问外部的变量
        // 查 → 查找元素
        addClass(className) {
            for(let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            // return api
            return this // api.addClass(XXX) 等价于api.addClass.call(api, XXX), this就是api
        },
        oldApi: selectorOrArray.oldApi,
        // 查 → 在指定元素里查找元素
        find(className) {
            let arr = []
            for(let i = 0; i < elements.length; i++) {
                arr = arr.concat(Array.from(elements[i].querySelectorAll(className)))
            }
            // end函数
            arr.oldApi = this // this是api1
            // const newApi = jQuery(arr)
            // return newApi
            return jQuery(arr)
        },
        // 返回前一个元素
        end() {
            return this.oldApi // this是api2
        },
        // 遍历
        each(fn) {
            for(let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        // 获取父元素
        parent() {
            const array = []
            this.each(node => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        // 获取子元素
        children() {
            let array = []
            this.each(node => {
                // array = array.concat(Array.from(node.children))
                array.push(...node.children)
            })
            return jQuery(array)
        },
        print() {
            console.log(elements)
        }
    }
    // 将api换成this的原因：可以直接return这个函数
    // return api
}