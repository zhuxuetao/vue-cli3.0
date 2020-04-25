<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link to="/list">List</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    this.$axios.post('5e99fa113c3c6e2c478c40b0/example/upload')
      .then(response => {
        console.log('-------response')
        console.log(response)
      })
  }
}
</script>
