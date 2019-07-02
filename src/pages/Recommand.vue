<template>
    <div class="subpage_viewport"
        @scroll="MHandlePlaylistsWheel">
        <div class="playlists"
            v-if="playlistSongs.length === 0" >
            <Playlist playlistName="排行榜"
                :playlist="leaderboard" />
            <Playlist playlistName='精品歌单'
                :playlist='highqualityPlaylist' 
                v-if="showMaxPlaylistIndex > 1" />
            <Playlist playlistName='推荐歌单'
                :playlist='recommandPlaylist' 
                v-if="showMaxPlaylistIndex > 2" />
            <Playlist playlistName='网友精选碟'
                :playlist='topPlaylist' 
                v-if="showMaxPlaylistIndex > 3" />
        </div>
        <SongList v-else 
            :songs='playlistSongs'
            :setList='setPlaylistSongs'
            style="height: 100%"
            />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { fetchLeaderBoard, fetchHighQualityPlaylist, 
    fetchRecommandPlaylist, fetchTopPlaylist } from '@/api';
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
        Playlist,SongList
    },
    data(){
        return {
            // showSonglistFlag: false
            // showHighQualityFlag: false,
            // showRecommandFlag: false,
            // showTopFlag: false
            showMaxPlaylistIndex: 1
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
.playlist{
    height: 100%;
    width: 100%;
}
</style>

