export default {
  takeStyle (obj) {
    let tpl = ''
    for (let key in obj) {
      tpl += `${key}:${obj[key]};`
    }
    return tpl
  },
  slotNameAddClass (obj, cb) {
    for (let key in obj) {
      for (let i = 0; i < obj[key].length; i++) {
        obj[key][i].elm.className += ` ${key}`
      }
    }
    cb()
  }
}