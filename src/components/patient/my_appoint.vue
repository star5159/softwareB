<template>
  <div>
    <h4>我的挂号信息</h4>
    <el-table :data="regData" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="reg_id" label="挂号流水号"></el-table-column>
      <el-table-column prop="department_name" label="科室名"></el-table-column>
      <el-table-column prop="doctor_name" label="医生名"></el-table-column>
      <el-table-column prop="reg_time" label="挂号时间"></el-table-column>
      <el-table-column prop="res_date" label="预约日期"></el-table-column>
      <el-table-column prop="period" label="预约时段"></el-table-column>
      <el-table-column prop="serial_num" label="预约排号"></el-table-column>
      <el-table-column prop="state" label="状态">
        <el-tag type="info" v-if="regData.state === 1">未到预约时段</el-tag>
        <el-tag v-else-if="regData.state === 2">等待叫号</el-tag>
        <el-tag type="warning" v-else-if="regData.state === 3">正在看病</el-tag>
        <el-tag type="success" v-else-if="regData.state === 4">已看病</el-tag>
        <el-tag type="danger">未看病</el-tag>
      </el-table-column>
      <el-table-column prop="amount" label="挂号费"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'my_appoint',
    data () {
      return {
        patient_id: 0,
        regData: []
      }
    },
    created () {
      this.patient_id = window.sessionStorage.getItem('patient_id')
      this.getRegList()
    },
    methods: {
      async getRegList () {
        const { data: res } = await this.$http.get('patient/reg-list', { params: { patient_id: this.patient_id } })
        console.log(res)
        this.regData = res.data
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .el-table td {
    text-align: center !important;
  }
  h4 {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
</style>
