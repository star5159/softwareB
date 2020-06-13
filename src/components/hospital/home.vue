<template>
  <div class="home">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.img" alt="医院" class="hospital_img">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        imgList: [{
          id: 0,
          img: require('../../assets/hospital/hospital1.jpg')
        }, {
          id: 1,
          img: require('../../assets/hospital/hospital2.jpg')
        }, {
          id: 2,
          img: require('../../assets/hospital/hospital3.jpg')
        }, {
          id: 3,
          img: require('../../assets/hospital/hospital4.jpg')
        }, {
          id: 4,
          img: require('../../assets/hospital/hospital5.jpg')
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .hospital_img {
    width: 100%;
    height: 350px;
  }

  .carousel {
    width: 100%;
    height: 385px;
    background-color: #969896;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
