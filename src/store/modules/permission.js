import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRolesMap } from '@/api/auth'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 递归把 后端权限map 和前端渲染map
 * @param target  前端渲染map
 * @param source  后端权限map
 */

function extend(target, source) {
  if (obj === 'children') {
    target['children'] = extend(target['children'], source['children'])
  } else {
    for (var obj in source['meta']) {
      target['meta'][obj] = source['meta'][obj]
    }
  }
  return target
}

const permission = {
  state: {
    routers: constantRouterMap,
    asyncRouters: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    GET_ADDROUTERS: (state, routers) => {
      state.asyncRouters = routers
    }
  },
  actions: {
    asyncRouterMap({ commit }) {
      return new Promise((resolve, reject) => {
        getRolesMap().then(resp => {
          if (!resp.data) {
            reject('error')
          }
          const data = JSON.parse(resp.data)
          const asyncRoute = extend(asyncRouterMap, data)
          commit('GET_ADDROUTERS', asyncRoute)
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GenerateRoutes({ state, commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = state.asyncRouters
        } else {
          accessedRouters = filterAsyncRouter(state.asyncRouters, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
