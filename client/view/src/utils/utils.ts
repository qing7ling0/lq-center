'use strict'

class Utils {
  /**
   * 是否是对象
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  /**
   * 是否是数组
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static  isArray(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  /**
   * 是否是 null 对象
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isNULL(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Null]";
  }

  /**
   * 是否是函数
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isFunction(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Function]";
  }

  /**
   * 是否是布尔变量
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isBoolean(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Boolean]";
  }

  /**
   * 是否是数字
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isNumber(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Number]";
  }

  /**
   * 是否是字符串对象
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  /**
   * 判断对象是否是undefined 
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static isUndefined(obj: any): boolean {
    return Object.prototype.toString.call(obj) === "[object Undefined]";
  }
  
  static objectisEmpty(obj: any): boolean {
    if (!obj) return true;
    for(let key in obj) {
      return false;
    }
  
    return true;
  }

  /**
   * 删除数组元素
   * 
   * @static
   * @param {any} arr 原数组
   * @param {any} element 要删除的元素 
   * @returns 返回要删除元素的索引，删除失败返回-1
   * @memberof Utils
   */
  static arrayDeleteElement<T>(arr: T[], element: any): number {
    let isFuc = this.isFunction(element);
    for (let i = 0; i < arr.length; i++) {
      if (isFuc) {
        if (element(arr[i])) {
          arr.splice(i, 1);
          return i;
        }
      } else {
        if (arr[i] === element) {
          arr.splice(i, 1);
          return i;
        }
      }
    }

    return -1;
  }

  /**
   * 删除一个数组元素
   * 
   * @static
   * @param {any} arr 原数组
   * @param {any} elements 要删除的数组 
   * @returns 返回删除元素的索引数组
   * @memberof Utils
   */
  static arrayDeleteElements<T>(arr: T[], elements: T[]): number[] {
    let indArr = arr.map((item: T, ind: number) => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i] === item) {
          return ind;
        }
      }
      return -1;
    }).filter(i => i > -1).reverse();
    indArr.forEach(function (ind: number) {
      arr.splice(ind, 1);
    }, this);

    return indArr;
  }

  /**
   * 字符串转换成数字
   * 转换失败如果有默认值则返回默认值，没有返回0
   * 
   * @static
   * @param {string} str 
   * @param {number} defaultValue 
   * @returns 
   * @memberof Utils
   */
  static stringToInt(str: string, defaultValue: number) {
    let v = parseInt(str);
    if (v !== null && v !== undefined && !isNaN(v)) return v;
    else {
      if (defaultValue) return defaultValue;
      return 0;
    }
  }
}

export default Utils