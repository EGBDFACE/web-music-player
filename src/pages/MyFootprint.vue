<template>
<div class="subpage_viewport">
    <SongList
        v-if="this.historyList.length > 0" 
        :songs='historyList'
        :setList='setHistoryList'
        style="height: 100%"
        />
</div>                                                                                                         
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SongList from '@/components/SongList.vue';

export default {
    name: 'MyFootprite',
    components: {
        SongList
    },
    computed: {
        ...mapState({
            historyList: state => state.history.historyList,
            // onPlaySong: state => state.onPlaySong
        })
    },
    methods: {
        ...mapActions([
            'setHistoryList'
        ])
    }
}
</script>
