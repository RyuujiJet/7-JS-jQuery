// 查 → 查找元素
const api = jQuery(".test")
api.addClass('red').addClass('green').addClass('blue') // 链式操作

// 查 → 在指定元素里查找元素
jQuery('.find').find('.child').addClass('red')

// end的api
const api1 = jQuery('.find')
const api2 = api1.find('.child').addClass('red')
// api2的addClass返回的this，就是find返回的jQuery(arr);
// jQuery(arr)也有返回值，是整个大的return
const oldApi = api2.end().addClass('pink')
// end里的this就是整个大的return

// 遍历
const api3 = jQuery('.child').each((div, index) => console.log('div', index, div))

// 获取父元素
jQuery(".test").parent().print()

// 获取子元素
jQuery(".find").children().print()