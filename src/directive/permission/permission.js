
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const componentName = binding.arg
    const rolesDetails = store.getters && store.getters.rolesDetails

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const rolesDetail = rolesDetails[componentName]
      var hasPermission = null
      if (rolesDetail) {
        hasPermission = rolesDetail.some(role => {
          return permissionRoles.includes(role)
        })
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
