/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import orgs from '@/data/orgs.json'

const nestedRouter = {
  path: '/orgs',
  component: Layout,
  // redirect: '/nested/menu1/menu1-1',
  name: 'Orgs',
  meta: {
    title: 'Orgs',
    icon: 'nested'
  },
  children: []
}

for (const org of orgs) {
  const newOrg = {
    path: org,
    name: org.toUpperCase(),
    component: () => import('@/views/nested/menu1/index'),
    meta: { title: org.toUpperCase() },
    children: [
      {
        path: 'Changelog',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Changelog',
        meta: { title: 'Changelog' }
      },
      {
        path: 'package-version',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Package Installed',
        meta: { title: 'Package Installed' }
      }
    ]
  }
  nestedRouter.children.push(newOrg)
}

export default nestedRouter
