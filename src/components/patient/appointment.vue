<template>
  <div>
    <div class="info">
      <p>请填写预约信息</p>
      <el-form :model="appointForm" ref="appointRef" :rules="appointRule" label-width="150px">
        <el-form-item class="cascader" prop="doctor" label="选择科室">
          <el-select v-model="appointForm.apartment" placeholder="请选择科室">
            <el-option v-for="item in apartment" :key="item.value" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="date" label="预约日期">
          <el-date-picker v-model="appointForm.date" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item class="cascader" prop="doctor" label="选择医生">
          <el-select v-model="appointForm.doctor" placeholder="请选择医生" :disabled="disabled">
            <el-option v-for="item in doctors" :key="item.value" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="time" label="预约时间段">
          <el-select v-model="appointForm.time" placeholder="请选择预约时间段" :disabled="disabled">
            <el-option v-for="item in times" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="bts">
          <el-button type="primary" round @click="appoint">预约挂号</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider direction="vertical"></el-divider>
    <el-card>
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'appointment',
    data () {
      return {
        appointForm: {
          date: '',
          time: '',
          doctor: '',
          apartment: ''
        },
        appointRule: {
          date: [{
            required: true,
            message: '请选择预约日期',
            trigger: 'blur'
          }],
          time: [{
            required: true,
            message: '请选择预约时间段',
            trigger: ['change', 'blur']
          }],
          doctor: [{
            required: true,
            message: '请选择医生',
            trigger: ['change', 'blur']
          }]
        },
        times: [{
          id: 0,
          value: '上午'
        }, {
          id: 1,
          value: '下午'
        }],
        doctors: [{
          value: 2,
          label: '黄医生'
        }, {
          value: 3,
          label: '宋医生'
        }],
        apartment: [{
          value: 4,
          label: '儿科'
        }, {
          value: 5,
          label: '呼吸科'
        }],
        disabled: true,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7 || Date.now() + 1.123e9 < time.getTime()
          }
        }
      }
    },
    methods:
      {
        appoint () {
          this.$refs.appointRef.validate(valid => {
            if (!valid) return
          })
        }
      }
  }
</script>

<style lang="less" scoped>
  .info {
    position: relative;
    width: 50%;
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
    /*width: 80%;*/
  }

  .el-divider {
    height: 350px;
    margin: 25px 8px;
    background-color: #6d6d6d;
  }

  .el-card {
    float: right;
    width: 40%;
    height: 350px;
    margin: 30px;
  }
</style>
