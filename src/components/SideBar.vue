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
    <div class="song_info__lyric" 
        v-if='onPlaySong.id'>
        <!-- <div class="song_info__lyric_box"> -->
            <div class="song_info__lyric_inner"
                :style='lyricInnerStyle'
                @mousedown='handleLyricDrag'
                id='lyric-inner'>
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
import { fetchSongDetail, fetchSongLyric } from '@/api';
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
            lyricItemIndex: -1,
            lyricDragPosY: 0
        }
    },
    watch:{
        onPlaySong(nv, ov){
            if((nv != ov)&&(nv.id != ov.id)){
                // document.getElementById('song-pic').src = '';
                fetchSongDetail(nv.id)
                .then( res => {
                    this.songPicSrc = res.data.songs[0].al.picUrl+'?param=300y300';
                })
                .catch( err => {
                    console.error(err.message);
                })
                fetchSongLyric(nv.id)
                .then( res => {
                    // console.log(res);
                    if(!res.data.nolyric){
                        const songLyricRes = res.data.lrc.lyric.split('\n');
                        const songLyricTranRes = res.data.tlyric.lyric ? res.data.tlyric.lyric.split('\n') : [];
                        let newSongLyricArray = [], newSongLyricTranArray = [];
                        let index = 0, indexTran = 0;
                        for(let i=0; i<songLyricRes.length; i++){
                            if((!songLyricRes[i].endsWith(']'))&&(songLyricRes[i].startsWith('['))){
                                newSongLyricArray[index++] = songLyricRes[i];
                            }
                        }
                        for(let i=0; i<songLyricTranRes.length; i++){
                            if((!songLyricTranRes[i].endsWith(']'))&&(songLyricTranRes[i].startsWith('['))){
                                newSongLyricTranArray[indexTran++] = songLyricTranRes[i];
                            }
                        }
                        this.songLyric = newSongLyricArray;
                        this.songLyricTran = newSongLyricTranArray;
                        this.setLyricStyle();
                    }else{
                        this.songLyric = [];
                        this.songLyricTran = [];
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
            let lyricTransformTop = -this.lyricItemIndex*28;
            return `transform: translateY(${lyricTransformTop}px)`;
        }
    },
    methods: {
        filterLyric(value){
            while((value.indexOf('[')!==-1)||(value.indexOf(']')!==-1)){
                value = value.slice(value.indexOf(']')+1);
            }
            while(value.indexOf())
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
                        document.getElementById('lyric-inner').style.top = '120px';
                        this.lyricDragPosY = 0;
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
        },
        handleLyricDrag(e){
            e.preventDefault();
            const disy = e.pageY - this.lyricDragPosY;
            const _this = this;
            // const lyricTop = document.getElementById('lyric-inner').getBoundingClientRect().top;
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmousedown = null;
            }
            document.onmousemove = function(ev){
                _this.lyricDragPosY = ev.pageY - disy;
                document.getElementById('lyric-inner').style.top = 120+_this.lyricDragPosY+'px';
                // console.log(lyricTop);
                // console.log(ev.pageY);
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
    cursor: grab;
    // overflow-x: hidden;
    // overflow-y: auto;
    mask-image: linear-gradient(to bottom,
    rgba(255,255,255,0) 0,
    rgba(255,255,255,.6) 15%,
    rgba(255,255,255,1) 25%,
    rgba(255,255,255,1) 75%,
    rgba(255,255,255,.6) 85%,
    rgba(255,255,255,0) 100%);    
    -webkit-mask-image: linear-gradient(to bottom,
    rgba(255,255,255,0) 0,
    rgba(255,255,255,.6) 15%,
    rgba(255,255,255,1) 25%,
    rgba(255,255,255,1) 75%,
    rgba(255,255,255,.6) 85%,
    rgba(255,255,255,0) 100%);
}
.song_info__lyric_inner{
    transition: -webkit-transform 0.1s ease-out 0s;
    position: relative;
    // top: 60px;
    // top: 150px;
    top: 120px;
    cursor: grab;
    p{
        margin: 5px auto;
    }
}
</style>