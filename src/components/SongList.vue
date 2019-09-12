<template>
  <div class="song-list__overview">
    <ul class="song-list__header">
        <li class="song-list__edit sprite" :style="selectAllLabelStyle">
          <input type="checkbox" @click="MSelectAll($event)" />
        </li>
        <li class="song-list__header-name">
          <span>歌曲</span>
          <div class="mod_list_menu" :style="CModListMenuStyle">
              <i class="list_menu__icon_play" 
                  @click="setPlay(addPlayList)" 
                  :style="CHeaderListMenuPlayStyle" />
              <i class="list_menu__icon_add" 
                  @click="addPlay(addPlayList)" 
                  :style="CHeaderListMenuPlayStyle" />
              <i class="list_menu__icon_down" />
              <i class="list_menu__icon_share" />
            </div>
          </li>
        <li class="song-list__header-author">歌手</li>
        <li class="song-list__header-time" :style="headerTimeStyle">时长</li>
        <i class="list_menu__icon_delete" @click="MDeleteAll()" :style="CModListMenuStyle"></i>
    </ul>
    <ul class="song-list__list">
      <li v-for="(item,index) in list" :key="index" :style="listItemStyle(item)">
        <div class="song-list__item">
          <div class="song-list__item__edit sprite" :style="selectedItemLabelStyle(index)">
            <input type="checkbox"  @click="MSelectItem(index,$event)" />
          </div>
          <i class="song-list__item__onplay_icon" v-if='(item.id === onPlaySong.id)&&onPlayFlag'/>
          <div class="song-list__item__number" v-else>{{index + 1 }}</div>
          <div class="song-list__item__name">
            <span class="song-list__item__name__txt">{{item.name}}</span>
            <div class="mod_list_menu">
              <i class="list_menu__icon_pause"
                  v-if="onPlaySong && onPlaySong.id == item.id && onPlayFlag"
                  @click="setPause()" />
              <i class="list_menu__icon_play" 
                  v-else
                  @click="setPlay(item)" />
              <i class="list_menu__icon_add" 
                  @click="addPlay(item)"
                  :style="CHeaderListMenuPlayStyle" />
              <i class="list_menu__icon_down" />
              <i class="list_menu__icon_share" />
            </div>
          </div>
          <div class="song-list__item__artists">
            <div v-if="item.artists.length === 1">
              <span class="song-list__item__artist__txt"
                @click="MHandleArtistClick(item.artists[0])">
                {{standardizationArtistName(item.artists[0].name)}}
              </span>
            </div>
            <div v-else-if="item.artists.length != 1">
              <div v-for="(artist,subIndex) in item.artists" :key="subIndex">
                <span class="song-list__item__artist__txt"
                  @click="MHandleArtistClick(artist)">
                  {{standardizationArtistName(artist.name)}}
                </span>
                <span v-if="subIndex != item.artists.length-1 "> / </span>
              </div>
            </div>
          </div>
          <div class="song-list__item__duration">{{getSongDuration(item.duration)}}</div>
          <i class="list_menu__icon_delete" @click="MDeleteItem(index)"></i>
        </div>
      </li>
    </ul>
  </div>  
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { fetchArtistSongs } from '@/api';
import { createHotSongList } from '@/utils/song';

