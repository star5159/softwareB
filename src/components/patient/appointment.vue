<template>
  <div>
    <div class="info">
      <p>请填写预约信息</p>
      <el-form :model="appointForm" ref="appointRef" :rules="appointRule" label-width="150px">
        <el-form-item prop="department_id" label="选择科室">
          <el-select v-model="appointForm.department_id" placeholder="请选择科室" @change="departmentChange">
            <el-option v-for="item in department" :key="item.department_id" :label="item.department_name"
                       :value="item.department_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="res_date" label="预约日期">
          <el-date-picker v-model="appointForm.res_date" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="disabled1"
                          @change="dateChange"></el-date-picker>
        </el-form-item>
        <el-form-item prop="doctor_id" label="选择医生">
          <el-select v-model="appointForm.doctor_id" placeholder="请选择医生" :disabled="disabled2"
                     @change="get_doctor_info">
            <el-option v-for="item in doctors" :key="item.doctor_id" :label="item.doctor_name"
                       :value="item.doctor_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="period" label="预约时间段">
          <el-select v-model="appointForm.period" placeholder="请选择预约时间段" :disabled="disabled3">
            <el-option v-for="item in times" :key="item.id" :label="item.value" :value="item.value"
                       :disabled="item.remain === 0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="bts">
          <el-button type="primary" round @click="appoint">预约挂号</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider direction="vertical"></el-divider>
    <DoctorInfo class="doctor" :info="doctor_info" :remainder="true"></DoctorInfo>
  </div>
</template>

<script>
  import DoctorInfo from '../patient/doctor_info.vue'
  export default {
    name: 'appointment',
    components: { DoctorInfo },
    data () {
      return {
        appointForm: {
          res_date: '',
          period: '',
          doctor_id: '',
          department_id: '',
          patient_id: 0
        },
        appointRule: {
          res_date: [{
            required: true,
            message: '请选择预约日期',
            trigger: ['change', 'blur']
          }],
          period: [{
            required: true,
            message: '请选择预约时间段',
            trigger: ['change', 'blur']
          }],
          doctor_id: [{
            required: true,
            message: '请选择医生',
            trigger: ['change', 'blur']
          }],
          department_id: [{
            required: true,
            message: '请选择科室',
            trigger: ['change', 'blur']
          }]
        },
        times: [{
          id: 0,
          value: '上午',
          remain: 0
        }, {
          id: 1,
          value: '下午',
          remain: 3
        }],
        department: [{
          department_id: 0,
          department_name: ''
        }],
        doctors: [{
          doctor_id: 0,
          doctor_name: ''
        }],
        disabled1: true,
        disabled2: true,
        doctor_info: {},
        disabled3: true,
        pickerOptions: {
          disabledDate (time) { // 筛选今天后14天的日期
            return time.getTime() < Date.now() - 8.64e7 || Date.now() + 1.123e9 < time.getTime()
          }
        }
      }
    },
    created () {
      window.sessionStorage.setItem('activePath', '/appointment')
      this.get_department()
      this.appointForm.patient_id = window.sessionStorage.getItem('patient_id')
    },
    methods:
      {
        departmentChange () {
          if (this.disabled1) {
            this.$refs.appointRef.validateField('department_id', valid => {
              if (valid !== '') return
              this.disabled1 = false
            })
          } else {
            const fields = this.$refs.appointRef.fields
            for (let i = 1; i < fields.length; i++) {
              if (fields[i].prop !== 'department_id') {
                fields[i].resetField()
              }
            }
            this.doctor_info = {}
            this.disabled2 = true
            this.disabled3 = true
          }
        },
        dateChange () {
          if (this.disabled2) {
            this.$refs.appointRef.validateField('res_date', valid => {
              if (valid !== '') return
              this.disabled2 = false
              this.get_doctor_list()
            })
          } else {
            this.$refs.appointRef.validateField('doctor_id', valid => {
              if (valid !== '') return
              this.get_doctor_info()
            })
          }
        },
        async get_department () {
          const { data: res } = await this.$http.get('patient/department-list')
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('获取科室列表失败')
          this.department = res.data
        },
        async get_doctor_list () {
          const { data: res } = await this.$http.get('patient/doctor-list', { params: { department_id: this.appointForm.department_id } })
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('获取医生列表失败')
          this.doctors = res.data
        },
        async get_doctor_info () {
          const doctorInfo = {
            doctor_id: this.appointForm.doctor_id,
            res_date: this.appointForm.res_date
          }
          console.log(doctorInfo)
          const { data: res } = await this.$http.get('patient/doctor-info', { params: doctorInfo })
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('获取医生信息失败')
          this.doctor_info = res.data
          this.disabled3 = false
          this.times[0].remain = res.data.am_remainder
          this.times[1].remain = res.data.pm_remainder
          console.log(this.times)
        },
        appoint () {
          this.$refs.appointRef.validate(async valid => {
            if (!valid) return
            console.log(this.appointForm)
            const { data: res } = await this.$http.post('patient/reg-submit', this.appointForm)
            console.log(res)
            if (res.meta.status !== 201) return this.$message.error('挂号失败')
            this.$message.success('挂号成功')
            this.$router.push('home')
          })
        }
      }
  }
</script>

<style lang="less" scoped>
  .info {
    position: relative;
    width: 45%;
    height: 100%;
    float: left;
  }

  p {
    display: block;
    text-align: center;
    font-weight: bold;
    margin: 5px;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }

  .el-form-item {
    margin: 20px 50px 20px 50px;
    /*width: 80%;*/
  }

  .el-divider {
    height: 350px;
    margin: 25px 8px;
    background-color: #6d6d6d;
  }

  .doctor {
    display: block;
    float: right;
    width: 50%;
    height: 400px;
    margin: 5px;
  }
</style>
