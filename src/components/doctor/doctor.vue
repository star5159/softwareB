<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img :src="logoImg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--预留加上△折叠图案，折叠加上动画延时-->
        <div class="foldMenu" @click="collapseMenu"></div>
        <el-menu :default-active="activePath" :collapse-transition="false" :collapse="isCollapse"
                 background-color="#545c64" text-color="#fff" :router="true" @select="saveNav">
          <el-menu-item index="personal">
            <i class="iconfont">&#xe63e;</i>
            <span slot="title">个人主页</span>
          </el-menu-item>
          <el-menu-item index="diagnosis">
            <i class="iconfont">&#xe63f;</i>
            <span slot="title">看病诊断</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // import iconfont from '../../assets/fonts/iconfont'
  export default {
    name: 'doctor',
    data () {
      return {
        isCollapse: false,
        activePath: '',
        logoImg: require('../../assets/hospital/hospital_logo.png')
      }
    },
    created () {
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      quit () { // 登出
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      collapseMenu () { // 改变菜单栏折叠状态
        this.isCollapse = !this.isCollapse
      },
      saveNav (activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: dodgerblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 2;

    div {
      display: flex;
      align-items: center;

      span {
        color: white;
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }

  img {
    width: 60px;
    height: 60px;
  }

  .el-aside {
    background-color: #545c64;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    z-index: 1;

    .el-menu {
      border-right: 0;

      .el-menu-item i {
        color: white;
      }
    }
  }

  .el-main {
    background-color: #bddde6;
  }

  .iconfont {
    margin-right: 10px;
  }

  .foldMenu {
    height: 20px;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
