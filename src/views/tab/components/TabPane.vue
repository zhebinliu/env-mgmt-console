<template>
  <iframe :src="source" />
</template>
<style>
#app, #app iframe {
  height: 100vh;
  width: 100%;
  border: none;
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>

<script>
import dashboard from '@/data/dashboard.json'
export default {
  data() {
    return {
      key: null,
      source: null
    }
  },
  created() {
    this.getURL()
  },
  methods: {
    getURL() {
      this.key = this.$route.query.tab
      console.log(this.key)
      console.log(dashboard[this.key])
      this.source = dashboard[this.key]
    }
  }
}

</script>
