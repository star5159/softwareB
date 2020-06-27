<template>
  <div></div>
</template>

<script>
  export default {
    name: 'detailed_record',
    data () {
      return {
        medrec_id: 0,
        medrec: {}
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
      }
    }
  }
</script>

<style scoped>

</style>
