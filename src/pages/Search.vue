<template>
    <div class="subpage-viewport">
        <div class="search-bar">
            <input type="text" 
                autocomplete="off" 
                id="searchInput" 
                placeholder="音乐/歌手"  
                v-model.trim="searchContext" 
                @input="getSearchSuggest($event.target.value)" 
                @keyup.enter='getSearchResult($event.target.value)' 
                @focus='setInputFocus()' 
                @blur='setInputBlur()'/>
            <div class="js-smartbox" 
                v-if="inputFocus&&((searchHistory.length !=0)
                    ||(Object.keys(searchSuggest)).length !=0)" 
                @mouseenter="setSmartBoxFocus()" 
                @mouseleave="setSmartBoxBlur()">
            <!-- <div class="js-smartbox" v-if="inputFocus&&((searchHistory.length != 0)||(Object.keys(searchSuggest)).length != 0)"> -->
                <div class="search-suggest" 
                    v-if="Object.keys(searchSuggest).length !=0">
                    <div v-for="(item,index) in searchSuggest.order" 
                        :key="index" 
                        :class="setSearchSuggestClass(item)">
                        <h4>
                            <i></i>{{searchSuggestTitle[item]}}
                        </h4>
                        <div class="list">
                            <div v-for="(subItem,subIndex) in searchSuggest[item]" 
                                :key='subIndex'
                                @click='resolveSearchSuggest(item,subItem)'>
                                <span class="search-suggest-first">{{subItem.name}}</span>
                                <span v-if="(item === 'songs')" class="search-suggest-second">—{{getSearchSuggestArtists(subItem.artists)}}</span>
                                <span v-if="(item === 'mvs')" class="search-suggest-second">—{{getSearchSuggestArtists(subItem.artists)}}</span>
                                <span v-if="(item === 'albums')" class="search-suggest-second">-{{subItem.artist.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-history" 
                    v-else-if="searchHistory.length !=0">
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
        <SongList
            :songs="state_searchResult" 
            :setList="setSearchResult"
            v-if="state_searchResult.length != 0" 
            />
        <div class="search_loading-mask_box"
            v-if="state_searchLoadingFlag">
            <LoadingMask />
        </div>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters, mapMutations } from 'vuex';
import { fetchCheckMusic, fetchSearchHot, fetchSearchResult, 
    fetchSearchSuggest, fetchArtistSongs, fetchArtistMvs,
    fetchArtistAlbums, fetchArtistDesc, fetchPlaylistDetail,
    fetchAlbumDetail, fetchMvDetail } from '@/api';
import store from '@/store';
// import axios from 'axios';
import { BASE_URL } from '@/assets/constant.js';
import ArtistDetail from '@/components/ArtistDetail.vue';
import LoadingMask from '@/components/LoadingMask.vue';
import SongList from '@/components/SongList.vue';
import { createHotSongList } from '@/utils/song';

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
            },
            // showLoadingMaskFlag: false
        }
    },
    components: {
        ArtistDetail,
        SongList,
        LoadingMask
    },
    created(){
        fetchSearchHot()
        .then(res=>{
            // console.log(res);
            let hotsCache = [];
            for(let i=0;i<5;i++){
                // this.hots[i] = res.data.result.hots[i].first; //这样竟然会出错？？？
                hotsCache[i] = res.data.result.hots[i].first;
            }
            this.hots = hotsCache;
        })
        .catch(err=>{
            console.error(err.message);
        });
        this.searchContext = this.state_searchContext;
    },
    watch: {
        state_searchContext(nv,ov){
            this.searchContext = nv;
        }
    },
    methods:{
        resolveSearchSuggest(type,value){
            // this.showLoadingMaskFlag = true;
            this.setSearchLoadingFlag(true);
            this.setSearchResult([]);
            switch(type){
                case 'songs':
                    fetchCheckMusic(value.id)
                    .then( res => {
                        value.available = true;
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                        this.$router.push('/onplay');
                        this.setPlayList(value);
                        this.setPlaySong(value);
                        this.setPlayFlag(true);
                    })
                    .catch( err => {
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                        console.error(err.message);
                    })
                    break;
                case 'artists':
                    fetchArtistSongs(value.id)
                    .then( res => {
                        // this.setArtistInfo(res.data.artist);
                        // this.setArtistSongs(res.data);
                        // console.log(res);
                        createHotSongList(res.data.hotSongs)
                        .then( result => {
                            // console.log(result);
                            // this.showLoadingMaskFlag = false;
                            this.setSearchLoadingFlag(false);
                            this.setSearchResult(result);
                        })
                        .catch( err => {
                            // this.showLoadingMaskFlag = false;
                            this.setSearchLoadingFlag(false);
                            console.error(err.message);
                        })
                    })
                    .catch( err => {
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                        console.error(err.message);
                    })
                    break;
                case 'albums':
                    fetchAlbumDetail(value.id)
                    .then( res => {
                        console.log(res);
                        createHotSongList(res.data.songs)
                        .then( result => {
                            // console.log(result);
                            // this.showLoadingMaskFlag = false;
                            this.setSearchLoadingFlag(false);
                            this.setSearchResult(result);
                        })
                        .catch( err => {
                            // this.showLoadingMaskFlag = false;
                            this.setSearchLoadingFlag(false);
                            console.error(err.message);
                        })
                    })
                    .catch( err => {
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                        console.error(err.message);
                    })
                    break;
                // case 'mvs':
                //     fetchMvDetail(value.id)
                //     .then( res => {
                //         console.log(res);
                //     })
                //     .catch( err => {
                //         console.error(err.message);
                //     })
                //     break;
                case 'playlists':
                    fetchPlaylistDetail(value.id)
                    .then( res => {
                        // console.log(res);
                        createHotSongList(res.data.playlist.tracks)
                        .then( result => {
                            // console.log(result);
                            // this.showLoadingMaskFlag = false; 
                            this.setSearchLoadingFlag(false);
                            this.setSearchResult(result);
                        })
                        .catch( err => {
                            // this.showLoadingMaskFlag = false;
                            this.setSearchLoadingFlag(false);
                            console.error(err.message);
                        })
                    })
                    .catch( err => {
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                        console.error(err.message);
                    })
                    break;
            }
            // console.log(this);
            this.searchContext = value.name;
            this.setSearchContext(value.name);
            this.inputFocus = false;
            this.smartBoxFocus = false;
            // this.setInputBlur();
            // this.$router.push('/detail');
            // this.inputFocus = false;
        },
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
            if(value){
                this.inputFocus = true;
                fetchSearchSuggest(value)
                .then(res=>{
                    // console.log(res);
                    const result = res.data.result;
                    for(let i=0; i<result.order.length; i++){
                        if(result.order[i] === 'mvs'){
                            result.order.splice(i,i+1);
                            break;
                        }
                    }
                    this.searchSuggest = result;
                })
                .catch(err=>{
                    this.searchSuggest = {};
                    console.error(err.message);
                })
            }else{
                this.inputFocus = false;
            }
        },
        getSearchResult(value){
            this.setSearchResult([]);
            // this.showLoadingMaskFlag = true;
            this.setSearchLoadingFlag(true);
            if(value){
                this.songs = [];
                fetchSearchResult(value)
                .then(res=>{
                    // console.log(res);
                    this.searchContext = value;
                    this.setSearchContext(value);
                    createHotSongList(res.data.result.songs)
                    .then( result => {
                        this.songs = result;
                        this.setSearchResult(result);
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                    })
                    .catch( err => {
                        console.log(err.message);
                        // this.showLoadingMaskFlag = false;
                        this.setSearchLoadingFlag(false);
                    })
                    // let list= res.data.result.songs;
                    // for(let i=0;i<list.length;i++){
                    //     fetchCheckMusic(list[i].id)
                    //     .then( (res) => {
                    //         list[i].selected = false;
                    //         list[i].available = true;
                    //         if(i === list.length-1){
                    //             this.songs = list;
                    //             this.setSearchResult(list);
                    //             this.showLoadingMaskFlag = false;
                    //         }
                    //     })
                    //     .catch( err => {
                    //         list[i].available = false;
                    //         if(i === list.length-1){
                    //             this.songs = list;
                    //             this.setSearchResult(list);
                    //             this.showLoadingMaskFlag = false;
                    //         }
                    //         // console.error(list[i].name + '暂无版权');
                    //     })
                    // }
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
            }
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
            // console.log('input blur');
            // console.log(this.smartBoxFocus);
            if(!this.smartBoxFocus){
                this.inputFocus = false;
            }else if(document.getElementById('searchInput')){
                document.getElementById('searchInput').focus();
            }
        },
        setSmartBoxFocus(){
            // console.log('mouse enter');
            this.smartBoxFocus = true;
        },
        setSmartBoxBlur(){
            // console.log('mouse leave');
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
        },
        activeListMenuStyle(value){
            return value.length > 0 ? null : { display: 'none'};
        },
        ...mapActions([
            // 'delAllSearchResultItem',
            // 'delSearchResultItem',
            // 'selAllSearchResultItem',
            // 'setArtistAlbums',
            // 'setArtistDesc',
            // 'setArtistInfo',
            // 'setArtistMvs',
            // 'setArtistSongs',
            'setPlayList',
            'setPlaySong',
            'setPlayFlag',
            'setSearchContext',
            'setSearchResult',
            'setSearchLoadingFlag'
            // 'selSearchResultItem',
        ])
    },
    computed: {
        // state_searchResult(){
        //     return this.$store.state.search.searchResult;
        // },
        ...mapState({
            artistDetail: state => state.search.artist,
            state_searchResult: state => state.search.searchResult,
            state_searchContext: state => state.search.searchContext,
            state_searchLoadingFlag: state => state.search.loadingFlag
        })
    }
}
</script>
<style lang='sass'>
.search-bar
    position: relative
    // margin-top: 40px
    height: 12%
    .hot-search-list
        line-height: 40px
        margin-right: 15px
        cursor: pointer
        opacity: .3
        &:hover
            opacity: 1
    input
        background-color: rgba(0,0,0,0)
        margin: 0 auto
        // background-color: #292a2b
        display: block
        width: 500px
        height: 40px
        box-sizing: border-box
        padding: 0 15px
        color: #fff
        font-size: 14px
        border: 1px solid hsla(0,0%,100%,.6)
        outline: 0
        // opacity: .8
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
.search-artist_viewport
    width: 100%
    height: 80%
.search_loading-mask_box
    width: 100%
    height: 88%
    display: flex
    align-items: center
    justify-content: center
    opacity: .5
</style>