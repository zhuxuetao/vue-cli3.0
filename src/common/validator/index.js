export class Validator {
  constructor (reg) {
    this.reg = reg
    this.result = false
    this.msg = ''
    this.val = ''
  }

  validate (val, msg, cb) {
    if (!this.reg.test(val)) {
      this.result = false
      this.msg = msg
      cb.call(this)
    } else {
      this.result = true
    }
    return this
  }

  // 长度范围校验：arr[0] <= val <= arr[1]
  len (val, arr, msg, cb) {
    val = !val ? 0 : val.length
    if (!(val < arr[0] || val > arr[1])) {
      this.result = true
    } else {
      this.result = false
      this.msg = msg
      cb.call(this)
    }
    return this
  }
}

// 字符校验
export class Word extends Validator {
  constructor () {
    super()
    this.reg = /^[\u4e00-\u9fa5a-zA-Z0-9.·\s\-–]+$/
  }
}
// 数字大小范围校验：arr[0] <= val <= arr[1]
export class Range extends Validator {
  validate (val, arr, msg, cb) {
    val = !val ? 0 : Number(val)
    if (!(val < arr[0] || val > arr[1])) {
      this.result = true
    } else {
      this.result = false
      this.msg = msg
      cb.call(this)
    }
    return this
  }
}

// 关键字校验
export class Keyword extends Validator {
  constructor () {
    super()
    this.reg = /(exec|prompt|insert|select|delete|update|like|master|script|javascript|iframe|truncate|char|declare|xss|cfm|alert|<|`|\\|\(|\)|\s+)/gi
  }

  validate (val, msg, cb) {
    if (this.reg.test(val)) {
      this.msg = msg
      this.result = false
      cb.call(this)
    } else {
      this.result = true
    }
    return this
  }
}

// 手机号码校验
export class Cellphone extends Validator {
  constructor () {
    super()
    this.reg = /^1[3456789][0-9]{9}$/
  }
}

// 邮政编码校验
export class Postalcode extends Validator {
  constructor () {
    super()
    this.reg = /^[0-9]\d{5}$/
  }
}

// 银行卡号校验
export class Bankcard extends Validator {
  constructor () {
    super()
    this.reg = /^(\d{16}|\d{19})$/
  }
}

// 邮箱校验
export class Email extends Validator {
  constructor () {
    super()
    this.reg = /^(([a-zA-Z0-9_-]+)|(([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+))@[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  }
}

// 非空值校验
export class NoEmpty extends Validator {
  validate (val, msg, cb) {
    if (!this.val) {
      this.result = false
      cb.call(this)
    } else {
      this.result = true
    }
    return this
  }
}

// 身份证号校验
export class IDCardNo extends Validator {
  validate (val, msg, cb) {
    this.val = !val ? '' : val

    if (this.val.length === 15) {
      this.result = this.IDCardValidate()
    } else if (this.val.length === 18) {
      this.result = this.IDCardLast() && this.IDCardValidate()
    } else {
      this.result = false
    }

    if (!this.result) {
      this.msg = msg
      cb.call(this)
    }
    return this
  }

  IDCardLast () {
    let sum = 0
    const IDs = this.val.split('')
    const n17 = IDs[17]
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

    if (n17 === 'X' || n17 === 'x' || n17 === '×') {
      IDs[17] = 10
    }

    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * IDs[i]
    }

    const pos = sum % 11

    return IDs[17] === ValideCode[pos]
  }

  IDCardValidate () {
    let m, d
    const y = parseInt(this.val.substring(6, 10))

    if (this.val.length === 15) {
      m = parseInt(this.val.substring(8, 10)) - 1
      d = parseInt(this.val.substring(10, 12))
    } else {
      m = parseInt(this.val.substring(10, 12)) - 1
      d = parseInt(this.val.substring(12, 14))
    }
    const _date = new Date(y, m, d)

    return _date.getFullYear() === y && _date.getMonth() === m && _date.getDate() === d
  }
}

// 护照校验
export class Passport extends Validator {
  constructor () {
    super()
    this.reg = /^\S{8,}$/
  }
}

// 军官证校验
export class Officer extends Validator {
  constructor () {
    super()
    this.reg = /^\S{10,18}$/
  }
}

// 士兵证校验
export class Soldier extends Validator {
  constructor () {
    super()
    this.reg = /^\S{10,18}$/
  }
}

// 户口本
export class Household extends Validator {
  constructor () {
    super()
    this.reg = /^\S{18}$/
  }
}

// 出生证校验
export class Birth extends Validator {
  constructor () {
    super()
    this.reg = /^[a-zA-Z][0-9]{9}$/
  }
}

// 港澳居民来往内地通行证/回乡证
export class HMTravel extends Validator {
  constructor () {
    super()
    this.reg = /^[HM][0-9]{8}$/
  }
}

// 台湾居民来往内地通行证/回乡证(台胞证)
export class TWTravel extends Validator {
  constructor () {
    super()
    this.reg = /^[0-9]{8}$/
  }
}

// 港澳台居民居住证
export class GATResidency extends Validator {
  validate (nation, val, msg, cb) {
    switch (nation) {
      case 'GAT': // 港澳
        this.reg = /^(810000|820000)[A-Z0-9]{12}$/
        break
      case 'TWN': // 台湾
        this.reg = /^(830000)[A-Z0-9]{12}$/
        break
    }

    if (!this.reg.test(val)) {
      this.result = false
      this.msg = msg
      cb.call(this)
    } else {
      this.result = true
    }

    return this
  }
}

// 外国人永久居留身份证
export class Foreigners extends Validator {
  constructor () {
    super()
    this.reg = /^[a-zA-Z]{3}\S{12}$/
  }
}
