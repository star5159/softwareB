<template>
  <div>
    <el-card :class="Object.keys(info).length === 0 ? 'undefined' : ''">
      <span v-if="Object.keys(info).length === 0">暂无数据</span>
      <div v-else>
        <div class="head">
          <div class="information">
            <div class="doctor">
              <p>医生姓名：{{info.doctor_name}}</p>
              <p>性别：{{info.doctor_gender}}</p>
              <p>电话：{{info.doctor_mobile}}</p>
              <p>邮箱：{{info.doctor_email}}</p>
              <p>诊室固话：{{info.doctor_tel}}</p>
            </div>
            <div class="remainder" v-if="remainder">
              <p>上午：{{info.am_remainder}}</p>
              <p>下午：{{info.pm_remainder}}</p>
            </div>
          </div>
          <div class="head_photo">
            <img :src="info.doctor_photo" alt="头像">
          </div>
        </div>
        <div class="introduction">
          <p>个人简介：{{info.doctor_intro}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'doctor_info',
    props: ['info', 'remainder']
  }
</script>

<style lang="less" scoped>
  .el-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .undefined {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .head {
    display: flex;
    flex: auto;
    order: 1;
    width: 100%;
    height: 40%;

    .information {
      display: flex;
      width: 70%;
      flex-direction: column;

      .doctor {
        display: flex;
        order: 1;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;

        p {
          margin: 0 5px 0 0;
          padding: 5px;
        }
      }

      .remainder {
        display: flex;
        order: 2;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-around;

        p {
          margin: 0 5px 0 0;
          padding: 5px;
        }
      }

    }

    .head_photo {
      display: flex;
      order: 2;
      width: 30%;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit:cover
      }
    }
  }

  .introduction {
    display: flex;
    flex: auto;
    order: 2;
    width: 100%;
    height: 60%;

    p {
      margin: 0;
      padding: 5px;
    }
  }
</style>
