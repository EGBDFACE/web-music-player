<template>
  <div class="song-list__overview">
    <ul class="song-list__header">
        <li class="song-list__edit sprite" :style="selectAllLabelStyle">
          <input type="checkbox" @click="selectAll()" />
        </li>
        <li class="song-list__header-name">
          <span>歌曲</span>
          <div class="mod_list_menu" :style="modListMenuStyle(addPlayList)">
              <i class="list_menu__icon_play" @click="setPlay(addPlayList)" :style="headerListMenuPlayStyle(addPlayList)"></i>
              <i class="list_menu__icon_add"></i>
              <i class="list_menu__icon_down"></i>
              <i class="list_menu__icon_share"></i>
            </div>
          </li>
        <li class="song-list__header-author">歌手</li>
        <li class="song-list__header-time" :style="headerTimeStyle">时长</li>
        <i class="list_menu__icon_delete" @click="deleteAll()" :style="headerMenuDelete(addPlayList)"></i>
    </ul>
    <ul class="song-list__list">
      <li v-for="(item,index) in songs" :key="index" :style="listItemStyle(item)">
        <div class="song-list__item">
          <div class="song-list__item__edit sprite" :style="selectedItemLabelStyle(index)">
            <input type="checkbox"  @click="selectItem(index)" />
          </div>
          <div class="song-list__item__number">{{index + 1 }}</div>
          <div class="song-list__item__name">
            <span class="song-list__item__name__txt">{{item.name}}</span>
            <div class="mod_list_menu">
              <i class="list_menu__icon_play" @click="setPlay(item)"></i>
              <i class="list_menu__icon_add"></i>
              <i class="list_menu__icon_down"></i>
              <i class="list_menu__icon_share"></i>
            </div>
          </div>
          <div class="song-list__item__artists">
            <div v-if="item.artists.length === 1">
              <span class="song-list__item__artist__txt">{{standardizationArtistName(item.artists[0].name)}}</span>
            </div>
            <div v-else-if="item.artists.length != 1">
              <div v-for="(artist,subIndex) in item.artists" :key="subIndex">
                <span class="song-list__item__artist__txt">{{standardizationArtistName(artist.name)}}</span>
                <span v-if="subIndex != item.artists.length-1 "> / </span>
              </div>
            </div>
          </div>
          <div class="song-list__item__duration">{{getSongDuration(item.duration)}}</div>
          <i class="list_menu__icon_delete" @click="deleteItem(index)"></i>
        </div>
      </li>
    </ul>
  </div>  
</template>
<script>
 
export default {
    name: 'SongsList',
    data: function(){
      return {
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
    props: {
      songs: {
        type: Array,
        default: () =>{
          return []
        }
      },
      deleteItem: {},
      selectItem: {},
      selectAll: {},
      deleteAll: {},
      setPlayList: {
        type: Function,
        default: v=>{
          return null
        }
      },
      setPlayFlag: {},
      setPlaySong: {},
      modListMenuStyle: {},
      headerMenuDelete: {},
      headerListMenuPlayStyle:{
        type: Function,
        default: v=>{
          return null;
        }
      }
    },
    methods: {
      setPlay(value){
        this.setPlayList(value);
        this.setPlayFlag(true);
        if(Object.prototype.toString.call(value) === '[object Array]'){
          this.setPlaySong(value[0]);
        }else{
          this.setPlaySong(value);
        }
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
        if((this.songs[index])&&(this.songs[index].selected)){
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
        return style;
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
      selectAllLabelStyle(){ 
        let select_all_style = {
          backgroundPosition: '-60px -80px',
          opacity: 1
        };
        for(let i=0;i<this.songs.length;i++){
          if(!this.songs[i].selected){
            return null; 
          }
        }
        return select_all_style;
      },
      addPlayList(){
        let selectedItemArray = [];
        for(let i=0;i<this.songs.length;i++){
          if(this.songs[i].selected){
            selectedItemArray.push(this.songs[i]);
          }
        }
        return selectedItemArray;
      },
      onPlaySong(){
        return this.$store.state.onPlaySong;
      },
      headerTimeStyle(){
        if(this.addPlayList.length === 0){
          return {
            opacity: 1
          }
        }else{
          return undefined
        }
      }
      // activeListMenuStyle(){
      //   return this.addPlayList.length > 0 ? null : { display : 'none' };
      // }
      // selectedItemLabelStyle: function(index){
      //   if((this.songs[index])&&(this.songs[index].selected)){
      //     return {
      //       backgroundPosition: '-60px -80px',
      //       opacity: 1
      //     }
      //   }else{
      //     return null
      //   }
      // }
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
  height: 90%
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

