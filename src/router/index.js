import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/user_pages/Home.vue'
import Projects from '@/components/user_pages/Projects.vue'
import Donate from '@/components/user_pages/Donate.vue'
import Dashboard from '@/components/admin_pages/Dashboard.vue'
import AdminDonate from '@/components/admin_pages/AdminDonate.vue'
import AdminExpenses from '@/components/admin_pages/AdminExpenses.vue'
import AdminProjects from '@/components/admin_pages/AdminProjects.vue'
import ProjectDetails from '@/components/admin_pages/ProjectDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Projects',
    name: 'Projects',
    component: Projects
  },
    {
    path: '/Donate',
    name: 'Donate',
    component: Donate
  },
      {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
        {
    path: '/AdminDonate',
    name: 'AdminDonate',
    component: AdminDonate
  },
        {
    path: '/AdminExpenses',
    name: 'AdminExpenses',
    component: AdminExpenses
  },
        {
    path: '/AdminProjects',
    name: 'AdminProjects',
    component: AdminProjects
  },
  {
    path:'/ProjectDetails/:id',
    name:'ProjectDetails',
    component:ProjectDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


