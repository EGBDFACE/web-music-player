<template>
<div class="mod_song_info">
    <div class="song_info__info">
        <div class="song_info__cover">
            <img class="song_info__pic"
                :src='songPicSrc'/>
        </div>
        <div class="song_info__name" v-if='onPlaySong.id'>
            <span>歌曲名：</span>
            <span class="info_clickable">{{onPlaySong.name}}</span>
        </div>
        <div class="song_info__singer" v-if='onPlaySong.id'>
            <span>歌手名：</span>
            <div v-for='(item,index) in onPlaySong.artists' 
                :key='index'
                style='display: inline'>
                <span class="info_clickable">{{item.name}}</span>
                <span v-if='index != onPlaySong.artists.length-1'>/ </span>
            </div>
        </div>
        <div class="song_info__album" v-if='onPlaySong.id'>
            <span>专辑名：</span>
            <span class="info_clickable">{{onPlaySong.album.name}}</span>
        </div>
    </div>
    <div class="song_info__lyric" v-if='onPlaySong.id'>
        <!-- <div class="song_info__lyric_box"> -->
            <div class="song_info__lyric_inner"
                :style='lyricInnerStyle'>
                <p v-for='(item,index) in songLyric'
                    :key='index'
                    :style='setLyricItemStyle(index)'
                    >{{filterLyric(item)}}</p>
            </div>
        <!-- </div> -->
        
    </div>
</div>
</template>

<script>
import { getSongDetail, getSongLyric } from '@/api';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'SideBar',
    data: function(){
        return{
            songPicSrc: require('@/assets/images/player_cover.png'),
            songLyric: [],
            songLyricTran: [],
            // lyricInnerStyle: '',
            // lyricItemStyle: undefined,
            lyricItemIndex: -1
        }
    },
    watch:{
        onPlaySong(nv, ov){
            if((nv != ov)&&(nv.id != ov.id)){
                // document.getElementById('song-pic').src = '';
                getSongDetail(nv.id)
                .then( res => {
                    this.songPicSrc = res.data.songs[0].al.picUrl+'?param=300y300';
                })
                .catch( err => {
                    console.error(err.message);
                })
                getSongLyric(nv.id)
                .then( res => {
                    console.log(res);
                    if(!res.data.nolyric){
                        this.songLyric = res.data.lrc.lyric.split('\n');
                        this.songLyricTran = res.data.tlyric.lyric ? res.data.tlyric.lyric.split('\n') : [];
                        this.setLyricStyle();
                    }
                    // console.log(this.songLyric);
                    // console.log(this.songLyricTran);
                })
                .catch( err => {
                    console.log(err.message);
                })
            }
        }
    },
    computed: {
        ...mapState({
            onPlayFlag: state => state.onPlayFlag,
            onPlaySong: state => state.onPlaySong,
            onPlaySongList: state => state.onPlay.onPlayList
        }),
        lyricInnerStyle(){
            let lyricTransformTop = -this.lyricItemIndex*20 - ((this.lyricItemIndex*1.1>8)?8:this.lyricItemIndex*1.1);
            return `transform: translateY(${lyricTransformTop}px)`;
        }
    },
    methods: {
        filterLyric(value){
            while((value.indexOf('[')!==-1)||(value.indexOf(']')!==-1)){
                value = value.slice(value.indexOf(']')+1);
            }
            return value;
        },
        setLyricStyle(){
            const audio = document.getElementsByTagName('audio')[0];
            setInterval( () => {
                // let lyricTransformTop = 0;
                for(let i=0; i<this.songLyric.length; i++){
                    let lyricTimeStr = this.songLyric[i].slice(1,this.songLyric[i].indexOf(']'));
                    let lyricMinute = parseInt(lyricTimeStr.slice(0,lyricTimeStr.indexOf(':')));
                    let lyricSecond = parseFloat(lyricTimeStr.slice(lyricTimeStr.indexOf(':')+1));
                    let lyricTime = lyricMinute*60+lyricSecond;
                    if((audio.currentTime>=lyricTime)&&(audio.currentTime-1<=lyricTime)){
                        this.lyricItemIndex = i;
                        // lyricTransformTop = -i*20;
                        break;
                    }
                }
                // this.lyricInnerStyle = `transform: translateY(${lyricTransformTop}px)`
            },1000)
        },
        setLyricItemStyle(index){
            if(index === this.lyricItemIndex){
                return 'color: #31c27c'
            }else{
                return undefined
            }
        }
    }
}
</script>

<style lang='scss'>
.mod_song_info{
    position: absolute;
    top: 0;
    right: 0;
    width: 340px;
    height: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
}
.song_info__info{
    width: 100%;
    height: 45%;
    overflow: hidden;
}
.song_info__cover{
    cursor: pointer;
    position: relative;
    display: block;
    width: 186px;
    height: 186px;
    margin: auto;
    &::after{
        content: '';
        position: absolute;
        left: 9px;
        top: 0;
        width: 201px;
        height: 180px;
        background: url('../assets/images/album_cover_player.png');
        background-repeat: no-repeat;
    }
}
.song_info__pic{
    vertical-align: middle;
    width: 186px;
    height: 186px;
}
.song_info__singer{
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 28px;
}
.song_info__name{
    @extend .song_info__singer;
    margin-top: 15px;
}
.song_info__album{
    @extend .song_info__singer;
}
.info_clickable{
    cursor: pointer;
    &:hover{
        color: #fff;
    }
}
.song_info__lyric{
    width: 100%;
    height: 45%;
    overflow: hidden;
    // overflow-x: hidden;
    // overflow-y: auto;
}
.song_info__lyric_inner{
    transition: -webkit-transform 0.1s ease-out 0s;
    position: relative;
    top: 20px;
    p{
        margin: 5px auto;
    }
}
</style>