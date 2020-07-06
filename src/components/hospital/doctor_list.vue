<template>
  <div>
    <h4>欢迎浏览医生列表</h4>
    <el-form>
      <el-form-item label="选择科室">
        <el-select v-model="browse.department_id" placeholder="请选择科室" @change="departmentChange">
          <el-option v-for="item in department" :key="item.department_id" :label="item.department_name"
                     :value="item.department_id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <DoctorList class="doctor" v-for="item in doctor_list" :key="item.doctor_id" :info="item"
                  :remainder="false"></DoctorList>
    </div>
    <div class="message">
      <p v-if="loading">加载中...</p>
      <p v-if="at_end && !loading">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import DoctorList from '../patient/doctor_info.vue'

  export default {
    name: 'doctor_list',
    components: { DoctorList },
    data () {
      return {
        browse: {
          department_id: '',
          total: 0,
          add_num: 2
        },
        department: {
          department_id: 0,
          department_name: ''
        },
        doctor_list: [],
        loading: false,
        at_end: false
      }
    },
    created () {
      this.getDepartment()
    },
    methods: {
      async getDepartment () {
        const { data: res } = await this.$http.get('patient/department-list')
        if (res.meta.status !== 200) return this.$message.error('获取科室列表失败')
        this.department = res.data
      },
      async getDoctorList () {
        const { data: res } = await this.$http.get('home/doctor-list', { params: this.browse })
        console.log(res)
        if (res.data.doctor.length > 0) {
          this.doctor_list.push(...res.data.doctor)
        }
        this.browse.total = res.data.total
        this.at_end = res.data.at_end
      },
      departmentChange () {
        this.browse.total = 0
        this.doctor_list = []
        this.getDoctorList()
      },
      load () {
        this.loading = true
        setTimeout(() => {
          this.getDoctorList()
          this.loading = false
        }, 1000)
      }
    },
    computed: {
      disabled () {
        return this.loading || this.at_end
      }
    }
  }
</script>

<style lang="less" scoped>
  h4 {
    display: flex;
    justify-content: center;
    margin: 10px;
  }

  .el-form-item {
    margin: 10px 30px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .doctor {
      display: flex;
      width: 45%;
      height: 350px;
      margin: 20px;
    }
  }

  .message {
    display: flex;
    align-content: flex-end;
    justify-content: center;

    p {
      display: flex;
      justify-content: center;
      margin: 10px;
    }
  }
</style>
