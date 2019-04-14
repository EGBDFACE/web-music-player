<template>
    <div class="subpage_viewport">
        <SongList :deleteItem="delPlayListItem" :songs="onPlayList" :selectAll="selAllPlayListItem" :selectItem="selPlayListItem" v-if="this.onPlayList.length > 0"/>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
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
        ...mapMutations([
            'selPlayListItem',
            'selAllPlayListItem',
            'delPlayListItem'
        ])
    }
}
</script>

