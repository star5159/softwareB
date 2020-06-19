<template>
  <div>
    <el-card>
      <el-button type="success" @click="drawer = !drawer">选择药品</el-button>
    </el-card>
    <el-drawer title="搜索药品" :visible.sync="drawer" :with-header="false">
      <el-input placeholder="请输入内容" style="margin: 5px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="drugData" width="50px" :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="药品名" min-width="100px"></el-table-column>
        <el-table-column prop="specs" label="药品规格" min-width="100px"></el-table-column>
        <el-table-column prop="num" label="数量" min-width="100px">
          <el-input type="number"></el-input>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'diagnosis',
    data () {
      return {
        drawer: false,
        drugData: [{
          name: '药1',
          specs: '100ml/瓶',
          num: '一日三次'
        }, {
          name: '药2',
          specs: '100ml/瓶',
          num: '一日三次'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    height: 500px;
  }
</style>
