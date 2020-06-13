<template>
  <div class="home_background">
    <header class="home_header">
      <span v-if="login_status">欢迎</span>
      <span v-else @click="login">登录</span>
      <h1>哈工大（深圳）医院</h1>
    </header>
    <nav>
      <el-menu background-color="#3c4457" text-color="#fff" active-text-color="dodgerblue" :default-active="activePath"
               mode="horizontal" :router="true" @select="saveNav">
        <el-menu-item index="/home">医院主页</el-menu-item>
        <el-menu-item index="/register">病人注册</el-menu-item>
        <el-menu-item index="/appointment">预约挂号</el-menu-item>
        <el-menu-item index="/medical_record">历史病历</el-menu-item>
      </el-menu>
    </nav>
    <div class="home_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homepage',
    data () {
      return {
        activePath: 'home',
        login_status: false
      }
    },
    created () {
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      login () {
        this.$router.push('/login')
      },
      saveNav (index) {
        window.sessionStorage.setItem('activePath', index)
        this.activePath = index
      }
    }
  }
</script>

<style lang="less" scoped>
  .home_background {
    height: 100%;
    /*width: 100%;*/
    position: relative;
    /*overflow-y: hidden;*/
  }

  .home_header {
    position: relative;
    height: 20%;
    background-image: url("../../assets/background.jpg");
    /*background-position: 0 -500px;*/
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }

  span {
    float: right;
    font-size: 20px;
    text-shadow: 0 0 3px white;
    color: dodgerblue;
    margin: 0 15px;

    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    height: 150px;
    line-height: 150px;
    color: white;
    text-shadow: 0 0 10px #6a6b6a;
    margin: 0 20px;
  }

  .home_container {
    width: 100%;
    height: 75%;
    position: relative;
  }

  .el-menu-item {
    font-size: 20px;
  }
</style>
