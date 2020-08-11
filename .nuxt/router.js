import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _093d5810 = () => interopDefault(import('../pages/doctor.vue' /* webpackChunkName: "pages/doctor" */))
const _7cdee7b9 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _10da13a7 = () => interopDefault(import('../pages/laboratory/index.vue' /* webpackChunkName: "pages/laboratory/index" */))
const _447d55ca = () => interopDefault(import('../pages/loading.vue' /* webpackChunkName: "pages/loading" */))
const _0228d11e = () => interopDefault(import('../pages/reception/index.vue' /* webpackChunkName: "pages/reception/index" */))
const _0b2a3286 = () => interopDefault(import('../pages/administrator/branches/index.vue' /* webpackChunkName: "pages/administrator/branches/index" */))
const _71cb6c54 = () => interopDefault(import('../pages/administrator/doctors/index.vue' /* webpackChunkName: "pages/administrator/doctors/index" */))
const _217e5935 = () => interopDefault(import('../pages/administrator/pending-messages.vue' /* webpackChunkName: "pages/administrator/pending-messages" */))
const _2277f97b = () => interopDefault(import('../pages/administrator/register-user-faces.vue' /* webpackChunkName: "pages/administrator/register-user-faces" */))
const _c952e750 = () => interopDefault(import('../pages/administrator/rooms/index.vue' /* webpackChunkName: "pages/administrator/rooms/index" */))
const _05b9eb68 = () => interopDefault(import('../pages/administrator/users/index.vue' /* webpackChunkName: "pages/administrator/users/index" */))
const _91133302 = () => interopDefault(import('../pages/auth/sign-in.vue' /* webpackChunkName: "pages/auth/sign-in" */))
const _94ef50f8 = () => interopDefault(import('../pages/laboratory/diagnostics/index.vue' /* webpackChunkName: "pages/laboratory/diagnostics/index" */))
const _620f7e16 = () => interopDefault(import('../pages/reception/duplicate-token.vue' /* webpackChunkName: "pages/reception/duplicate-token" */))
const _b89516dc = () => interopDefault(import('../pages/reception/generate-token.vue' /* webpackChunkName: "pages/reception/generate-token" */))
const _7ea96594 = () => interopDefault(import('../pages/reception/third-turn.vue' /* webpackChunkName: "pages/reception/third-turn" */))
const _b8594c56 = () => interopDefault(import('../pages/administrator/branches/add.vue' /* webpackChunkName: "pages/administrator/branches/add" */))
const _2516a1ba = () => interopDefault(import('../pages/administrator/doctors/add.vue' /* webpackChunkName: "pages/administrator/doctors/add" */))
const _43c59c1c = () => interopDefault(import('../pages/administrator/report/tokens.vue' /* webpackChunkName: "pages/administrator/report/tokens" */))
const _70900027 = () => interopDefault(import('../pages/administrator/rooms/add.vue' /* webpackChunkName: "pages/administrator/rooms/add" */))
const _4f5fe337 = () => interopDefault(import('../pages/administrator/users/add.vue' /* webpackChunkName: "pages/administrator/users/add" */))
const _de5ab35a = () => interopDefault(import('../pages/laboratory/diagnostics/add.vue' /* webpackChunkName: "pages/laboratory/diagnostics/add" */))
const _190431a7 = () => interopDefault(import('../pages/pharmacy/diagnostic-items/add.vue' /* webpackChunkName: "pages/pharmacy/diagnostic-items/add" */))
const _6ee923a0 = () => interopDefault(import('../pages/pharmacy/medicines/add.vue' /* webpackChunkName: "pages/pharmacy/medicines/add" */))
const _7d4b4c74 = () => interopDefault(import('../pages/pharmacy/stock-purchase/diagnostic-items.vue' /* webpackChunkName: "pages/pharmacy/stock-purchase/diagnostic-items" */))
const _3204a7fd = () => interopDefault(import('../pages/pharmacy/stock-purchase/medicines.vue' /* webpackChunkName: "pages/pharmacy/stock-purchase/medicines" */))
const _19caf83b = () => interopDefault(import('../pages/pharmacy/stock-purchase/surgical-items.vue' /* webpackChunkName: "pages/pharmacy/stock-purchase/surgical-items" */))
const _31056a2e = () => interopDefault(import('../pages/pharmacy/stock/diagnostic-items.vue' /* webpackChunkName: "pages/pharmacy/stock/diagnostic-items" */))
const _612486d6 = () => interopDefault(import('../pages/pharmacy/stock/medicines.vue' /* webpackChunkName: "pages/pharmacy/stock/medicines" */))
const _cb61faba = () => interopDefault(import('../pages/pharmacy/stock/surgical-items.vue' /* webpackChunkName: "pages/pharmacy/stock/surgical-items" */))
const _0b32b55c = () => interopDefault(import('../pages/pharmacy/surgical-items/add.vue' /* webpackChunkName: "pages/pharmacy/surgical-items/add" */))
const _0da4465e = () => interopDefault(import('../pages/reception/patients/add.vue' /* webpackChunkName: "pages/reception/patients/add" */))
const _243bf6bb = () => interopDefault(import('../pages/administrator/branches/_id/edit.vue' /* webpackChunkName: "pages/administrator/branches/_id/edit" */))
const _853718ae = () => interopDefault(import('../pages/administrator/rooms/_id/edit.vue' /* webpackChunkName: "pages/administrator/rooms/_id/edit" */))
const _3f57fa99 = () => interopDefault(import('../pages/administrator/users/_id/edit.vue' /* webpackChunkName: "pages/administrator/users/_id/edit" */))
const _05eec8fd = () => interopDefault(import('../pages/laboratory/diagnostics/_id/edit.vue' /* webpackChunkName: "pages/laboratory/diagnostics/_id/edit" */))
const _95599bae = () => interopDefault(import('../pages/pharmacy/diagnostic-items/_id/edit.vue' /* webpackChunkName: "pages/pharmacy/diagnostic-items/_id/edit" */))
const _56c393d0 = () => interopDefault(import('../pages/pharmacy/medicines/_id/edit.vue' /* webpackChunkName: "pages/pharmacy/medicines/_id/edit" */))
const _a0c890d8 = () => interopDefault(import('../pages/pharmacy/surgical-items/_id/edit.vue' /* webpackChunkName: "pages/pharmacy/surgical-items/_id/edit" */))
const _36570771 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/doctor",
    component: _093d5810,
    name: "doctor"
  }, {
    path: "/inspire",
    component: _7cdee7b9,
    name: "inspire"
  }, {
    path: "/laboratory",
    component: _10da13a7,
    name: "laboratory"
  }, {
    path: "/loading",
    component: _447d55ca,
    name: "loading"
  }, {
    path: "/reception",
    component: _0228d11e,
    name: "reception"
  }, {
    path: "/administrator/branches",
    component: _0b2a3286,
    name: "administrator-branches"
  }, {
    path: "/administrator/doctors",
    component: _71cb6c54,
    name: "administrator-doctors"
  }, {
    path: "/administrator/pending-messages",
    component: _217e5935,
    name: "administrator-pending-messages"
  }, {
    path: "/administrator/register-user-faces",
    component: _2277f97b,
    name: "administrator-register-user-faces"
  }, {
    path: "/administrator/rooms",
    component: _c952e750,
    name: "administrator-rooms"
  }, {
    path: "/administrator/users",
    component: _05b9eb68,
    name: "administrator-users"
  }, {
    path: "/auth/sign-in",
    component: _91133302,
    name: "auth-sign-in"
  }, {
    path: "/laboratory/diagnostics",
    component: _94ef50f8,
    name: "laboratory-diagnostics"
  }, {
    path: "/reception/duplicate-token",
    component: _620f7e16,
    name: "reception-duplicate-token"
  }, {
    path: "/reception/generate-token",
    component: _b89516dc,
    name: "reception-generate-token"
  }, {
    path: "/reception/third-turn",
    component: _7ea96594,
    name: "reception-third-turn"
  }, {
    path: "/administrator/branches/add",
    component: _b8594c56,
    name: "administrator-branches-add"
  }, {
    path: "/administrator/doctors/add",
    component: _2516a1ba,
    name: "administrator-doctors-add"
  }, {
    path: "/administrator/report/tokens",
    component: _43c59c1c,
    name: "administrator-report-tokens"
  }, {
    path: "/administrator/rooms/add",
    component: _70900027,
    name: "administrator-rooms-add"
  }, {
    path: "/administrator/users/add",
    component: _4f5fe337,
    name: "administrator-users-add"
  }, {
    path: "/laboratory/diagnostics/add",
    component: _de5ab35a,
    name: "laboratory-diagnostics-add"
  }, {
    path: "/pharmacy/diagnostic-items/add",
    component: _190431a7,
    name: "pharmacy-diagnostic-items-add"
  }, {
    path: "/pharmacy/medicines/add",
    component: _6ee923a0,
    name: "pharmacy-medicines-add"
  }, {
    path: "/pharmacy/stock-purchase/diagnostic-items",
    component: _7d4b4c74,
    name: "pharmacy-stock-purchase-diagnostic-items"
  }, {
    path: "/pharmacy/stock-purchase/medicines",
    component: _3204a7fd,
    name: "pharmacy-stock-purchase-medicines"
  }, {
    path: "/pharmacy/stock-purchase/surgical-items",
    component: _19caf83b,
    name: "pharmacy-stock-purchase-surgical-items"
  }, {
    path: "/pharmacy/stock/diagnostic-items",
    component: _31056a2e,
    name: "pharmacy-stock-diagnostic-items"
  }, {
    path: "/pharmacy/stock/medicines",
    component: _612486d6,
    name: "pharmacy-stock-medicines"
  }, {
    path: "/pharmacy/stock/surgical-items",
    component: _cb61faba,
    name: "pharmacy-stock-surgical-items"
  }, {
    path: "/pharmacy/surgical-items/add",
    component: _0b32b55c,
    name: "pharmacy-surgical-items-add"
  }, {
    path: "/reception/patients/add",
    component: _0da4465e,
    name: "reception-patients-add"
  }, {
    path: "/administrator/branches/:id/edit",
    component: _243bf6bb,
    name: "administrator-branches-id-edit"
  }, {
    path: "/administrator/rooms/:id/edit",
    component: _853718ae,
    name: "administrator-rooms-id-edit"
  }, {
    path: "/administrator/users/:id/edit",
    component: _3f57fa99,
    name: "administrator-users-id-edit"
  }, {
    path: "/laboratory/diagnostics/:id/edit",
    component: _05eec8fd,
    name: "laboratory-diagnostics-id-edit"
  }, {
    path: "/pharmacy/diagnostic-items/:id?/edit",
    component: _95599bae,
    name: "pharmacy-diagnostic-items-id-edit"
  }, {
    path: "/pharmacy/medicines/:id?/edit",
    component: _56c393d0,
    name: "pharmacy-medicines-id-edit"
  }, {
    path: "/pharmacy/surgical-items/:id?/edit",
    component: _a0c890d8,
    name: "pharmacy-surgical-items-id-edit"
  }, {
    path: "/",
    component: _36570771,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
