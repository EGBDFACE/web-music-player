<template>
  <div class="song-list__overview">
    <ul class="song-list__header">
        <li class="song-list__edit sprite">
          <input type="checkbox"/>
        </li>
        <li class="song-list__header-name">歌曲</li>
        <li class="song-list__header-author">歌手</li>
        <li class="song-list__header-time">时长</li>
    </ul>
    <ul class="song-list__list">
      <li v-for="(item,index) in songs" :key="index">
        <div class="song-list__item">
          <div class="song-list__item__edit sprite">
            <input type="checkbox" />
          </div>
          <div class="song-list__item__number">{{index + 1 }}</div>
          <div class="song-list__item__name">
            <span class="song-list__item__name__txt">{{item.name}}</span>
          </div>
          <div class="song-list__item__artists">
            
          </div>
        </div>
      </li>
    </ul>
  </div>  
</template>
<script>

export default {
    name: 'SongsList',
    props: {
      songs: {
        type: Array,
        default: () =>{
          return []
        }
      }
    }
}
</script>
<style lang='sass'>
.sprite
  background-image: url('../assets/images/icon_sprite.png')
  opacity: .2
  &:hover
    opacity: 1
.song-list__overview
  height: 830px
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
  paddign-left: 20px
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
  opacity: .8
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
  @include song-list-item-common
</style>

