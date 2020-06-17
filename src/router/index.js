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
        requireAuth: true
      }
    }, {
      path: '/medical_record',
      component: MedRecord
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
      component: Personal
    }, {
      path: '/diagnosis',
      component: Disgnosis
    }]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => { // 路由守卫
//   if (to.path === '/login' || to.path === '/') return next()
//   const doctorToken = window.sessionStorage.getItem('doctor_token')
//   const patientToken = window.sessionStorage.getItem('patient_token')
//   if (!doctorToken) return next('/login')
//   next()
// })

export default router
