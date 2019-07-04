<template>
    <div class="subpage_viewport"
        @scroll="MHandlePlaylistsWheel">
        <div class="playlists"
            v-if="(playlistSongs.length === 0)&&(!showLoadingMaskFlag)" >
            <Playlist playlistName="排行榜"
                :playlist="leaderboard"
                :setLoadingFlag="MChangeLoadingMaskFlag" />
            <Playlist playlistName='精品歌单'
                :playlist='highqualityPlaylist' 
                v-if="showMaxPlaylistIndex > 1" 
                :setLoadingFlag="MChangeLoadingMaskFlag" />
            <Playlist playlistName='推荐歌单'
                :playlist='recommandPlaylist' 
                v-if="showMaxPlaylistIndex > 2" 
                :setLoadingFlag="MChangeLoadingMaskFlag" />
            <Playlist playlistName='网友精选碟'
                :playlist='topPlaylist' 
                v-if="showMaxPlaylistIndex > 3" 
                :setLoadingFlag="MChangeLoadingMaskFlag" />
        </div>
        <div class="playlists_songs"
            v-else-if="!showLoadingMaskFlag">
            <div class="playlists_songs-back">
                <i class="playlists_songs-back_icon" 
                    @click="MBackToPlaylists" />
            </div>
            <SongList
                :songs='playlistSongs'
                :setList='setPlaylistSongs'
                style="height: 92%"
            />
        </div>
        <div class="playlists_loading-mask_box"
             v-if="showLoadingMaskFlag" >
            <LoadingMask />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { fetchLeaderBoard, fetchHighQualityPlaylist, 
    fetchRecommandPlaylist, fetchTopPlaylist } from '@/api';
import LoadingMask from '@/components/LoadingMask.vue';
import Playlist from '@/components/Playlist.vue';
import SongList from '@/components/SongList.vue';
import { createPlaylists, formatPlaylist } from '@/utils/playlist';

// debounce 去抖
function debounce(func,wait=500){
    let timeout;
    return function(event){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            // console.log(123,this);
            func.call(this,event)
        },wait);
    }
}

export default {
    name: 'Recommand',
    components: {
        Playlist,SongList,LoadingMask
    },
    data(){
        return {
            // showSonglistFlag: false
            // showHighQualityFlag: false,
            // showRecommandFlag: false,
            // showTopFlag: false
            showMaxPlaylistIndex: 1,
            showLoadingMaskFlag: false
        }
    },
    // activated(){
    //     this.scrollTop && (this.$refs.playlists.scrollTop = this.scrollTop)
    // },
    created(){
        if(this.leaderboard.length === 0){
            for(let i=0; i<24; i++){
                fetchLeaderBoard(i)
                .then( res => {
                    // console.log(res);
                    // this.setLeaderBoard()
                    const result = formatPlaylist(res.data.playlist);
                    // console.log(result);
                    this.setLeaderBoard(result);
                    // this.setLeaderBoard(res.data.playlist);
                })
                .catch( err => {
                    console.error(err.message);
                })
            }
        }
        if(this.highqualityPlaylist.length === 0){
            fetchHighQualityPlaylist()
            .then( res => {
                // console.log(res);
                const result = createPlaylists(res.data.playlists);
                // console.log(result);
                this.setHighQualityPlaylist(result);
            })
            .catch( err => {
                console.error(err.message);
            })
        }
        if(this.recommandPlaylist.length === 0){
            fetchRecommandPlaylist()
            .then( res => {
                // console.log(res);
                const result = createPlaylists(res.data.result);
                // console.log(result);
                this.setRecommandPlaylist(result);
            })
            .catch( err => {
                console.error(err.message);
            })
        }
        if(this.topPlaylist.length === 0){
            fetchTopPlaylist()
            .then( res => {
                const result = createPlaylists(res.data.playlists);
                // console.log(result);
                // console.log(res); 
                this.setTopPlaylist(result);
            })
            .catch( err => {
                console.error(err.message);
            })
        }
    },
    computed: {
        ...mapState({
            leaderboard: state => state.recommand.leaderboard,
            highqualityPlaylist: state => state.recommand.highqualityPlaylist,
            recommandPlaylist: state => state.recommand.recommandPlaylist,
            topPlaylist: state => state.recommand.topPlaylist,
            // showPlaylistSongsFlag: state => state.recommand.showPlaylistSongsFlag,
            playlistSongs: state => state.recommand.playlistSongs
        })
    },
    methods: {
        ...mapActions([
            'setLeaderBoard',
            'setHighQualityPlaylist',
            'setRecommandPlaylist',
            // 'setPlayFlag',
            'setPlayList',
            // 'setPlaySong',
            'setTopPlaylist',
            'setPlaylistSongs',
            // 'setShowPlaylistSongsFlag'
        ]),
        MHandlePlaylistsWheel:debounce(function(e){
            // console.log(e);
            // console.log(this.showHighQualityFlag);
            // console.log(e.target.scrollTop);
            // console.log(e.target.clientHeight);
            // console.log(e.target.scrollHeight);
            // console.log(this);
            if(e.target.scrollTop+e.target.clientHeight >= e.target.scrollHeight - 400){
                // this.showHighQualityFlag = true;
                if(this.showMaxPlaylistIndex < 4){
                    this.showMaxPlaylistIndex++;
                }
            }
        }),
        MDelAllPlaylistSongs(){
            const newPlaylistSongs = [];
            let index = 0;
            for(let i=0; i<this.palylistSongs.length; i++){
                if(!this.playlistSongs[i].selected){
                    newPlaylistSongs[index++] = this.playlistSongs[i];
                }
            }
            this.setPlaylistSongs(newPlaylistSongs);
        },
        MDelPlaylistSongsItem(index){
            const newPlaylistSongs = this.playlistSongs;
            newPlaylistSongs.splice(index,1);
            this.setPlaylistSongs(newPlaylistSongs);
        },
        MSelAllPlaylistSongs(){
            const newPlaylistSongs = this.playlistSongs;
            for(let i=0; i<newPlaylistSongs.length; i++){
                newPlaylistSongs[i].selected = true;
            }
            this.setPlaylistSongs(newPlaylistSongs);
        },
        MSelPlaylistSongsItem(index){
            const newPlaylistSongs = this.playlistSongs;
            newPlaylistSongs[index].selected = true;
            this.setPlaylistSongs(newPlaylistSongs);
        },
        MChangeLoadingMaskFlag(value){
            this.showLoadingMaskFlag = value;
        },
        MBackToPlaylists(){
            this.setPlaylistSongs([]);
        }
    }
}
</script>

<style lang="scss" scoped>
.subpage_viewport{
    height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
}
.playlists{
    height: 100%;
    width: 100%;
}
.playlists_songs{
    @extend .playlists;
}
.playlists_songs-back{
    width: 100%;
    height: 8%;
    position: relative;
    // margin-bottom: 3%;
}
.playlists_songs-back_icon{
    background-image: url('../assets/images/back.svg');
    background-repeat: no-repeat;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: cover;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    opacity: .5;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }
}
.playlists_loading-mask_box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .5;
}
</style>

