<template>
    <div class="subpage_viewport">
        <!-- <button @click='getHotSearch'>get hot search</button> -->
        <div class="searchBar">
            <input type="text" placeholder="音乐/歌手" :value='searchContext' @input='getSearchSuggest($event.target.value)' @keyup.enter='getSearchResult($event.target.value)' @focus='setInputFocus()' @blur='setInputBlur()'/>
            <div v-if="inputFocus&&((searchHistory.length !=0)||(Object.keys(searchSuggest)).length !=0)">
                <p>focus</p>
                <p>{{searchSuggest}}</p>
                <p>{{searchHistory}}</p>
            </div>
            <p>热门搜索：</p>
            <span v-for="item in hotSearchString" :key="item.id" @click='getSearchResult(item)'>{{item}}</span>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters, mapMutations } from 'vuex';
import store from '@/store';

store.dispatch('getHotSearch');
// this.getHotSearch();
// console.log(this.$store.state.search.hotSearch);
export default {
    name: 'search',
    data: function(){
        return{
            inputFocus: false
        }
    },
    methods:{
        ...mapActions([
            'getHotSearch',
            'getSearchSuggest',
            // 'setSearchContext',
            'getSearchResult'
        ]),
        setInputFocus(){
            this.inputFocus = true;
        },
        setInputBlur(){
            this.inputFocus = false;
        }
        // ...mapMutations([

        // ])
    },
    computed:{
        ...mapGetters([
            'hotSearchString',
            'searchContext'
        ]),
        ...mapState({
            searchContext: state=>state.search.searchContext,
            searchHistory: state=>state.search.searchHistory,
            searchSuggest: state=>state.search.searchSuggest
        })
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
    span
        line-height: 40px
        margin-right: 15px
        cursor: pointer
        opacity: .3
        &:hover
            opacity: 1
    input
        background-color: rgba(0,0,0,.2)
        display: block
        width: 500px
        height: 40px
        box-sizing: border-box
        padding: 0 15px
        color: #fff
        font-size: 14px
        border: 1px solid hsla(0,0%,100%,.6)
        outline: 0
        opacity: .8
    p
        display: inline
        opacity: .3     
</style>
