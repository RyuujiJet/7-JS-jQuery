window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }
    // 创建 div
    function createElement(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }
    const api = Object.create(jQuery.prototype) // 以jQuery.prototype为原型，创建api对象
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api
}


jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return this.elements[index]
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
        } else if (node.jquery === true) {
            this.each(el => node.get(0).appendChild(el)) // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    // 查 → 查找元素
    addClass(className) {
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        // return api
        return this
    },
    oldApi: selectorOrArray.oldApi,
    // 查 → 在指定元素里查找元素
    find(className) {
        let arr = []
        for(let i = 0; i < this.elements.length; i++) {
            arr = arr.concat(Array.from(this.elements[i].querySelectorAll(className)))
        }
        // end函数
        arr.oldApi = this
        return jQuery(arr)
    },
    // 返回前一个元素
    end() {
        return this.oldApi
    },
    // 遍历
    each(fn) {
        for(let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
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
            array.push(...node.children)
        })
        return jQuery(array)
    },
    print() {
        console.log(this.elements)
    }
}