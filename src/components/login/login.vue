<template>
  <div class="login_background">
    <div class="login_container">
      <span @click="backHome">返回主页</span>
      <!--标题-->
      <div class="title">
        医院管理系统
      </div>
      <div class="login_box">
        <!-- 头像区 -->
        <div class="head_portrait">
          <img :src="imageJpg" alt="头像">
        </div>
        <!-- 表单区 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginRef" class="login_info">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="radio" prop="identity">
            <el-radio v-model="loginForm.identity" :label="true">医生</el-radio>
            <el-radio v-model="loginForm.identity" :label="false">病人</el-radio>
          </el-form-item>
          <!--按钮-->
          <el-form-item class="bts">
            <el-button type="primary" round @click="login">登录</el-button>
            <el-button type="info" round @click="signUp">病人注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginForm: { // 登录表单数据绑定对象
          username: '',
          password: '',
          identity: true
        },
        loginRules: { // 表单数据验证规则
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 10 个字符',
              trigger: 'blur'
            }
          ],
          identity: [{
            required: true,
            message: '请选择用户身份',
            trigger: 'blur'
          }]
        },
        RSAKey: '',
        imageJpg: require('../../assets/logo.png')
      }
    },
    created () {
      this.getKey()
      window.sessionStorage.clear()
    },
    methods: {
      async getKey () {
        const { data: res } = await this.$http.get('getRSAKey')
        if (res.meta.status !== 200) return this.$message.error('获取公钥失败')
        console.log(res.data)
        this.RSAKey = res.data.publicKey
      },
      login () {
        this.$refs.loginRef.validate(async valid => {
          if (!valid) return
          const loginParameter = this._.cloneDeep(this.loginForm)
          delete loginParameter.identity
          loginParameter.password = this.$encryptedData(this.RSAKey, loginParameter.password)
          console.log(loginParameter)
          if (this.loginForm.identity) {
            const { data: res } = await this.$http.post('doctor/login', loginParameter)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('登录失败')
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('role', 'doctor')
            window.sessionStorage.setItem('doctor_id', res.doctor_id)
            this.$router.push('doctor')
          } else {
            const { data: res } = await this.$http.post('patient/login', loginParameter)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('登录失败')
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('role', 'patient')
            window.sessionStorage.setItem('patient_id', res.data.patient_id)
            window.sessionStorage.setItem('patient_name', res.data.patient_name)
            this.$router.push('home')
          }
        })
      },
      signUp () {
        this.doctor = false
        this.$router.push('/register')
      },
      backHome () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_background {
    position: relative;
    height: 100%;
    background-color: white;
    background-image: url("../../assets/background.jpg");
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }

  .login_container {
    position: absolute;
    transform: translate(-50%);
    left: 50%;
    height: 100%;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  span {
    display: block;
    text-align: right;
    margin: 0 15px;
    text-shadow: 0 0 3px white;
    color: dodgerblue;

    &:hover {
      cursor: pointer;
    }
  }

  .title {
    height: 150px;
    line-height: 150px;
    font-size: 80px;
    display: flex;
    justify-content: center;
  }

  .login_box {
    height: 300px;
    width: 450px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -35%);
    border-radius: 20px;
  }

  .head_portrait {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: absolute;
    border: 2px solid #d2d2d2;
    padding: 5px;
    margin: 0;
    box-shadow: 0 0 5px #828282;
    background-color: #ffffff;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }

  .login_info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .el-form-item {
    margin: 20px 20px 0 20px;
    text-align: center;
  }

  /deep/ .radio .el-form-item__content {
    line-height: 20px;
  }

  .bts {
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }
</style>
