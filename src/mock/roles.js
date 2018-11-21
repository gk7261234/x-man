const asyncRouterMap = [
  {
    path: '/permission',
    meta: {
      roles: ['admin123', 'editor']
    },
    children: [
      {
        path: 'A',
        meta: { roles: ['admin123'] }
      },
      {
        path: 'B',
        meta: { roles: ['editor'] }
      },
      {
        path: 'C'
      }
    ]
  }
]

export default {
  getRoleMap: config => {
    return JSON.stringify(asyncRouterMap)
  }
}

