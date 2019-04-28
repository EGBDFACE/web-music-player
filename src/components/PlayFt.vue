<template>
    <div class="player__ft">
        <i class="btn_big_prev"></i>
        <i class="btn_big_play"></i>
        <i class="btn_big_next"></i>
        <div class="player_music">
            <div class="player_music__info">
                <span class="info__name">{{onPlaySong.name}}</span>
                <span> - </span>
                <div v-for="(item,index) in onPlaySong.artists" :key="index" class="info__artists">
                    <span class="info__artist__name">{{item.name}}</span>
                    <span v-if="index != onPlaySong.artists.length-1"> / </span>
                </div>
            </div>
            <div class="plarer_music__time">
                <span>{{time}}</span>
                <span> / </span>
                <span>{{duration}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayFt',
    methods: {
    },
    computed: {
        onPlaySong(){
            return this.$store.state.onPlaySong;
        },
        time(){

        },
        duration(){
            let value = this.$store.state.onPlaySong.duration;
            let minute = Math.floor((value/1000)/60);
            let second = Math.floor(value/1000) - minute*60;
            let sMinute = minute<10 ? '0'+minute : minute;
            let sSecond = second<10 ? '0'+second : second;
            return sMinute + ':' + sSecond;
        }
    }
}
</script>

<style lang="scss">
.player__ft{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 11%;
}
@mixin btn_big_common{
    background-image: url('../assets/images/icon_player2X.png');
    background-size: 132px;
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
.player_music{
    position: relative;
    margin: 0 448px 0 208px;
}
.player_music__info{
    padding-right: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.info__artists{
    display: inline;   
}
.info__artist__name{
    cursor: pointer;
    &:hover{
        color: #fff;
    }
}
.info__name{
    @extend .info__artist__name;        
}
.player_music__time{
    position: absolute;
    top: 0;
    right: 0;
}    
</style>
