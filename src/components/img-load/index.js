import err from '../../../assets/images/img_err_s.png'
import loading from '../../../assets/images/logo-placehodel.png'
const placeImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
// 去除img边框
let lefitImgLoad = function (el) {
  el.style.backgroundColor = 'rgba(0,0,0,.03)'
  el.style.backgroundImage = `url(${loading})`
  el.style.backgroundPosition = 'center center'
  el.style.backgroundRepeat = 'no-repeat'
  el.style.backgroundSize = '47px 13px'
}
let lefitImgErr = function (el) {
  el.style.backgroundColor = 'rgba(0,0,0,.03)'
  el.style.backgroundImage = `url(${err})`
  el.style.backgroundPosition = 'center center'
  el.style.backgroundRepeat = 'no-repeat'
  el.style.backgroundSize = '33px 31px'
}
let imgLoad = function (el, binding) {
  let img = new Image()
  img.src = binding.value
  img.onload = function () {
    el.src = this.src
  }
  img.onerror = function () {
    if (el.nodeName === 'IMG' && !el.src) {
      el.alt = `图片src请求失败: ${binding.value}`
      lefitImgErr(el)
      return
    }
    el.alt = '图片src不存在'
  }
}
export default {
  install (Vue, options = {}) {
    let H = window.screen.height
    Vue.directive('lefit-load', {
      bind (el) {
        lefitImgLoad(el)
        el.src = placeImgSrc
      },
      inserted: (el, binding) => {
        imgLoad(el, binding)
      },
      componentUpdated (el, binding) {
        imgLoad(el, binding)
      },
      unbind (el) {
        el.alt = ''
      }
    })
  }
}