import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/expedientes',
    component: Layout,
    redirect: '/expedientes/index',
    name: 'Expedientes',
    meta: { title: 'Mis Expedientes', icon: 'documentation' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/caratulas/index'),
        name: 'Mis Expedientes',
        meta: { title: 'Expedientes', noCache: true, icon: 'documentation' },
        hidden: true
      },
      {
        path: 'crear',
        component: () => import('@/views/caratulas/crear'),
        name: 'CrearExpediente',
        meta: { title: 'Crear Expediente', noCache: true, activeMenu: '/expedientes' },
        hidden: true
      },
      {
        path: 'editar/:id(\\d+)',
        component: () => import('@/views/oficinas/edit'),
        name: 'EditarCaratula',
        meta: { title: 'Editar Caratula', noCache: true, noTag: true, activeMenu: '/expedientes' },
        hidden: true
      },
      {
        path: 'pases/:id',
        component: () => import('@/views/caratulas/pases'),
        name: 'ListaPases',
        meta: { title: 'Lista de Pases', noCache: true, noTag: true, activeMenu: '/expedientes' },
        hidden: true
      },
      {
        path: 'pases/:id/derivar',
        component: () => import('@/views/caratulas/derivar'),
        name: 'Derivar',
        meta: { title: 'Derivar', noCache: true, noTag: true, activeMenu: '/expedientes' },
        hidden: true
      },
      {
        path: 'cerrar/:id',
        component: () => import('@/views/caratulas/cerrar'),
        name: 'Cerrar',
        meta: { title: 'Cerrar', noCache: true, noTag: true, activeMenu: '/expedientes' },
        hidden: true
      }
    ]
  },
  {
    path: '/recepcion',
    component: Layout,
    redirect: '/recepcion/index',
    name: 'Derivados',
    meta: { title: 'Recibir/Rechazar', icon: 'skill' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/recepcion/index'),
        name: 'Recepcion',
        meta: { title: 'Recibir/Rechazar', noCache: true, icon: 'skill' },
        hidden: true
      }
    ]
  },
  {
    path: '/cerrados',
    component: Layout,
    redirect: '/cerrados/index',
    name: 'Cerrados',
    meta: { title: 'Cerrados', icon: 'lock' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/cerrados/index'),
        name: 'CerradosList',
        meta: { title: 'Cerrados', noCache: true, activeMenu: '/cerrados' },
        hidden: true
      },
      {
        path: 'reabrir/:id',
        component: () => import('@/views/cerrados/reabrir'),
        name: 'Reabrir',
        meta: { title: 'Cerrados', noCache: true, noTag: true, activeMenu: '/cerrados' },
        hidden: true
      }
    ]
  },
  {
    path: '/soporte',
    component: Layout,
    redirect: '/soporte/organismos/index',
    name: 'Soporte',
    meta: { title: 'Soporte', icon: 'example' },
    children: [
      {
        path: '/organismos',
        component: () => import('@/views/organismos/index'),
        redirect: '/organismos/index',
        name: 'Organismos',
        meta: { title: 'Organismos', icon: 'tree' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/organismos/index'),
            name: 'ListaOrganismos',
            meta: { title: 'Organismos', icon: 'tree' },
            hidden: true
          },
          {
            path: 'crear/:id(\\d+)',
            component: () => import('@/views/organismos/crear'),
            name: 'CrearOrganismo',
            meta: { title: 'Crear Organismo', noCache: true, activeMenu: '/organismos' },
            hidden: true
          },
          {
            path: 'editar/:id(\\d+)',
            component: () => import('@/views/organismos/editar'),
            name: 'EditarOrganismo',
            meta: { title: 'Editar Organismo', noCache: true, activeMenu: '/organismos' },
            hidden: true
          }
        ]
      },
      {
        path: '/usuarios',
        component: () => import('@/views/usuarios/index'),
        redirect: '/usuarios/index',
        name: 'Usuarios',
        meta: { title: 'Usuarios', icon: 'user' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/usuarios/index'),
            name: 'ListaUsuarios',
            meta: { title: 'Usuarios', activeMenu: '/usuarios' },
            hidden: true
          },
          {
            path: 'crear',
            component: () => import('@/views/usuarios/crear'),
            name: 'CrearUsuario',
            meta: { title: 'Crear Usuario', activeMenu: '/usuarios' },
            hidden: true
          },
          {
            path: 'editar/:id(\\d+)',
            component: () => import('@/views/usuarios/edit'),
            name: 'EditarUsuario',
            meta: { title: 'Editar Usuario', noCache: true, activeMenu: '/usuarios' },
            hidden: true
          }
        ]
      },
      {
        path: '/oficinas',
        component: () => import('@/views/oficinas/index'),
        redirect: '/oficinas/index',
        name: 'Oficinas',
        meta: { title: 'Oficinas', icon: 'tree-table' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/oficinas/index'),
            name: 'ListaOficinas',
            meta: { title: 'Oficinas', icon: 'tree-table' },
            hidden: true
          },
          {
            path: 'crear',
            component: () => import('@/views/oficinas/crear'),
            name: 'CrearOficina',
            meta: { title: 'Crear Oficina', noCache: true, activeMenu: '/oficinas' },
            hidden: true
          },
          {
            path: 'editar/:id(\\d+)',
            component: () => import('@/views/oficinas/edit'),
            name: 'EditarOficina',
            meta: { title: 'Editar Oficina', noCache: true, activeMenu: '/oficinas' },
            hidden: true
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
