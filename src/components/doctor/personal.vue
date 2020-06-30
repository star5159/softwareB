<template>
  <div>
    <el-card>
      <div class="head">
        <div class="information">
          <div class="flex-item">
            <p>姓名：{{doctorForm.doctor_name}}</p>
            <p>用户名：{{doctorForm.doctor_user}}</p>
            <el-button type="success" round @click="modifyPswordVisible = true">修改密码</el-button>
          </div>
          <div class="flex-item">
            <p>性别：{{doctorForm.doctor_gender}}</p>
            <p>科室：{{doctorForm.department_name}}</p>
          </div>
          <div class="flex-item">
            <p>电话：{{doctorForm.doctor_mobile}}</p>
            <p>邮箱：{{doctorForm.doctor_email}}</p>
            <p>诊室固话：{{doctorForm.doctor_tel}}</p>
          </div>
          <div class="flex-item btn">
            <el-button type="warning" round @click="getModifyInfo">修改个人信息</el-button>
          </div>
        </div>
        <div class="head_photo">
          <img :src="doctorForm.doctor_pho" alt="头像">
        </div>
      </div>
      <div class="introduction">
        <p>个人简介：{{doctorForm.doctor_intro}}</p>
      </div>
    </el-card>
    <!--修改医生个人信息-->
    <el-dialog title="修改个人信息" :visible.sync="modifyDialogVisible" width="35%" @close="modifyDialogClose">
      <el-form ref="modifyRef" :model="modifyForm" label-width="100px" :rules="doctorRule">
        <el-form-item label="手机号" prop="doctor_mobile">
          <el-input v-model="modifyForm.doctor_mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="doctor_email">
          <el-input v-model="modifyForm.doctor_email"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍" prop="doctor_intro">
          <el-input v-model="modifyForm.doctor_intro" :rows="3" type="textarea" maxlength="150"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload action="" :on-change="handleFileUploaderChange" list-type="picture" :auto-upload="false"
                     :limit="1" accept=".jpg, .jpeg, .png" ref="upload">
            <el-button type="success">上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dia_bts">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDoctor">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="modifyPswordVisible" width="35%" @close="modifyClose">
      <el-form ref="modifyPswordRef" :model="modifyPswordForm" label-width="120px" :rules="pswordRule">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="modifyPswordForm.password" type="password" show-password @blur="checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="doctor_password">
          <el-input v-model="modifyPswordForm.doctor_password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="check_password">
          <el-input v-model="modifyPswordForm.check_password" type="password" show-password
                    @blur="checkPsword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dia_bts">
        <el-button @click="modifyPswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePsword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      const checkEmail = (rule, value, check) => {
        const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (regEmail.test(value)) return check()
        check(new Error('请输入合法的邮箱'))
      }
      const checkMobile = (rule, value, check) => {
        const regMobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\d])|(18[0-9]))\d{8}$/
        if (regMobile.test(value)) return check()
        check(new Error('请输入合法的手机号'))
      }
      return {
        RSAKey: '',
        doctor_id: 0,
        doctorForm: {
          doctor_id: 0,
          doctor_name: '',
          doctor_user: '',
          department_name: '',
          doctor_email: '',
          doctor_mobile: '',
          doctor_tel: '',
          doctor_gender: '',
          doctor_intro: '',
          doctor_pho: ''
        },
        modifyDialogVisible: false,
        modifyForm: {
          doctor_id: 0,
          doctor_email: '',
          doctor_mobile: '',
          doctor_intro: '',
          doctor_pho: ''
        },
        imageBase64: '',
        doctorRule: {
          doctor_email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }, {
            validator: checkEmail,
            trigger: 'blur'
          }],
          doctor_mobile: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            validator: checkMobile,
            trigger: 'blur'
          }],
          doctor_intro: [{
            required: true,
            message: '请输入个人介绍',
            trigger: 'blur'
          }]
        },
        modifyPswordVisible: false,
        modifyPswordForm: {
          password: '',
          doctor_password: '',
          check_password: ''
        },
        pswordRule: {
          password: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }],
          doctor_password: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
          ],
          check_password: [{
            required: true,
            message: '请再一次输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    created () {
      this.doctor_id = window.sessionStorage.getItem('doctor_id')
      this.getDoctorInfo()
      this.getKey()
    },
    methods: {
      async getKey () {
        const { data: res } = await this.$http.get('getRSAKey')
        if (res.meta.status !== 200) return this.$message.error('获取公钥失败')
        this.RSAKey = res.data.publicKey
      },
      async getDoctorInfo () {
        const { data: res } = await this.$http.get('doctor/doctor-info', { params: { doctor_id: this.doctor_id } })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取医生信息失败')
        this.doctorForm = res.data
      },
      getModifyInfo () {
        this.modifyForm.doctor_email = this.doctorForm.doctor_email
        this.modifyForm.doctor_mobile = this.doctorForm.doctor_mobile
        this.modifyForm.doctor_intro = this.doctorForm.doctor_intro
        this.modifyDialogVisible = true
      },
      modifyDialogClose () {
        // console.log(this.$refs)
        // console.log(this.$refs.upload)
        // console.log(this.$refs.modifyRef)
        this.$refs.modifyRef.resetFields() // 清空
      },
      modifyClose () {
        this.$refs.modifyPswordRef.resetFields() // 清空
      },
      updateDoctor () {
        this.$refs.modifyRef.validate(async valid => {
          if (!valid) return
          this.modifyForm.doctor_id = this.doctor_id
          this.modifyForm.doctor_pho = this.imageBase64.split(',')[1] === undefined ? '' : this.imageBase64.split(',')[1]
          console.log(this.modifyForm)
          const { data: res } = await this.$http.post('doctor/modify-info', this.modifyForm)
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('修改个人信息失败')
          this.getDoctorInfo()
          this.modifyDialogVisible = false
        })
      },
      handleFileUploaderChange (file) {
        const that = this
        const reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function (event) {
          that.imageBase64 = this.result
        }
      },
      async checkPassword () { // 检查旧密码
        const password = this.$encryptedData(this.RSAKey, this.modifyPswordForm.password)
        const { data: res } = await this.$http.get('doctor/check-password', {
          params: {
            doctor_id: this.doctor_id,
            doctor_password: password
          }
        })
        if (res.meta.status !== 200) {
          const fields = this.$refs.modifyPswordRef.fields
          if (fields[0].prop === 'password') { // 单个表单清空
            fields[0].resetField()
          }
          return this.$message.error('密码不正确，请重新输入')
        }
        this.$message.success('原密码正确，请输入新密码')
      },
      updatePsword () {
        this.$refs.modifyPswordRef.validate(async valid => {
          if (!valid) return
          const password = this.$encryptedData(this.RSAKey, this.modifyPswordForm.doctor_password)
          console.log(password)
          const { data: res } = await this.$http.post('doctor/modify-password', {
            doctor_id: this.doctor_id,
            doctor_password: password
          })
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('修改密码失败')
          } else {
            this.$message.success('修改密码成功，请重新登录')
            this.modifyPswordVisible = false
            this.$router.push('login')
          }
        })
      },
      checkPsword () { // 检查新密码
        if (this.modifyPswordForm.doctor_password !== this.modifyPswordForm.check_password) {
          this.$message.error('密码不正确，请重新输入')
          const fields = this.$refs.modifyPswordRef.fields
          if (fields[2].prop === 'check_password') { // 单个表单清空
            fields[2].resetField()
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 500px;
  }

  .head {
    display: flex;
    /*flex: auto;*/
    order: 1;
    width: 100%;
    height: 60%;

    .information {
      display: flex;
      flex-direction: column;
      width: 80%;

      .flex-item {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: flex-start;

        p {
          margin: 5px 100px;
        }

        .el-button {
          margin: 5px 100px;
        }
      }
    }

    .head_photo {
      display: flex;
      order: 2;
      width: 20%;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover
      }
    }
  }

  .introduction {
    display: flex;
    flex: auto;
    order: 2;
    width: 100%;
    height: 40%;

    p {
      margin: 5px 100px;
    }
  }

  /deep/ .el-dialog__body {
    padding: 10px;
  }

  /deep/ .el-dialog__footer {
    padding: 10px;
  }

  .dia_bts {
    display: flex;
    justify-content: center;
  }

  /deep/ .el-dialog {
    min-width: 450px;
  }
</style>
