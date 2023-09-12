<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 2" />
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.name.toLowerCase())
  }
}
</script>
