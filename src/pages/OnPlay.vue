<template>
    <!-- <div class="subpage_viewport"> -->
    <div>
        <SongList :deleteAll="delAllPlayListItem"
            :modListMenuStyle="setModListMenuStyle"
            :headerMenuDelete="setModListMenuStyle"
            :headerListMenuPlayStyle="setHeaderListMenuPlayStyle" 
            :deleteItem="delPlayListItem" 
            :songs="onPlayList" 
            :selectAll="selAllPlayListItem" 
            :selectItem="selPlayListItem"
            :setPlaySong='setPlaySong'
            v-if="this.onPlayList.length > 0"
            class="song_list_overview"/>
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
            'setPlaySong'
        ]),
        setModListMenuStyle(value){
            return value.length > 0 ? null : {display : 'none'};
        },
        setHeaderListMenuPlayStyle(value){
            return {display: 'none'};
         }
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


