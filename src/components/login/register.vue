<template>
  <div>
    <div class="info">
      <p>请认真填写以下信息进行注册</p>
      <div class="reg-form">
        <el-form :model="registerForm" :rules="registerRules" ref="registerRef" label-width="120px">
          <!--用户名-->
          <el-form-item prop="patient_user" label="身份证号码">
            <el-input v-model="registerForm.patient_user" @blur="selectDate" clearable></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="patient_password" label="密码">
            <el-input type="password" v-model="registerForm.patient_password" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码确认">
            <el-input type="password" v-model="registerForm.password" @blur="checkPsword" clearable></el-input>
          </el-form-item>
          <el-form-item prop="patient_name" label="姓名">
            <el-input v-model="registerForm.patient_name" clearable></el-input>
          </el-form-item>
          <el-form-item class="radio" prop="patient_gender" label="性别">
            <el-radio v-model="registerForm.patient_gender" :label="true">男</el-radio>
            <el-radio v-model="registerForm.patient_gender" :label="false">女</el-radio>
          </el-form-item>
          <el-form-item prop="birthday" label="出生日期">
            <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item prop="patient_mobile" label="电话">
            <el-input v-model="registerForm.patient_mobile" clearable></el-input>
          </el-form-item>
          <el-form-item prop="address" label="住址">
            <el-input v-model="registerForm.address" clearable></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item class="bts">
            <el-button type="success" round @click="patientReg">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider direction="vertical"></el-divider>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      const checkMobile = (rule, value, check) => {
        const regMobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\d])|(18[0-9]))\d{8}$/
        if (value === '') return check()
        if (regMobile.test(value)) return check()
        check(new Error('请输入合法的手机号'))
      }
      return {
        registerForm: {
          patient_user: '',
          patient_password: '',
          password: '',
          patient_name: '',
          patient_gender: true,
          birthday: '',
          patient_mobile: '',
          address: ''
        },
        registerRules: {
          patient_user: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }, {
            min: 18,
            max: 18,
            message: '身份证号码长度为18位',
            trigger: 'blur'
          }
          ],
          patient_password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
          ],
          password: [{
            required: true,
            message: '请再一次输入密码',
            trigger: 'blur'
          }],
          patient_name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          patient_gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }],
          birthday: [{
            required: true,
            message: '请选择出生日期',
            trigger: 'blur'
          }],
          patient_mobile: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            validator: checkMobile,
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入您的住址',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      checkPsword () {
        if (this.registerForm.password !== this.registerForm.patient_password) {
          this.$message.error('密码不正确，请重新输入')
          const fields = this.$refs.registerRef.fields
          if (fields[2].prop === 'password') { // 单个表单清空
            fields[2].resetField()
          }
        }
      },
      selectDate () {
        this.$refs.registerRef.validateField('patient_user', valid => {
          if (valid !== '') return
          let date = this.registerForm.patient_user.slice(6, 14).split('')
          date.splice(4, 0, '-')
          date.splice(-2, 0, '-')
          date = date.join('')
          this.registerForm.birthday = date
        })
      },
      patientReg () {
        console.log(this.registerForm)
        this.$refs.registerRef.validate(async valid => {
          console.log(valid)
          if (!valid) return // 如果预验证规则不通过，直接返回
          const { data: res } = await this.$http.post('patient/register', this.registerForm)
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .info {
    position: relative;
    width: 70%;
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
    margin: 20px 100px 20px 50px;
    width: 80%;
  }

  /deep/ .radio .el-form-item__content {
    line-height: 20px;
  }

  /deep/ .radio .el-form-item__label {
    line-height: 20px;
  }

  .bts {
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }

  .el-divider {
    height: 500px;
    margin: 25px 8px;
    background-color: #6d6d6d;
  }
</style>
