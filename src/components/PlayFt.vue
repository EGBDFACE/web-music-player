<template>
    <div class="player__ft">
        <i class="btn_big_prev"></i>
        <i class="btn_big_play"></i>
        <i class="btn_big_next"></i>
        <div class="player_music">
            <div class="player_music__info" v-if="Object.keys(onPlaySong).length != 0">
                <span class="info__name">{{onPlaySong.name}}</span>
                <span> - </span>
                <div v-for="(item,index) in onPlaySong.artists" :key="index" class="info__artists">
                    <span class="info__artist__name">{{item.name}}</span>
                    <span v-if="index != onPlaySong.artists.length-1"> / </span>
                </div>
            </div>
            <div class="player_music__time" v-if="Object.keys(onPlaySong).length != 0">
                <span>{{timer}}</span>
                <span> / </span>
                <span>{{duration}}</span>
            </div>
            <div class="player_grogress">
                <div class="player_progress__inner">
                    <div class="player_progress__load"></div>
                    <div class="player_progress__play" style="width: 0%">
                        <i class="player_progress__dot"></i>
                    </div>
                </div>
            </div>
        </div>
        <i class="btn_big_style_list"></i>
        <i class="btn_big_like"></i>
        <i class="btn_big_down"></i>
        <div class="mod_btn_comment"></div>
        <i class="btn_big_only"></i>
        <div class="palyer_progress player_voice">
            <i class="btn_big_voice"></i>
            <div class="player_progress__inner">
                <div class="player_progress__play">
                    <i class="player_progress__dot"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayFt',
    data: function(){
        return {
            timer: '00:00'
        }
    },
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
            if(value){
                let minute = Math.floor((value/1000)/60);
                let second = Math.floor(value/1000) - minute*60;
                let sMinute = minute<10 ? '0'+minute : minute;
                let sSecond = second<10 ? '0'+second : second;
                return sMinute + ':' + sSecond;
            }else{
                return '00:00'
            }
            
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
.player_grogress{
    padding-top: 6px;
    height: 8px;
    cursor: pointer;
}
.player_progress__inner{
    position: relative;
    height: 2px;
    background: rgba(255,255,255,.1);
} 
.player_progress__load{
    height: 2px;
    background: rgba(255,255,255,.2);
}   
.player_progress__play{
    position: absolute;
    top: 0;
    height: 2px;
    background: rgba(255,255,255,.7);
}
.player_progress__dot{
    position: absolute;
    top: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    background-position: 0 -170px;
    @include btn_big_common();
    opacity: 1;
}
.btn_big_style_list{
    @include btn_big_common();
    position: absolute;
    top: 4px;
    right: 378px;
    width: 26px;
    height: 25px;
    background-position: 0 -205px;
}
.btn_big_like{
    @include btn_big_common();
    position: absolute;
    top: 4px;
    right: 330px;
    width: 23px;
    height: 21px;
    background-position: 0 -96px;
}
.btn_big_down{
    @include btn_big_common();
    position: absolute;
    top: 4px;
    right: 286px;
    width: 22px;
    height: 21px;
    background-position: 0 -120px;
}
.mod_btn_comment{
    position: absolute;
    top: 3px;
    
}
</style>
