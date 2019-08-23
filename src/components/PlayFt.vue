<template>
    <div class="player__ft">
        <audio :src="songUrl"
            ref="refAudio"
            preload="none"
            autoplay
            @ended='next()'
            />
        <i class="btn_big_prev"
            @click='previous()'
            />
        <!-- <i class="btn_big_play"></i> -->
        <i class="btn_big_play" 
            v-if='!onPlayFlag'
            @click='play()'
            />
        <i class="btn_big_pause" v-else 
            @click='pause()'
            />
        <i class="btn_big_next"
            @click='next()'
            />
        <div class="player_music">
            <div class="player_music__info" v-if="Object.keys(onPlaySong).length != 0">
                <!-- <span class="info__name">{{onPlaySong.name}}</span> -->
                <span>{{onPlaySong.name}}</span>
                <span> - </span>
                <div v-for="(item,index) in onPlaySong.artists" :key="index" class="info__artists">
                    <span class="info__artist__name"
                        @click="MHandleArtistClick(item)">{{item.name}}</span>
                    <span v-if="index != onPlaySong.artists.length-1"> / </span>
                </div>
            </div>
            <div class="player_music__time" v-if="Object.keys(onPlaySong).length != 0">
                <span>{{timer}}</span>
                <span> / </span>
                <span>{{duration}}</span>
            </div>
            <div class="player_progress">
                <div class="player_progress__inner">
                    <div class="player_progress__load"
                        id='progress_bar'
                        @click='handleProgressClick'
                        />
                    <div class="player_progress__play" 
                        :style='progressStyle'
                        @click='handleProgressClick'>
                        <i class="player_progress__dot"
                            @mousedown='handleProgressDrag'
                            />
                    </div>
                </div>
            </div>
        </div>
        <i class="btn_big_style_list" 
            @click="MChangePlayMod()"
            :style="CPlayModStyle" />
        <i class="btn_big_like" />
        <i class="btn_big_down" />
        <a :class="CCommentClass"
            href="#/comment">
            <span class="btn_comment__numbers">{{commentsNumber}}</span>
        </a>
        <i class="btn_big_only" />
        <div class="player_progress player_voice">
            <i class="btn_big_voice" 
                :style="CVoiceIconStyle"
                @click="MHandleVoiceIconClick()" />
            <div class="player_progress__inner">
                <div class="player_progress__load"
                    id='voice_bar'
                    @click='handleVoiceClick'
                    />
                <div class="player_progress__play"
                    :style='voiceStyle'
                    @click='handleVoiceClick'>
                    <i class="player_progress__dot"
                        @mousedown='handleVoiceDrag'
                        />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import { mapActions,mapState } from 'vuex';
import { fetchArtistSongs, fetchComment, fetchSongAudio } from '@/api';
import { createHotSongList } from '@/utils/song';
import { createComments } from '@/utils/comment';
// import { BASE_URL } from '@/assets/constant.js';

