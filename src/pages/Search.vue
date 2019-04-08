<template>
    <div class="subpage_viewport">
        <!-- <button @click='getHotSearch'>get hot search</button> -->
        <div class="searchBar">
            <span v-for="item in hotSearchString" :key="item.id">{{item}}</span>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters } from 'vuex';
import store from '@/store';

store.dispatch('getHotSearch');
// this.getHotSearch();
// console.log(this.$store.state.search.hotSearch);
export default {
    name: 'search',
    methods:{
        ...mapActions([
            'getHotSearch'
        ])
    },
    computed:{
        ...mapGetters([
            'hotSearchString'
        ])
    }
    // computed:mapState({
    //     hotSearch: state=>state.search.hotSearch
    // })
        // mapState([
        //     'hotSearch'
        // ])
        // hotSearch: function(){
        //     // console.log(this.$store.state.search.hotSearch);
        //     return this.$store.state.search.hotSearch;
        // }
}
</script>
<style lang='sass'>
.searchBar
    padding: 10px 15px
    background-color: rgba(0,0,0,.2)
    span
        line-height: 40px
        margin-right: 15px
        cursor: pointer
        opacity: .3
        &:hover
            opacity: 1
</style>
