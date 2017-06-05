import MsgBoxComponent from './msg-box'

let MsgBox = {}
MsgBox.install = function (Vue, options) {
  let MsgBoxConstructor = Vue.extend(MsgBoxComponent)
  let tpl = new MsgBoxConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(tpl.$el)
  Vue.prototype.$MsgBox = (options) => {
    if (options && Object.keys(options).length) {
      ['msg', 'img', 'tit', 'yes', 'no'].forEach(prop => {
        if (options[prop]) {
          tpl[prop] = options[prop]
        }
      })
    }
    tpl.show = true
  }
}
export default MsgBox