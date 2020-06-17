<template>
  <div>
    <div class="info">
      <p>请填写预约信息</p>
      <el-form :model="appointForm" ref="appointRef" :rules="appointRule" label-width="150px">
        <el-form-item prop="date" label="预约日期">
          <el-date-picker v-model="appointForm.date" type="date" placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item prop="time" label="预约时间段">
          <el-select v-model="appointForm.time" placeholder="请选择">
            <el-option v-for="item in times" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="doctor" label="选择医生">
          <el-cascader v-model="appointForm.doctor" :options="options" :props="cateProps" ></el-cascader>
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
          doctor: ''
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
            trigger: 'blur'
          }],
          doctor: [{
            required: true,
            message: '请选择医生',
            trigger: 'blur'
          }]
        },
        times: [{
          id: 0,
          value: '9:00 - 10:00'
        }, {
          id: 1,
          value: '10:00 - 11:00'
        }, {
          id: 2,
          value: '11:00 - 12:00'
        }, {
          id: 3,
          value: '12:00 - 113:00'
        }],
        options: [{
          value: 1,
          label: '呼吸科',
          children: [{
            value: 2,
            label: '黄医生'
          }, {
            value: 3,
            label: '宋医生'
          }]
        }, {
          value: 4,
          label: '儿科',
          children: [{
            value: 5,
            label: '李医生'
          }, {
            value: 6,
            label: '陈医生'
          }, {
            value: 7,
            label: '赵医生'
          }]
        }],
        cateProps: { // 级联选择器属性
          expandTrigger: 'hover',
          label: 'label',
          value: 'value'
        }
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
    width: 80%;
  }

  .el-divider {
    height: 350px;
    margin: 25px 8px;
    background-color: #6d6d6d;
  }

  .el-cascader {
    overflow-x: hidden;
  }

  .el-card {
    float: right;
    width: 40%;
    height: 350px;
    margin: 30px;
  }
</style>