export default {
    name: 'SongList',
    data: function(){
      return {
        list: [],
        selectedItems: [],
        // songs : this.initialSongs.map(value=>{
        //   return{
        //     ...value,
        //     selected: false
        //   }
        // }),
        selectAllIconStyle: null
      }
    },
    created(){
      // console.log(this.songs);
      this.list = this.songs;
    },
    watch: {
      songs(nv,ov){
        // console.log(nv);
        // console.log(ov);
        this.list = nv;
      }
    },
    props: {
      songs: {
        type: Array,
        default: () =>{
          return []
        }
      },
      setList: {
        type: Function,
        default: ()=>{
          return []
        }
      },
      // deleteItem: {
      //   type: Function,
      //   default: v=>{
      //     return null
      //   }
      // },
      // selectItem: {
      //   type: Function,
      //   default: v=>{
      //     return null
      //   }
      // },
      // selectAll: {
      //   type: Function,
      //   default: v=>{
      //     return null
      //   }
      // },
      // deleteAll: {
      //   type: Function,
      //   default: v=>{
      //     return null
      //   }
      // },
      // setPlayList: {
      //   type: Function,
      //   default: v=>{
      //     return null
      //   }
      // },
      // setPlayFlag: {},
      // setPlaySong: {},
      // modListMenuStyle: {
      //   type: Object,
      //   default: () => {
      //     return undefined
      //   }
      // },
      // headerMenuDelete: {
      //   type: Object,
      //   default: () => {
      //     return undefined
      //   }
      // },
      headerListMenuPlayStyle:{
        type: Function,
        default: v=>{
          return null;
        }
      }
    },
    methods: {
      ...mapActions([
        'setPlayList',
        'setPlaySong',
        'setPlayFlag',
        'setSearchContext',
        'setSearchLoadingFlag',
        'setSearchResult'
      ]),
      setPlay(value){
        if (Object.prototype.toString.call(value) === '[object Array]') {
          this.setPlayList(value);
          for(let i=0; i<value.length; i++) {
            if (value[i].available) {
              this.setPlaySong(value[i]);
              break;
            }
          }
        } else {
          if (this.onPlaySong.id == value.id) {
            document.getElementsByTagName('audio')[0].play();
          } else {
            this.setPlaySong(value);
          }
        }
        // if (this.onPlaySong.id == value.id) {
        //   document.getElementsByTagName('audio')[0].play();
        // } else {
        //   this.setPlayList(value);
        //   if(Object.prototype.toString.call(value) === '[object Array]'){
        //     for(let i=0; i<value.length; i++){
        //       if(value[i].available){
        //         this.setPlaySong(value[i]);
        //         break;
        //       }
        //     }
        //   }else{
        //     this.setPlaySong(value);
        //   }
        // }
        this.setPlayFlag(true);
      },
      setPause() {
        document.getElementsByTagName('audio')[0].pause();
        this.setPlayFlag(false);
      },
      addPlay(value){
        this.setPlayList(value);
      },
      getSongDuration(value){
        let minute = Math.floor((value/1000)/60);
        let second = Math.floor(value/1000) - minute*60;
        let sMinute,sSecond;
        if(minute < 10){
          sMinute = '0'+minute;
        }else{
          sMinute = minute;
        }
        if(second < 10){
          sSecond = '0'+second;
        }else{
          sSecond = second;
        }
        return sMinute + ':' + sSecond;
      },
      standardizationArtistName(value){
        let result = value;
        if((value.indexOf('【') != -1)||(value.indexOf('】') != -1)){
          result = value.replace(/【|】/g,'');
        }
        return result;
      },
      // deleteSongListItem(index){
      //   // this.songs.splice(index,1);
      //   this.deleteItem(index);
      // },
      // setSelectedItems(index){
      //   // this.songs[index].selected = !this.songs[index].selected;
      //   this.selectItem(index);
      // },
      selectedItemLabelStyle(index){
        if((this.list[index])&&(this.list[index].selected)){
          return {
            backgroundPosition: '-60px -80px',
            opacity: 1
          }
        }else{
          return null
        }
      },
      listItemStyle(value){
        let style = undefined;
        if(!value.available){
          style = {
            pointerEvents: 'none',
            opacity: '.5'
          }
        }
        if((value.id === this.onPlaySong.id)&&(this.onPlayFlag)){
          style = {
            color: '#fff'
          }
        }
        return style;
      },
      MDeleteAll(){
        const newList = [];
        let index = 0;
        for(let i=0; i<this.list.length; i++){
          if(!this.list[i].selected){
            newList[index++] = this.list[i];
          }
        }
        this.list = newList;
        console.log(newList);
        this.setList(newList);
      },
      MDeleteItem(index){
        this.list.splice(index,1);
        this.setList(this.list);
      },
      MSelectItem(index, event){
        // console.log(event);
        // console.log(event.target.checked);
        this.list[index].selected = event.target.checked;
        this.setList(this.list);
      },
      MSelectAll(event){
        let v = false;
        for(let i=0; i<this.list.length; i++){
          // this.list[i].selected = event.target.checked;
          if(!this.list[i].selected){
            v = true;
            break;
          }
        }
        for(let i=0; i<this.list.length; i++){
          this.list[i].selected = v;
        }
        this.setList(this.list);
      },
      MHandleArtistClick(artist){
        if(this.$router.path !== '/search'){
          this.$router.push('/search');
        }
        // console.log(artist);
        this.setSearchResult([]);
        this.setSearchContext(artist.name);
        this.setSearchLoadingFlag(true);
        fetchArtistSongs(artist.id)
        .then( res => {
          createHotSongList(res.data.hotSongs)
          .then( result => {
            // this.showLoading
            this.setSearchLoadingFlag(false);
            this.setSearchResult(result);
          })
          .catch( err => {
            this.setSearchLoadingFlag(false);
            console.error(err.message);
          })
        })
      }
      // setAllItemsSelected(value){
      //   // console.log(value);
      //   // for(let i=0;i<this.songs.length;i++){
      //   //   this.songs[i].selected = value;
      //   // }
      //   this.selectAll(value);
      //   this.selectAllIconStyle = value ? {
      //     backgroundPosition: '-60px -80px',
      //     opacity: 1
      //   } : null;
      // }
    },
    computed: {
      ...mapState({
        onPlayFlag: state => state.onPlayFlag,
        onPlaySong: state => state.onPlaySong
      }),
      selectAllLabelStyle(){ 
        let select_all_style = {
          backgroundPosition: '-60px -80px',
          opacity: 1
        };
        for(let i=0;i<this.list.length;i++){
          if(!this.list[i].selected){
            return null; 
          }
        }
        return select_all_style;
      },
      addPlayList(){
        let selectedItemArray = [];
        for(let i=0;i<this.list.length;i++){
          if(this.list[i].selected){
            selectedItemArray.push(this.list[i]);
          }
        }
        return selectedItemArray;
      },
      CModListMenuStyle(){
        if(this.addPlayList.length>0){
          return undefined
        }else{
          return {display: 'none'}
        }
      },
      headerTimeStyle(){
        if(this.addPlayList.length === 0){
          return {
            opacity: 1
          }
        }else{
          return undefined
        }
      },
      CHeaderListMenuPlayStyle(){
        if(this.$route.path === '/onplay'){
          return { display: 'none'}
        }else{
          return undefined
        }
      }
    }
  
}
</script>
<style lang='sass'>
.sprite
  background-image: url('../assets/images/icon_sprite2X.png')
  background-size: 200px
  opacity: .2
  &:hover
    opacity: 1
