<template>
  <div>
    <el-card>
      <span @click="return_records">返回</span>
      <div class="medrec_info">
        <el-row :gutter="20">
          <el-col :span="6"><p>科室：{{medrec.department_name}}</p></el-col>
          <el-col :span="18"><p>看病日期：{{medrec.attend_date}}</p></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><p>医生：{{medrec.doctor_name}}</p></el-col>
          <el-col :span="8"><p>医生电话：{{medrec.doctor_mobile}}</p></el-col>
          <el-col :span="10"><p>医生邮箱：{{medrec.doctor_email}}</p></el-col>
        </el-row>
        <div class="diagnosis">
          <p>病情：{{medrec.condition}}</p>
          <p>医嘱：{{medrec.advice}}</p>
        </div>
      </div>
      <el-table :data="medrec.drug" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="drug_name" label="药品名称" width="150px" align="center"></el-table-column>
        <el-table-column prop="drug_specification" label="药品规格" width="120px" align="center"></el-table-column>
        <el-table-column prop="drug_num" label="药品数量" width="100px" align="center"></el-table-column>
        <el-table-column prop="drug_effect" label="药品功效">
          <template slot-scope="scope">
            {{scope.row.drug_effect | conditionFormat}}
            <el-tooltip :content="scope.row.drug_effect" placement="top">
              <el-button v-if="scope.row.drug_effect.length > 50" icon="el-icon-more"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'detailed_record',
    data () {
      return {
        medrec_id: 0,
        medrec: {
          medrec_id: 0,
          patient_name: 'xxxx',
          attend_date: 'xxxx年xx月xx日',
          department_name: 'xxx',
          doctor_name: 'xxx',
          doctor_mobile: 'xxxxxx',
          doctor_email: 'xxxxxx',
          condition: 'xxxxxxx',
          advice: 'xxxx',
          drug: [
            {
              drug_id: 1,
              drug_name: 'xxx',
              drug_num: 2,
              drug_specification: '100ml/瓶',
              drug_effect: 'xxxxxxxxx'
            },
            {
              drug_id: 5,
              drug_name: 'xxx',
              drug_num: 1,
              drug_specification: '24粒/盒',
              drug_effect: 'xxxxxxxxx'
            }
          ]
        }
      }
    },
    created () {
      this.medrec_id = window.sessionStorage.getItem('medrec_id')
      if (!this.medrec_id) {
        this.$router.push('medical_record')
      } else {
        window.sessionStorage.removeItem('medrec_id')
        this.getMedrec()
      }
    },
    methods: {
      async getMedrec () {
        const { data: res } = await this.$http.get('patient/single-medrec', { params: { medrec_id: this.medrec_id } })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取单个病历详情失败')
        this.medrec = res.data
      },
      return_records () {
        this.$router.push('medical_record')
      }
    }
  }
</script>

<style lang="less" scoped>
  .medrec_info {
    display: flex;
    flex-direction: column;

    p {
      margin: 0 50px;
      padding: 5px;
    }

    .diagnosis {
      display: flex;
      flex-direction: column;
      flex: auto;
      order: 2;

      p {
        margin: 0 50px;
        padding: 5px;
      }
    }
  }

  .el-card {
    margin: 5px 20px;
  }

  /deep/ .el-table {
    width: 90%;
    left: 50%;
    transform: translate(-50%);

    td, th {
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .el-button {
    padding: 2px 5px;
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  span {
    float: left;
    font-size: 20px;
    text-shadow: 0 0 3px white;
    color: dodgerblue;
    margin: 0 15px;

    &:hover {
      cursor: pointer;
    }
  }
</style>
