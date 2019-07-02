<template>
    <div class="recommand">
       <h2 class="recommand_title">{{playlistName}}</h2>
       <div class="recommand_playlist">
            <div class="playlist_item"
                v-for="(item,index) in playlist"
                :key="index">
                <div class="item-pic_box">
                    <div class="item-pic">
                        <img :src="item.picUrl"
                            class="item-pic_src"
                            @click="MSetPlaylistSongs(item)" />
                        <i class="item-pic_mask" />
                        <i class="item-pic_play-icon" 
                            @click="MSetPlaylist(item)" />
                    </div>
                </div>                
                <h4 class="play_item-name"
                    @click="MSetPlaylistSongs(item)">{{item.name}}</h4>
                <div class="play_item-play_count">{{MPlayCount(item.playCount)}}</div>
            </div>
       </div> 
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { fetchCheckMusic, fetchPlaylistDetail } from '@/api';
import { createHotSongList } from '@/utils/song';

export default {
    name: 'Playlist',
    props: {
        playlistName: {
            type: String,
            default: () => {
                return ''
            }
        },
        playlist: {
            type: Array,
            default: () => {
                return []
            }
        },
    },
    methods: {
        ...mapActions([
            'setPlayFlag',
            'setPlayList',
            'setPlaylistSongs',
            'setPlaySong',
            'setShowPlaylistSongsFlag'
        ]),
        MPlayCount(value){
            // return value;
            if(value<10000){
                return '播放量：'+value;
            }else{
                return '播放量：'+(value/10000).toFixed(1)+'万';
            }
        },
        MSetPlaylistSongs(value){
            // console.log(value);
            if(this.playlistName === "排行榜"){
                createHotSongList(value.songs)
                .then( result => {
                    // console.log(result);
                    this.setPlaylistSongs(result);
                })
                .catch( err => {
                    console.error(err.message);
                })
            }else{
                fetchPlaylistDetail(value.id)
                .then( res => {
                    // console.log(res);
                    createHotSongList(res.data.playlist.tracks)
                    .then( result => {
                        // console.log(result);
                        this.setPlaylistSongs(result);
                    })
                    .catch( err => {
                        console.error(err.message);
                    })
                })
                .catch( err => {
                    console.error(err.message);
                })
            }
        },
        MSetPlaylist(value){
            console.log(value);
        }
    }
}
</script>

<style lang="scss" scoped>
.recommand{
    margin: 10px 10px 30px 10px;
}
.recommand_title{
    font-size: 24px;
    font-weight: 400;
    line-height: 58px;
}
.recommand_playlist{
    display: flex;
    flex-wrap: wrap;
}
.playlist_item{
    width: 25%;
    margin-right: 8%;
    // margin-top: 5%;
    margin-bottom: 5%;
}
.item-pic_box{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    cursor: pointer;
}
.item-pic{
    overflow: hidden;
    position: relative;
    &:hover{
        .item-pic_src{
            transform: scale(1.07) translateZ(0);
            transition: transform .75s cubic-bezier(0,1,.75,1);
        }
        .item-pic_mask{
            opacity: .2;
        }
        .item-pic_play-icon{
            opacity: 1;
        }
    }
}
.item-pic_src{
    width: 100%;
    height: 100%;
    transform: scale(1) translateZ(0);
    transition: transform .75s;
}
.item-pic_mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    transition: opacity .5s;
    pointer-events: none;
}
.item-pic_play-icon{
    position: absolute;
    left: 50%;
    top: 50%;
    // width: 40px;
    // height: 40px;
    // margin: -20px;
    width: 80px;
    height: 80px;
    margin: -40px;
    opacity: 0;
    transform: scale(.7) translateZ(0);
    transition-property: opacity,transform;
    transition-duration: .5s;
    zoom: 1;
    background-image: url('../assets/images/play_icon.png');
    background-repeat: no-repeat;
    background-size: cover;
}
.play_item-name{
    margin-top: 5px;
    cursor: pointer;
    font-size: 100%;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover{
        color: #31c27c;
    }
}
.play_item-play_count{
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 22px;
}
</style>