export default {
    name: 'PlayFt',
    data: function(){
        return {
            commentsNumber: undefined,
            progressStyle: '',
            // progressPosPrev: 0,
            song: {},
            songUrl: '',
            timer: '00:00',
            voiceStyle: 'width: 50%',
            volume: 0.5,
            playMod: 'list',
            voiceMuteFlag: false
        }
    },
    mounted(){
        this.song = this.onPlaySong;
        // this.$refs.refAudio.onloadedmetadata = function(){
        //     const eleAudio = document.getElementsByTagName('audio')[0];
        //     console.log(eleAudio);
            
        // }
        // this.$refs.refAudio.onended = this.next();
    },
    watch:{
        // song:{
        //     deep: true,
        //     handle(val){
        //         console.log(val);
        //     }
        // }
        onPlaySong(nv, ov){
            // deep: true,
            if((nv != ov)&&(nv.id != ov.id)){
                // console.log(nv);
                // console.log(ov);
                this.setHistoryList(nv);
                this.song = nv;
                // axios({
                //     method: 'get',
                //     baseURL: BASE_URL,
                //     url: `/song/url?id=${this.song.id}`
                // })
                fetchSongAudio(nv.id)
                .then( res => {
                    this.songUrl = res.data.data[0].url;
                    this.setProgress();
                    if (this.voiceMuteFlag) {
                        this.$refs.refAudio.volume = 0;
                    } else {
                        this.$refs.refAudio.volume = this.volume;
                    }
                })
                .catch( err => {
                    console.error(err.message);
                })
                fetchComment (nv.id, 0,0) 
                .then ( res=> {
                    this.commentsNumber = res.data.total;
                    this.setComments(createComments(res.data,nv.id));
                    if (res.data.total < 1) {
                        this.commentsNumber = undefined;
                    }
                })
                .catch (err => {
                    console.error(err.message);
                })
            }
        }
    },
    methods: {
        ...mapActions([
            'setComments',
            'setPlayFlag',
            'setPlaySong',
            'setHistoryList',
            'setSearchContext',
            'setSearchLoadingFlag',
            'setSearchResult'
        ]),
        play(){
            if(this.onPlaySong.id){
                // this.$refs.refAudio.play();
                let playPromise = this.$refs.refAudio.play();
                // console.log(playPromise);
                if(playPromise !== undefined){
                    playPromise.then(() => {
                        this.setPlayFlag(true);
                    })
                    .catch(function(error){
                        console.error(error.message);
                    })
                }
            }
        },
        pause(){
            if(this.onPlaySong.id){
                this.$refs.refAudio.pause();
                this.setPlayFlag(false);
                // let pausePromise = this.$refs.refAudio.pause();
                // console.log(pausePromise); // undefined
                // if(pausePromise !== undefined){
                //     pausePromise.then(() => {
                //         console.log('pause');
                //         console.log(this);
                //         this.setPlayFlag(false);
                //     })
                //     .catch(function(error){
                //         console.error(error.message);
                //     })
                // }
            }
        },
        MHandleArtistClick(artist){
            if(this.$router.path !== '/search'){
                this.$router.push('/search');
            }
            this.setSearchResult([]);
            this.setSearchContext(artist.name);
            this.setSearchLoadingFlag(true);
            fetchArtistSongs(artist.id)
            .then( res => {
                createHotSongList(res.data.hotSongs)
                .then( result => {
                    this.setSearchLoadingFlag(false);
                    this.setSearchResult(result);
                })
                .catch( err => {
                    console.log(err.message);
                    this.setSearchLoadingFlag(false);
                })
            })
        },
        // next(){
        //     const list = this.onPlaySongList;
        //     const song = this.onPlaySong;
        //     for(let i=0; i<list.length; i++){
        //         if(song.id === list[i].id){
        //             if(list.length === 1){
        //                 this.$refs.refAudio.currentTime = 0;
        //                 this.$refs.refAudio.play();
        //             }
        //             if(i === list.length-1){
        //                 this.setPlaySong(list[0]);
        //             }else{
        //                 this.setPlaySong(list[i+1]);
        //                 break;
        //             }
        //         }
        //     }
        // },
        // previous(){
        //     const list = this.onPlaySongList;
        //     const song = this.onPlaySong;
        //     for(let i=0; i<list.length; i++){
        //         if(song.id === list[i].id){
        //             if(list.length === 1){
        //                 this.$refs.refAudio.currentTime = 0;
        //                 break;
        //             }
        //             if(i === 0){
        //                 this.setPlaySong(list[list.length-1]);
        //             }else{
        //                 this.setPlaySong(list[i-1]);
        //             }
        //             break;
        //         }
        //     }
        // },
        setProgress(){
            const audio = this.$refs.refAudio;
            this.timer = '00:00';
            this.progressStyle = 'width: 0%';
            setInterval( ()=>{ // 箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者
                let newTimer = '';
                if(audio.currentTime < 60){
                    this.timer = '00:' + this.convertNumber(Math.floor(audio.currentTime));
                }else{
                    this.timer = this.convertNumber(Math.floor(audio.currentTime/60))+':'+this.convertNumber(Math.floor(audio.currentTime%60));
                }
                this.progressStyle = 'width:' + (audio.currentTime/audio.duration)*100 + '%';
            },1000);
        },
        convertNumber(value){
            if(value<10){
                return '0'+value
            }else{
                return value.toString()
            }
        },
        handleProgressClick(e){
            // console.log(e);
            const progressPosLeft = document.getElementById('progress_bar').getBoundingClientRect().left;
            const progressLength = document.getElementById('progress_bar').getBoundingClientRect().width;
            const clickPosX = e.pageX;
            const percent = (clickPosX-progressPosLeft)/progressLength;
            this.$refs.refAudio.currentTime = percent * this.$refs.refAudio.duration;
            this.progressStyle = 'width:' + percent*100 + '%';
        },
        handleProgressDrag(e){
            // console.log('drag');
            e.preventDefault();
            const progressPosLeft = document.getElementById('progress_bar').getBoundingClientRect().left;
            const progressLength = document.getElementById('progress_bar').getBoundingClientRect().width;
            // const disx = e.pageX - this.progressPosPrev || 0;
            // console.log(disx);
            const _this = this;
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmousedown = null;
            }
            document.onmousemove = function(ev){
                // _this.progressPosPrev = ev.pageX - disx;
                const pos = ev.pageX - progressPosLeft;
                // const percent = (_this.progressPosPrev/progressLength);
                const percent = pos/progressLength;
                _this.$refs.refAudio.currentTime = percent * _this.$refs.refAudio.duration;
                _this.progressStyle = 'width:' + percent*100 + '%';
            }
        },
        handleVoiceClick(e){
            this.voiceMuteFlag = false;
            const voicePosLeft = document.getElementById('voice_bar').getBoundingClientRect().left;
            const voiceLength = document.getElementById('voice_bar').getBoundingClientRect().width;
            const clickPosX = e.pageX;
            const percent = (clickPosX-voicePosLeft)/voiceLength;
            this.$refs.refAudio.volume = percent;
            this.volume = percent;
            this.voiceStyle = 'width:' + percent*100 + '%';
        },
        handleVoiceDrag(e){
            e.preventDefault();
            this.voiceMuteFlag = false;
            const voicePosLeft = document.getElementById('voice_bar').getBoundingClientRect().left;
            const voiceLength = document.getElementById('voice_bar').getBoundingClientRect().width;
            const _this = this;
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmousedown = null;
            }
            document.onmousemove = function(ev){
                const pos = ev.pageX - voicePosLeft;
                const percent = pos/voiceLength;
                if((percent<=1)&&(percent>=0)){
                    _this.$refs.refAudio.volume = percent;
                    _this.volume = percent;
                    _this.voiceStyle = 'width:' + percent*100 + '%';
                }
            }
        },
        MChangePlayMod(){
            const modList = ['list','single','order','random'];
            const index = modList.indexOf(this.playMod);
            if(index === modList.length-1){
                this.playMod = 'list';
            }else{
                this.playMod = modList[index+1];
            }
        },
        // MHandleAudioEnded(){
        next(){
            const list = this.onPlaySongList;
            const song = this.onPlaySong;
            switch(this.playMod){
                case 'list':
                    // this.next();
                    for(let i=0; i<list.length; i++){
                        if(song.id === list[i].id){
                            if(list.length === 1){
                                this.$refs.refAudio.currentTime = 0;
                                this.$refs.refAudio.play();
                            }
                            if(i === list.length-1){
                                this.setPlaySong(list[0]);
                            }else{
                                this.setPlaySong(list[i+1]);
                                break;
                            }
                        }
                    }
                    break;
                case 'single':
                    this.$refs.refAudio.currentTime = 0;
                    this.$refs.refAudio.play();
                    break;
                case 'order':
                    for(let i=0; i<list.length; i++){
                        if(song.id === list[i].id){
                            if((list.length === 1)||(i === list.length-1)){
                                this.$refs.refAudio.currentTime = 0;
                                this.$refs.refAudio.pause();
                                this.setPlayFlag(false);
                            }else{
                                this.setPlaySong(list[i+1]);
                                break;
                            }
                        }
                    }
                    break;
                case 'random':
                    const newSongIndex = Math.floor(Math.random()*list.length);
                    const newSong = list[newSongIndex];
                    this.setPlaySong(newSong);
                    break;
            }
        },
        previous(){
            const list = this.onPlaySongList;
            const song = this.onPlaySong;
            switch(this.playMod){
                case 'list':
                    for(let i=0; i<list.length; i++){
                        if(song.id === list[i].id){
                            if(list.length === 1){
                                this.$refs.refAudio.currentTime = 0;
                                this.$refs.refAudio.play();
                            }
                            if(i === 0){
                                this.setPlaySong(list[list.length-1]);
                                break;
                            }else{
                                this.setPlaySong(list[i-1]);
                                break;
                            }
                        }
                    }
                    break;
                case 'single':
                    this.$refs.refAudio.currentTime = 0;
                    this.$refs.refAudio.play();
                    break;
                case 'order':
                    for(let i=0; i<list.length; i++){
                        if(song.id === list[i].id){
                            if((list.length === 1)||(i === 0)){
                                this.$refs.refAudio.currentTime = 0;
                                this.$refs.refAudio.pause();
                                this.setPlayFlag(false);
                            }else{
                                this.setPlaySong(list[i-1]);
                                break;
                            }
                        }
                    }
                    break;
                case 'random':
                    const newSongIndex = Math.floor(Math.random()*list.length);
                    const newSong = list[newSongIndex];
                    this.setPlaySong(newSong);
                    break;
            }
        },
        MHandleVoiceIconClick(){
            this.voiceMuteFlag = !this.voiceMuteFlag;
            if(this.voiceMuteFlag){
                this.$refs.refAudio.volume = 0;
            }else{
                this.$refs.refAudio.volume = this.volume;
            }
        }
    },
    computed: {
        ...mapState({
            onPlayFlag: state => state.onPlayFlag,
            onPlaySong: state => state.onPlaySong,
            onPlaySongList: state => state.onPlay.onPlayList
        }),
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
        },
        CPlayModStyle(){
            switch(this.playMod){
                case 'list':
                    return undefined;
                case 'single':
                    return {
                        backgroundPosition: '0 -232px'
                    }
                case 'order':
                    return {
                        backgroundPosition: '0 -260px'
                    }
                case 'random':
                    return {
                        backgroundPosition: '0 -74px'
                    }
                default: return undefined
            }
        },
        CVoiceIconStyle(){
            if(this.voiceMuteFlag){
                return {
                    backgroundPosition: '0 -182px'
                }
            }else{
                return undefined
            }
        },
        CCommentClass() {
            let className = 'mod_btn_comment';
            if (!this.commentsNumber) {
                return className;
            }
            if (this.commentsNumber < 100) {
                className += ' '+'btn_comment__9';
                return className;
            } else {
                if (this.commentsNumber > 999) {
                    this.commentsNumber = '999+';
                }
                className += ' '+'btn_comment__99';
                return className;
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
.btn_big_pause{
    @extend .btn_big_play;
    background-position: -30px 0;
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
.player_progress{
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
    // pointer-events: none;
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
    // height: 25px;
    height: 22px;
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
    right: 237px;
    width: 24px;
    height: 24px;
    background-position: 0 -400px;
    @include btn_big_common();
    &:hover{
        background-position: 0 -460px;
        color: #31c27c;
    }
}
.btn_comment__9 {
    background-position: -30px -400px;
    &:hover {
        background-position: -30px -460px;
    }
    .btn_comment__numbers {
        text-align: left;
        left: 16px;
    }
}
.btn_comment__99 {
    background-position: 0 -430px;
    &:hover {
        background-position: 0 -490px;
    }
    .btn_comment__numbers {
        text-align: left;
        left: 11px;
    }
}
.btn_comment__numbers {
    position: absolute;
    top: -3px;
    right: 0;
    white-space: nowrap;
    text-align: right;
    height: 8px;
    line-height: 8px;
}
.btn_big_only{
    top: 3px;
    right: 137px;
    width: 74px;
    height: 26px;
    background-position: 0 -282px;
    position: absolute;
    @include btn_big_common();
}
.player_voice{
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    padding-top: 13px;
}
.btn_big_voice{
    top: 4px;
    left: -38px;
    width: 26px;
    height: 21px;
    background-position: 0 -144px;
    position: absolute;
    @include btn_big_common();
}
</style>
