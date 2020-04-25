<template>
  <div class="Loading">
    <van-overlay :show="true">
      <div class="wrapper">
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
  name: 'Loading',
  computed: {
    ...mapState('guangda/loading', [
      'LoadingIsShow'
    ])
  }
}
</script>
<style lang="scss" scoped>
.Loading {
   .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
