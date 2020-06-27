<template>
  <div>
    <el-card>
      <p>{{patient_name}}的历史病历</p>
      <el-table :data="records" :stripe="true" border>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="medrec_id" label="病历号" width="80px" align="center"></el-table-column>
        <el-table-column prop="attend_date" label="看病时间" width="100px" align="center"></el-table-column>
        <el-table-column prop="department_name" label="就诊科室" width="100px" align="center"></el-table-column>
        <el-table-column prop="doctor_name" label="就诊医生" width="100px" align="center"></el-table-column>
        <el-table-column prop="condition" label="病情" header-align="center">
          <template slot-scope="scope">
            {{scope.row.condition | conditionFormat}}
            <el-tooltip :content="scope.row.condition" placement="top">
              <el-button v-if="scope.row.condition.length > 50" icon="el-icon-more"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="详细" width="100px" align="center">
          <template slot-scope="scope">
            <el-link @click="router(scope.row.medrec_id)" type="primary">查看详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'medical_record',
    data () {
      return {
        patient_id: 0,
        patient_name: '',
        records: [{
          medrec_id: 1,
          attend_date: '2020-01-01 10:05:33',
          department_name: '儿科',
          doctor_name: '黄医生',
          condition: '病情病情病情病情病情病情病情病情病情病情病情病情'
        }, {
          medrec_id: 2,
          attend_date: '2020-01-03 14:25:13',
          department_name: '儿科',
          doctor_name: '宋医生',
          condition: '病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情病情'
        }]
      }
    },
    created () {
      window.sessionStorage.setItem('activePath', '/medical_record')
      this.patient_id = window.sessionStorage.getItem('patient_id')
      this.patient_name = window.sessionStorage.getItem('patient_name')
      this.get_medrec_list()
    },
    methods: {
      async get_medrec_list () {
        const { data: res } = await this.$http.get('patient/all-medrec', { params: { patient_id: this.patient_id } })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取病历列表失败')
      },
      router (id) {
        console.log(id)
        window.sessionStorage.setItem('medrec_id', id)
        this.$router.push('detailed_record')
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    margin: 20px;
  }

  p {
    margin: 5px;
    display: flex;
    justify-content: center;
    font-weight: bolder;
  }

  .el-table {
    margin: 10px 0;
  }

  .el-button {
    padding: 2px 5px;
  }

  .el-table--border {
    border: 0.5px solid rgba(0, 0, 0, 0.2);
  }
</style>
