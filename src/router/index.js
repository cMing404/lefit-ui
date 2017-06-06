import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/demos/index'
import MsgBox from '@/demos/msg-box'
import Button from '@/demos/button'
import Cell from '@/demos/cell'
import imgCutUpload from '@/demos/img-cut-upload'
import imgLoad from '@/demos/img-load'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/msg-box',
      name: 'msg-box',
      component: MsgBox
    },
    {
      path: '/button',
      name: 'button',
      component: Button
    },
    {
      path: '/cell',
      name: 'cell',
      component: Cell
    },
    {
      path: '/img-cut',
      name: 'img-cut',
      component: imgCutUpload
    },
    {
      path: '/img-load',
      name: 'img-load',
      component: imgLoad
    }
  ]
})
