<template>
    <div>
        <h1>web music player</h1>
        <router-link to='/OnPlayList'>正在播放</router-link>
        <router-link to='/Recommand'>推荐</router-link>
        <router-link to='/Search'>搜索</router-link>
        <router-link to='/MyPlayList'>我的歌单</router-link>
        <router-link to='/MyFootprint'>我听过的</router-link>
    </div>   
</template>
<script>
export default{
    name: 'TopNav'
}
</script>