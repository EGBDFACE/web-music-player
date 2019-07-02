<template>
    <!-- <div class="subpage_viewport"> -->
    <div class="subpage-viewport">
        <SongList 
            :songs="onPlayList" 
            :setList="setPlayList"
            v-if="this.onPlayList.length > 0"
            style='height: 100%' />
    </div>
</template>

<script>
import { mapState,mapMutations, mapActions } from 'vuex';
import SongList from '@/components/SongList.vue';

export default {
    name: 'OnPlay',
    components: {
        SongList
    },
    computed: {
        onPlayList(){
            // console.log(this.$store.state.onPlay.onPlay)
            return this.$store.state.onPlay.onPlayList;
        }
    },
    methods: {
        ...mapActions([
            'selPlayListItem',
            'selAllPlayListItem',
            'delPlayListItem',
            'delAllPlayListItem',
            'setPlayList',
            'setPlaySong',
            'setPlayFlag'
        ])
    }
}
</script>

<style lang="scss" scoped>
// .subpage_viewport{
//     .song_list_overview{
//         height: 910px;
//     }
// }
</style>


