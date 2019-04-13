<template>
    <div class="subpage-viewport">
        <div class="search-bar">
            <input type="text" autocomplete="off" id="searchInput" placeholder="音乐/歌手"  v-model.trim="searchContext" @input="getSearchSuggest($event.target.value)" @keyup.enter='getSearchResult($event.target.value)' @focus='setInputFocus()' @blur='setInputBlur()'/>
            <div class="js-smartbox" v-if="inputFocus&&((searchHistory.length !=0)||(Object.keys(searchSuggest)).length !=0)" @mouseenter="setSmartBoxFocus()" @mouseleave="setSmartBoxBlur()">
            <!-- <div class="js-smartbox" v-if="inputFocus&&((searchHistory.length != 0)||(Object.keys(searchSuggest)).length != 0)"> -->
                <div class="search-suggest" v-if="Object.keys(searchSuggest).length !=0">
                    <div v-for="(item,index) in searchSuggest.order" :key="index" :class="setSearchSuggestClass(item)">
                        <h4>
                            <i></i>{{searchSuggestTitle[item]}}
                        </h4>
                        <div class="list">
                            <div v-for="(subItem,subIndex) in searchSuggest[item]" :key='subIndex'>
                                <span class="search-suggest-first">{{subItem.name}}</span>
                                <span v-if="(item === 'songs')" class="search-suggest-second">—{{getSearchSuggestArtists(subItem.artists)}}</span>
                                <span v-if="(item === 'mvs')" class="search-suggest-second">—{{getSearchSuggestArtists(subItem.artists)}}</span>
                                <span v-if="(item === 'albums')" class="search-suggest-second">-{{subItem.artist.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-history" v-else-if="searchHistory.length !=0">
                <!-- <div class="search-history" v-else-if="searchHistory.length != 0" @mouseenter="set"> -->
                    <div class="search-history-title">
                        <p>搜索历史</p>
                        <i @click="clearSearchHistory()"></i>
                    </div>
                    <div class="search-history-item" v-for="(item,index) in searchHistory" :key="index">
                        <p @click="getSearchResult(item)">{{item}}</p>
                        <i class="icon-history-item-delete" @click="delSearchHistoryItem(index)"></i>
                    </div>
                </div>
            </div>
            <div style="text-align: center">
                <p class="hot-search-til">热门搜索：</p>
                <span class="hot-search-list" v-for="(item,index) in hots" :key="index" @click='getSearchResult(item)'>{{item}}</span>
            </div>
        </div>
        <SongList :songs="songs" v-if="songs.length != 0"></SongList>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters, mapMutations } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { BASE_URL } from '@/assets/constant.js';
import SongList from '@/components/SongList.vue';

export default {
    name: 'search',
    data(){
        return{
            inputFocus: false,
            smartBoxFocus: false,
            searchContext: '',
            songs: [],
            // hots: hotsCache
            hots: [],
            searchSuggest: {},
            searchHistory: [],
            searchSuggestTitle: {
                songs: '歌曲',
                artists: '歌手',
                albums: '专辑',
                mvs: 'MV',
                playlists: '歌单'
            }
        }
    },
    components: {
        SongList
    },
    created(){
        axios({
            method: 'get',
            baseURL: BASE_URL,
            url: '/search/hot'
        }).then(res=>{
            // console.log(res);
            let hotsCache = [];
            for(let i=0;i<5;i++){
                // this.hots[i] = res.data.result.hots[i].first; //这样竟然会出错？？？
                hotsCache[i] = res.data.result.hots[i].first;
            }
            this.hots = hotsCache;
        }).catch(err=>{
            console.error(err.message);
        });
    },
    methods:{
        setSearchSuggestClass(value){
            return `search-suggest-${value}`;
        },
        getSearchSuggestArtists(value){
            let all_artists = '';
            for(let i=0;i<value.length;i++){
                // all_artists += value[i].name + '\t';
                all_artists += (i>0 ? ' / '+value[i].name : value[i].name);
            }
            return all_artists;
        },
        getSearchSuggest(value){
            // console.log(value);
            axios({
                method: 'get',
                baseURL: BASE_URL,
                url: `/search/suggest/?keywords=${value}`
            }).then(res=>{
                console.log(res);
                this.searchSuggest = res.data.result;
            }).catch(err=>{
                this.searchSuggest = {};
                console.error(err.message);
            })
        },
        getSearchResult(value){
            axios({
                method: 'get',
                baseURL: BASE_URL,
                url: `/search?keywords=${value}`
            }).then(res=>{
                console.log(res);
                this.searchContext = value;
                this.songs = res.data.result.songs;
                if(this.searchHistory.indexOf(value) === -1){
                    this.searchHistory.push(value);
                }
                // else{
                //     console.log('history item search');
                    
                // }
                this.inputFocus = false;
                this.smartBoxFocus = false;
                document.getElementById('searchInput').blur();
            }).catch(err=>{
                console.error(err.message);
            });
        },
        setInputFocus(){
            // console.log(this);
            this.inputFocus = true;
            // setTimeout(function(){
            //     this.inputFocus = true;
            // },1000);
        },
        setInputBlur(){
            // this.inputFocus = false;
            // (function(that){
            //     setTimeout(function(){
            //         // console.log(that);
            //         that.inputFocus = false;
            //     },1000);
            // })(this);
            console.log('input blur');
            console.log(this.smartBoxFocus);
            if(!this.smartBoxFocus){
                this.inputFocus = false;
            }else{
                document.getElementById('searchInput').focus();
            }
        },
        setSmartBoxFocus(){
            console.log('mouse enter');
            this.smartBoxFocus = true;
        },
        setSmartBoxBlur(){
            console.log('mouse leave');
            this.smartBoxFocus = false;
        },
        delSearchHistoryItem(value){
            // document.getElementById('searchInput').focus();
            console.log('affect');
            this.searchHistory.splice(value,1);
            // (function(that){
            //     setTimeout(function(){
            //         // console.log(that);
            //         that.inputFocus = true;
            //     },1000);
            // })(this);
        },
        clearSearchHistory(){
            this.searchHistory = [];
            // this.inputFocus = true;
        }
    }
}
</script>
<style lang='sass'>
.search-bar
    position: relative
    margin-top: 40px
    .hot-search-list
        line-height: 40px
        margin-right: 15px
        cursor: pointer
        opacity: .3
        &:hover
            opacity: 1
    input
        // background-color: rgba(0,0,0,.2)
        margin: 0 auto
        background-color: #292a2b
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
    .hot-search-til
        display: inline
        opacity: .3 
@mixin search-suggest-common($value)
    position: relative
    padding: 0
    h4
        position: absolute
        top: 5px
        left: 0
        width: 48px
        padding: 0 11px 0 41px
        line-height: 36px
        color: #999
        i
            left: 18px
            @if $value == 'songs'
                background-position: -20px -220px
            @if $value == 'artists'
                background-position: -20px -240px
            @if $value == 'albums'
                background-position: -40px 0
            @if $value == 'mvs'
                background-position: 0 -220px
            @if $value == 'playlists'
                background-position: -180px -160px
    .list
        border-left: 1px solid hsla(0,0%,100%,.2)
        // @if $value == 'songs'
        //     border-top: 0
        // @else
        border-top: 1px solid hsla(0,0%,100%,.1)
        // border-top: 1px solid #f2f2f2
        margin-left: 92px
        padding: 5px 0
        div
            cursor: pointer
            display: block
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            &:hover
                background-color: #1b1b1c
.js-smartbox
    position: absolute
    width: 498px
    left: 50%
    margin-left: -250px
    // background-color: rgba(0,0,0,.8)
    background-color: #292a2b
    z-index: 1
    min-height: 30px
    border: 1px solid hsla(0,0%,100%,.25)
    border-top: none
    font-size: 14px
    i
        position: absolute
        height: 16px
        width: 16px
        background-repeat: no-repeat
        top: 10px
        background-image: url('../assets/images/icon_sprite2X.png')
        background-size: 200px
    .search-suggest
        .search-suggest-songs
            @include search-suggest-common('songs')
        .search-suggest-artists
            @include search-suggest-common('artists')
        .search-suggest-albums
            @include search-suggest-common('albums')
        .search-suggest-mvs
            @include search-suggest-common('mvs')
        .search-suggest-playlists
            @include search-suggest-common('playlists')
        .list
            .search-suggest-first
                padding-left: 41px
                line-height: 36px
                color: #999
            .search-suggest-second
                opacity: .3
    .search-history
        padding-top: 5px 
        line-height: 36px
        font-size: 14px
        text-align: left
        i
            cursor: pointer
            top: 50%
            margin-top: -8px
            right: 11px
            opacity: .5
            background-position: -100px 0
            &:hover
                opacity: 1
        .search-history-title
            p
                line-height: 36px
                opacity: .5   
            color: #999
            position: relative
            padding-left: 11px
        .search-history-item
            cursor: pointer
            position: relative
            p
                color: #999
                padding-left: 11px
            &:hover
                background-color: #1b1b1c
                .icon-history-item-delete
                    background-position: -40px -180px
                    background-image: url('../assets/images/icon_sprite.png')
            .icon-history-item-delete
                margin-top: -6px
                background-image: none
</style>
