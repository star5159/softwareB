<template>
  <div>
    <el-card>
      <el-button type="success" @click="drawer = !drawer">选择药品</el-button>
    </el-card>
    <el-drawer title="搜索药品" :visible.sync="drawer" :with-header="false" size="'35%'">
      <el-input placeholder="请输入内容" style="margin: 5px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="drugData" :stripe="true">
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="name" label="药品名" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="specs" label="药品规格" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="num" label="数量" min-width="150px" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" size="mini"></el-input-number>
          </template>
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
          num: 0
        }, {
          name: '药2',
          specs: '100ml/瓶',
          num: 0
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
