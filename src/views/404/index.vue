<template>
    <div class="error_404">
        <img src="~images/error_404.png" alt="" class="error_img">
        <router-link class="back_home" to="">
            返回首页
        </router-link>
    </div>
</template>
<script>
export default {}
</script>
<style scoped lang="scss">
    .error_404 { text-align: center; margin-top: 220px;}
    .error_img { display: inline-block; width: 396px; height: 348px;}
    .back_home { display: block; margin: 100px 70px;}
</style>
