<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8"><p>病人姓名：{{patientInfo.patient_name}}</p></el-col>
        <el-col :span="8"><p>出生日期：{{patientInfo.birthday}}</p></el-col>
        <el-col :span="8"><p>年龄：{{patientInfo.patient_age}}</p></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><p>病人性别：{{patientInfo.patient_gender}}</p></el-col>
        <el-col :span="8"><p>病人住址：{{patientInfo.address}}</p></el-col>
        <el-col :span="8"><p>挂号流水号：{{patientInfo.reg_id}}</p></el-col>
      </el-row>
      <div class="diagnosis">
        <el-form :model="diagnosisForm" :rules="diagnosisRule" ref="diagnosisRef" label-width="100px">
          <el-form-item prop="condition" label="病情">
            <el-input v-model="diagnosisForm.condition" :rows="5" type="textarea" maxlength="150"
                      show-word-limit></el-input>
          </el-form-item>
          <div class="bts">
            <el-button type="success" @click="prescription">选择药品</el-button>
          </div>
          <div class="form">
            <el-form-item prop="advice" label="医嘱">
              <el-input v-model="diagnosisForm.advice" :rows="5" type="textarea" maxlength="150"
                        show-word-limit></el-input>
            </el-form-item>
          </div>
          <div class="bts">
            <el-button type="primary" round @click="addMedical">添加病历</el-button>
            <el-button type="warning" round @click="patientLate">病人迟到</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-drawer title="搜索药品" :visible.sync="drawer" :with-header="false" size="'35%'">
      <el-input v-model="drug_page.drug_search" placeholder="请输入内容" style="margin: 5px;">
        <el-button slot="append" icon="el-icon-search" @click="prescription"></el-button>
      </el-input>
      <el-table :data="drugData" :stripe="true">
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="drug_name" label="药品名" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="drug_specification" label="药品规格" min-width="100px" align="center"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="num" label="数量" min-width="150px" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" size="mini" :min="0"
                             @change="addDrug(scope.row.drug_id,scope.row.num)"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="drug_page.page_num"
                     :page-sizes="[10, 15, 20]" :page-size="drug_page.page_size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <el-button class="bottom" type="primary" @click="drawer = false">确定</el-button>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'diagnosis',
    data () {
      return {
        doctor_id: 0,
        drug_page: {
          drug_search: '',
          page_num: 1,
          page_size: 10
        },
        total: 0,
        patientInfo: {
          patient_name: '',
          birthday: '',
          patient_age: '',
          patient_gender: '',
          address: '',
          reg_id: ''
        },
        drawer: false,
        drugData: [{
          drug_id: 1,
          drug_name: '药1',
          drug_specification: '100ml/瓶',
          num: 0
        }, {
          drug_id: 2,
          drug_name: '药2',
          drug_specification: '100ml/瓶',
          num: 0
        }],
        diagnosisForm: {
          patient_id: 0,
          reg_id: 0,
          advice: '',
          condition: '',
          drug: [{
            drug_id: 0,
            drug_num: 0
          }]
        },
        diagnosisRule: {
          advice: [{
            required: true,
            message: '请输入医嘱及药物用量',
            trigger: 'blur'
          }],
          condition: [{
            required: true,
            message: '请输入医嘱及药物用量',
            trigger: 'blur'
          }]
        }
      }
    },
    created () {
      this.doctor_id = window.sessionStorage.getItem('doctor_id')
      this.getPatientInfo()
    },
    methods: {
      async getPatientInfo () {
        const { data: res } = await this.$http.get('doctor/patient-info', { params: { doctor_id: this.doctor_id } })
        console.log(res)
        this.patientInfo = res.data
        this.diagnosisForm.patient_id = res.data.patient_id
        this.diagnosisForm.reg_id = res.data.reg_id
      },
      addMedical () {
        this.$refs.diagnosisRef.validate(async valid => {
          if (!valid) return
          if (this.diagnosisForm.drug.length > 0 && this.diagnosisForm.drug[0].drug_id === 0) {
            this.diagnosisForm.drug.shift()
          }
          console.log(this.diagnosisForm)
          const { data: res } = await this.$http.post('doctor/add-medrec', this.diagnosisForm)
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('添加病历失败')
          this.getPatientInfo()
        })
      },
      addDrug (id, num) {
        const index = this.findKey(id)
        if (!index) {
          this.diagnosisForm.drug.push({
            drug_id: id,
            drug_num: num
          })
        } else {
          if (num > 0) {
            this.diagnosisForm.drug[index - 1].drug_num = num
          } else {
            this.diagnosisForm.drug.splice(index - 1, 1)
          }
        }
      },
      findKey (key) { // 查找数组中含有关键key的对象，成功返回数组下标+1
        for (let i = 1; i <= this.diagnosisForm.drug.length; i++) {
          if (this.diagnosisForm.drug[i - 1].drug_id === key) {
            return i
          }
        }
        return false
      },
      handleSizeChange (newSize) {
        this.drug_page.page_size = newSize
        this.prescription()
      },
      handleCurrentChange (newPage) {
        this.drug_page.page_num = newPage
        this.prescription()
      },
      async prescription () {
        console.log(this.drug_page)
        const { data: res } = await this.$http.get('doctor/drug-list', { params: this.drug_page })
        console.log(res)
        this.drugData = res.data.drug
        this.total = res.data.total
        this.drawer = true
      },
      async patientLate () {
        const { data: res } = await this.$http.post('doctor/patient-late', { reg_id: this.diagnosisForm.reg_id })
        console.log(res)
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    position: relative;
    min-height: 500px;
  }

  /deep/ .el-drawer {
    height: 100%;
    overflow-y: auto;
  }

  p {
    margin: 5px 35px;
  }

  .el-form-item {
    margin: 20px 50px;
  }

  .el-pagination {
    margin: 0 0 5px 0;
  }

  .bottom {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 5px;
  }
</style>
