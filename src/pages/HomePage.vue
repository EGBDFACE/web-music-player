<template>
    <div class="content_page_fill">
        <TopNav/>
        <div class="mod_player">
            <div class="player__bd">
                <div class="player_style_normal">
                    <div class="mod_song_toolbar">
                        <!-- <router-link to='/OnPlayList' :class="{route_active: (nowRoute === 'OnPlayList')}" @click="setRoute('OnPlayList')">正在播放</router-link> -->
                        <!-- <router-link to='/Recommand' :class="{route_active: (nowRoute === 'Recommand')}" @click="setRoute('Recommand')">推荐</router-link> -->
                        <router-link to='/OnPlayList'>正在播放</router-link>
                        <router-link to='/Recommand'>推荐</router-link>
                        <router-link to='/Search'>搜索</router-link>
                        <router-link to='/MyPlayList'>我的歌单</router-link>
                        <router-link to='/MyFootprint'>我听过的</router-link>
                    </div>
                    <router-view/>
                    <SideBar/>
                </div>
            </div>
            <div class="player__ft">
                <i class="btn_big_prev"></i>
                <i class="btn_big_play"></i>
                <i class="btn_big_next"></i>
                <div class="player_music">
                    <div class="player_music__info">
                        <span></span>
                        <span>-</span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TopNav from '@/components/TopNav';
import SideBar from '@/components/SideBar';

export default {
    name: 'HomePage',
    // data:function(){
    //     return{
    //         nowRoute:''
    //     }
    // },
    components: {
        TopNav, SideBar
    },
    // computed: {
    //     nowRoute: function(){
    //         return this.nowRoute;
    //     }
    // },
    // computed:{
    //     nowRoute: ()=>document.location.hash.slice(document.location.hash.indexOf('/')+1)
    // }
    // methods: {
    //     setRoute: function(thisRoute){
    //         this.nowRoute = thisRoute;
    //     }
    // }
}
</script>

<style lang="scss">
.mod_player{
    height: 100%;
    margin: 0 7.638889%;
    position: relative;
    z-index: 3;
}
.mod_player, .mod_player a{
    color: #bdbdbe;
    color: rgba(225,225,225,.8);
} 
.player__bd {
    position: absolute;
    top: 11%;
    bottom: 18%;
    width: 100%;
    min-height: 328px;
    cursor: default;
}
.player_style_normal {
    margin-right: 440px;
}
@media (max-width: 1300px){
  .player_style_normal{
      margin-right: 280px;
  }  
}

.mod_song_toolbar{
    position: relative;
    margin-bottom: 20px;
    font-size: 0;
    margin-left: 1px;
    text-align: start;
}
.mod_song_toolbar  a:hover, .mod_song_toolbar .router-link-exact-active{
    opacity: 1;
    border-color: rgba(255,255,255,1);
}
.mod_song_toolbar  a{
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #c9c9c9;
    border-color: rgba(255,255,255,.2);
    opacity: .8;
    min-width: 122px;
    text-align: center;
}
.player__ft{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 11%;
}
@mixin btn_big_common{
    background-image : url('../assets/images/icon_player2X.png');
    background-size : 132px;
    cursor: pointer;
    opacity: .8;
    &:hover{
        opacity: 1;
    }
}
.btn_big_prev{
    @include btn_big_common();
    position: absolute;
    top: 4px;
    left: 0;
    width: 19px;
    height: 20px;
    background-position: 0 -30px;
}
.btn_big_play{
    @include btn_big_common();
    position: absolute;
    top: 0;
    left: 65px;
    width: 21px;
    height: 29px;
    background-position: 0 0;
}
.btn_big_next{
    @include btn_big_common();
    position: absolute;
    top: 4px;
    left: 132px;
    width: 19px;
    height: 20px;
    background-position: 0 -52px;
}
.player_mucic{
    position: relative;
    margin: 0 448px 0 208px;
}
.player_music__info{
    padding-right: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>