.song-list__overview
  height: 88%
  margin-right: 0
  overflow-x: hidden
  overflow-y: scroll
  li
    list-style: none
  input
    cursor: pointer
    opacity: 0
    width: 14px
    height: 14px
.song-list__header
  padding-left: 62px
  padding-right: 100px
  background-color: transparent
  color: inherit
  height: 50px
  line-height: 50px
  position: relative
  border-top: 1px solid rgba(255,255,255,.02)
  border-bottom: 1px solid rgba(255,255,255,.02)
.song-list__edit
  left: 0
  border-color: rgba(255,255,255,.2)
  display: block
  position: absolute
  top: 50%
  margin-top: -9px
  width: 14px
  height: 14px
  line-height: 14px
  border: 1px solid #ccc
  background-position: -1000px
.song-list__header-name
  width: 68%
  float: left
  position: relative
  white-space: normal
.song-list__header-author
  width: 26%
  float: left
  padding-left: 20px
  box-sizing: border-box
.song-list__header-time
  position: absolute
  top: 0
  right: 38px
  width: 50px
.song-list__list
  overflow: hidden
  clear: both
  li
    border-bottom: 1px solid rgba(255,255,255,.02)
.song-list__item
  padding-left: 62px
  @extend .song-list__list
  position: relative
  padding-right: 100px
@mixin song-list-item-common
  line-height: 50px
  height: 50px
  overflow: hidden
  text-overflow: ellipsis
  font-size: 14px
  // opacity: .8
.song-list__item__edit
  @extend .song-list__edit
.song-list__item__onplay_icon
  position: absolute
  top: 50%
  left: 40px
  margin-top: -5px
  width: 10px
  height: 10px
  background: url('../assets/images/wave.gif')
  background-repeat: no-repeat
  overflow: hidden
.song-list__item__number
  left: 16px
  color: inherit
  text-align: right
  position: absolute
  top: 0
  width: 36px
  @include song-list-item-common
.song-list__item__number-playing
  position: absolute
  top: 50%
  left: 40px
  margin-top: -5px
  width: 10px
.song-list__item__name
  width: 68%
  float: left
  position: relative
  white-space: normal
  @include song-list-item-common
.song-list__item__name__txt
  // width: 399px
  max-width: 85%
  float: left
  overflow: hidden
  text-overflow: ellipsis
  margin-right: 830px
  white-space: nowrap
.song-list__item__artists
  width: 26%
  color: inherit
  float: left
  padding-left: 20px
  box-sizing: border-box
  white-space: nowrap
  @include song-list-item-common
  div
    display: inline
.song-list__item__artist__txt
  cursor: pointer
  color: rgba(255,255,255,.8)
  &:hover
    color: #fff
.song-list__item__duration
  @include song-list-item-common
  position: absolute
  top: 0
  right: 38px
  width: 50px
  color: inherit
.mod_list_menu
  position: absolute
  right: 0px
  top: 50%
  margin-top: -18px
  overflow: hidden
  opacity: 0
  pointer-events: none
  font-size: 0
  height: 36px
@mixin list_menu__item
  background-image: url('../assets/images/icon_list_menu2X.png')
  opacity: .5
  background-size: 200px auto
  display: inline-block
  width: 36px
  height: 36px
  background-repeat: no-repeat
  margin-right: 5px
  cursor: pointer
  &:hover
    opacity: 1
.list_menu__icon_play
  @include list_menu__item
  background-position: -120px 0
.list_menu__icon_pause
  @include list_menu__item
  background-position: -120px -200px
.list_menu__icon_add
  @include list_menu__item
  background-position: -120px -80px
.list_menu__icon_down
  @include list_menu__item
  background-position: -120px -120px
.list_menu__icon_share
  @include list_menu__item
  background-position: -120px -40px
.song-list__header,.song-list__item
  &:hover
    .mod_list_menu
      opacity: 1
      pointer-events: inherit
    .song-list__item__duration,.song-list__header-time
      opacity: 0
      pointer-events: none
    .list_menu__icon_delete
      opacity: .5
      &:hover
        opacity: 1
    .song-list__item__name__txt
      max-width: 60%
.list_menu__icon_delete
  position: absolute
  @include list_menu__item
  right: 50px
  background-position: -120px -160px
  opacity: 0
  margin-top: -18px
  top: 50%
</style>

