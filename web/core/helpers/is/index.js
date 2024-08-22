"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUnDef = exports.isNullAndUnDef = exports.isNull = exports.isImageDom = exports.isServer = exports.isElement = exports.isWindow = exports.isClient = exports.isArray = exports.isBoolean = exports.isString = exports.isPromise = exports.isAsyncFunction = exports.isNumber = exports.isDate = exports.isObject = exports.isUnDef = exports.isDef = exports.isFunction = exports.is = void 0;
const toString = Object.prototype.toString;
/**
 * @description: 判断值是否未某个类型
 */
function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}
exports.is = is;
/**
 * @description:  是否为函数
 */
function isFunction(val) {
    return is(val, "Function");
}
exports.isFunction = isFunction;
/**
 * @description: 是否已定义
 */
const isDef = (val) => {
    return typeof val !== "undefined";
};
exports.isDef = isDef;
const isUnDef = (val) => {
    return !(0, exports.isDef)(val);
};
exports.isUnDef = isUnDef;
/**
 * @description: 是否为对象
 */
const isObject = (val) => {
    return val !== null && is(val, "Object");
};
exports.isObject = isObject;
/**
 * @description:  是否为时间
 */
function isDate(val) {
    return is(val, "Date");
}
exports.isDate = isDate;
/**
 * @description:  是否为数值
 */
function isNumber(val) {
    return is(val, "Number");
}
exports.isNumber = isNumber;
/**
 * @description:  是否为AsyncFunction
 */
function isAsyncFunction(val) {
    return is(val, "AsyncFunction");
}
exports.isAsyncFunction = isAsyncFunction;
/**
 * @description:  是否为promise
 */
function isPromise(val) {
    return is(val, "Promise") && (0, exports.isObject)(val) && isFunction(val.then) && isFunction(val.catch);
}
exports.isPromise = isPromise;
/**
 * @description:  是否为字符串
 */
function isString(val) {
    return is(val, "String");
}
exports.isString = isString;
/**
 * @description:  是否为boolean类型
 */
function isBoolean(val) {
    return is(val, "Boolean");
}
exports.isBoolean = isBoolean;
/**
 * @description:  是否为数组
 */
function isArray(val) {
    return val && Array.isArray(val);
}
exports.isArray = isArray;
/**
 * @description: 是否客户端
 */
const isClient = () => {
    return typeof window !== "undefined";
};
exports.isClient = isClient;
/**
 * @description: 是否为浏览器
 */
const isWindow = (val) => {
    return typeof window !== "undefined" && is(val, "Window");
};
exports.isWindow = isWindow;
const isElement = (val) => {
    return (0, exports.isObject)(val) && !!val.tagName;
};
exports.isElement = isElement;
exports.isServer = typeof window === "undefined";
// 是否为图片节点
function isImageDom(o) {
    return o && ["IMAGE", "IMG"].includes(o.tagName);
}
exports.isImageDom = isImageDom;
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
function isNullAndUnDef(val) {
    return (0, exports.isUnDef)(val) && isNull(val);
}
exports.isNullAndUnDef = isNullAndUnDef;
function isNullOrUnDef(val) {
    return (0, exports.isUnDef)(val) || isNull(val);
}
exports.isNullOrUnDef = isNullOrUnDef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUUzQzs7R0FFRztBQUNILFNBQWdCLEVBQUUsQ0FBQyxHQUFZLEVBQUUsSUFBWTtJQUM1QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxJQUFJLEdBQUcsQ0FBQztBQUNsRCxDQUFDO0FBRkQsZ0JBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLFVBQVUsQ0FBZSxHQUFZO0lBQ3BELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsZ0NBRUM7QUFFRDs7R0FFRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQWMsR0FBTyxFQUFZLEVBQUU7SUFDdkQsT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxLQUFLLFNBRWhCO0FBRUssTUFBTSxPQUFPLEdBQUcsQ0FBYyxHQUFPLEVBQVksRUFBRTtJQUN6RCxPQUFPLENBQUMsSUFBQSxhQUFLLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxPQUFPLFdBRWxCO0FBQ0Y7O0dBRUc7QUFDSSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVEsRUFBMkIsRUFBRTtJQUM3RCxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFGVyxRQUFBLFFBQVEsWUFFbkI7QUFFRjs7R0FFRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxHQUFZO0lBQ2xDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRkQsd0JBRUM7QUFFRDs7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