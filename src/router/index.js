import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/hospital/home.vue'
import Login from '../components/login/login.vue'
import HomePage from '../components/hospital/homepage.vue'
import Register from '../components/login/register.vue'
import Appointment from '../components/patient/appointment.vue'
import MedRecord from '../components/patient/medical_record.vue'
import Doctor from '../components/doctor/doctor.vue'
import Disgnosis from '../components/doctor/diagnosis.vue'
import Personal from '../components/doctor/personal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage,
    redirect: '/home',
    children: [{
      path: '/home',
      component: Home
    }, {
      path: '/appointment',
      component: Appointment,
      meta: {
        requireAuth: true,
        role: 'patient'
      }
    }, {
      path: '/medical_record',
      component: MedRecord,
      meta: {
        requireAuth: true,
        role: 'patient'
      }
    }, {
      path: '/register',
      component: Register
    }]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/doctor',
    component: Doctor,
    redirect: '/personal',
    children: [{
      path: '/personal',
      component: Personal,
      meta: {
        requireAuth: true,
        role: 'doctor'
      }
    }, {
      path: '/diagnosis',
      component: Disgnosis,
      meta: {
        requireAuth: true,
        role: 'doctor'
      }
    }]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => { // 路由守卫
  const token = window.sessionStorage.getItem('token')
  const role = window.sessionStorage.getItem('role')
  if (to.meta.requireAuth) {
    if (!token) {
      return next('/login')
    } else {
      if (to.meta.role === role) {
        return next()
      } else {
        return next({ path: from.fullPath })
      }
    }
  } else {
    return next()
  }
})

export default router
