/**
 * @description 从url中获取参数
 * @param {String} key Storage名称
 * @return string
 */
export const getUrlParam = (name: string, argUrl?: string) => {
	let tmp
	const url = argUrl || window.location.href // 页面url
	if (!url) {
		return ''
	}
	const urlarr = url.split('#')
	if (name.indexOf('#') !== -1) {
		tmp = urlarr.length < 2 ? '' : url[1]
	} else {
		tmp = urlarr[0]
	}
	const m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'))
	if (m) {
		return decodeURIComponent(m[0].split('=')[1])
	}
	return ''
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear()
}

/**
 * @description 获取sessionStorage
 * @param {String} key Storage名称
 * @return string
 */
export const sessionGet = (key: string) => {
	const value = window.sessionStorage.getItem(key)
	try {
		return JSON.parse(window.sessionStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储sessionStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const sessionSet = (key: string, value: any) => {
	window.sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除sessionStorage
 * @param {String} key Storage名称
 * @return void
 */
export const sessionRemove = (key: string) => {
	window.sessionStorage.removeItem(key)
}

/**
 * @description 清除所有sessionStorage
 * @return void
 */
export const sessionClear = () => {
	window.sessionStorage.clear()
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
	let newStr: string = ''
	let newArr: any[] = []
	let arr = path.split('/').map(i => '/' + i)
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i]
		newArr.push(newStr)
	}
	return newArr
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
	if (val === null) return 'null'
	if (typeof val !== 'object') return typeof val
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any
	try {
		newObj = obj.push ? [] : {}
	} catch (error) {
		newObj = {}
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepCopy(obj[attr])
		} else {
			newObj[attr] = obj[attr]
		}
	}
	return newObj
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max)
	return num
}

/**
 * @description 动态获取本地静态资源
 * @return number
 */
export function getAssetsFile(url: string) {
	return new URL(`/src/assets/${url}`, import.meta.url).href
}

/**
 * @description 复制到剪切板
 * @params text: string
 */
export const copyToClipboard = (text: string) => {
	const clipboardObj = navigator.clipboard
	return new Promise((resolve, reject) => {
		if (!clipboardObj) {
			console.warn('浏览器不支持 navigator.clipboard')
			console.log('document.execCommand', document.execCommand)
			reject(false)
		}
		navigator.clipboard.writeText(text).then(
			() => {
				console.log('复制成功')
				resolve(true)
			},
			error => {
				// 托底处理
				copyToClipboardByExecCommand(text)
				if (!document.execCommand) {
					reject(false)
				} else {
					resolve(true)
				}
				// console.log(String(error))
				// reject(false)
			}
		)
	})
}
/**
 * @description 补充测试 复制粘贴
 * @params text: string
 */
const copyToClipboardByExecCommand = (text: string) => {
	// 创建一个textarea元素
	let textarea = document.createElement('textarea')
	// 将要复制到剪切板的文本设置为textarea的内容
	textarea.value = text
	// 将textarea添加到DOM树中
	document.body.appendChild(textarea)
	// 选择textarea
	textarea.select()
	// 复制文本到剪切板
	document.execCommand('copy')
	// 删除textarea元素
	document.body.removeChild(textarea)
}

/**
 * @description 讲UTC+0 时间转化成本地时间
 * @params text: string
 */
export const convertUTCTimeToLocalTime = (UTCDateString: string): string => {
	if (!UTCDateString) {
		return '-'
	}
	UTCDateString = UTCDateString?.replace(/-/g, '/')
	function formatFunc(str: number) {
		//格式化显示
		return str > 9 ? str + '' : '0' + str
	}
	let localOffsetDate = new Date().getTimezoneOffset() * 60000
	let date2 = new Date(new Date(UTCDateString).getTime() - localOffsetDate) //这步是关键
	let year = date2.getFullYear()
	let mon = formatFunc(date2.getMonth() + 1)
	let day = formatFunc(date2.getDate())
	let hour = formatFunc(date2.getHours())
	// let noon = hour >= 12 ? 'PM' : 'AM'
	let min = formatFunc(date2.getMinutes())
	let second = formatFunc(date2.getSeconds())
	let dateStr = year + '/' + mon + '/' + day + ' ' + hour + ':' + min + ':' + second
	return dateStr
}

/**
 * @description 检查是否登录
 */
export const checkLoign = (): boolean => {
	const userInfo = localGet('user')
	if (userInfo && userInfo.userInfo && userInfo.userInfo.uid) {
		return true
	} else {
		return false
	}
}
/**
 * 公共跳转处理
 * type: 1 sup 2: http 3:商品分类 4:单页
 * */

export const commonJump = (info: string, type: string, openType?: string) => {
	// 当前页打开
	let path = ''
	if (type === '1') {
		path = `/product/detail/${info}`
	}
	if (type === '2') {
		path = info
	}
	if (type === '3') {
		path = `/product/list/${info}`
	}
	if (type === '4') {
		path = `/cms/single/${info}`
	}

	if (openType && openType === '1') {
		window.location.href = path
	}
	// 新窗口打开
	if (openType && openType === '2') {
		window.open(path)
	}
}

/**
 * 将 picker 获取到的时间转化为接口需要格式
 */
export const formatTimePicker = (tiemStr: string) => {
	const _time = new Date(tiemStr)
	return _time.getFullYear() + '-' + (_time.getMonth() + 1) + '-' + _time.getDate()
}

/** sleep 延时方法 */
export const sleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/** 跳转到指定页面或返回 */
export const jump = (route: string) => {
	if (route == 'goBack') {
		window.history.back()
	} else {
		window.location.href = route
	}
}

/**
 * 只能输入Number类型
 * obj: 对象或数组
 * key: key或下标
 * str: 输入的内容
 */
export const onlyNum = (obj: any, key: string, str: string) => {
	setTimeout(() => {
		if (obj instanceof Array) {
			obj.splice(parseInt(key), 1, obj[parseInt(key)].replace(/\D/g, ''))
		} else {
			obj[key] = str.replace(/\D/g, '')
		}
	}, 1)
}

/**
 * 只能输入Number类型
 * obj: 对象或数组
 * key: key或下标
 * str: 输入的内容
 */
export const onlyNL = (obj: any, key: string, str: string) => {
	setTimeout(() => {
		if (obj instanceof Array) {
			obj.splice(parseInt(key), 1, obj[parseInt(key)].replace(/[^0-9a-zA-Z]/g, ''))
		} else {
			obj[key] = str.replace(/[^0-9a-zA-Z]/g, '')
		}
	}, 1)
}

/**
 * 校验邮箱格式
 * email: 邮箱
 * 返回：布尔值，是否验证通过
 */
export const verifyEmailFormat = (email: string) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return emailRegex.test(email)
}
