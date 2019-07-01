<template>
    <div class="subpage_viewport">
        <Playlist playlistName="排行榜"
            :playlist="leaderboard" />
        <Playlist playlistName='精品歌单'
            :playlist='highqualityPlaylist' />
        <Playlist playlistName='推荐歌单'
            :playlist='recommandPlaylist' />
        <Playlist playlistName='网友精选碟'
            :playlist='topPlaylist' />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { fetchLeaderBoard, fetchHighQualityPlaylist, 
    fetchRecommandPlaylist, fetchTopPlaylist } from '@/api';
import Playlist from '@/components/Playlist.vue';
import { createPlaylists, formatPlaylist } from '@/utils/playlist';

export default {
    name: 'Recommand',
    components: {
        Playlist
    },
    data(){
        return {

        }
    },
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
            topPlaylist: state => state.recommand.topPlaylist
        })
    },
    methods: {
        ...mapActions([
            'setLeaderBoard',
            'setHighQualityPlaylist',
            'setRecommandPlaylist',
            'setPlayFlag',
            'setPlayList',
            'setPlaySong',
            'setTopPlaylist'
        ])
    }
}
</script>

<style lang="scss" scoped>
.subpage_viewport{
    height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>

