webpackJsonp([0],{GgLE:function(t,s){},nh2a:function(t,s,e){"use strict";var i=e("Dd8w"),n=e.n(i),l=e("NYxO"),a=e("gyMJ"),o=e("4www"),c={name:"SongList",data:function(){return{list:[],selectedItems:[],selectAllIconStyle:null}},created:function(){this.list=this.songs},watch:{songs:function(t,s){this.list=t}},props:{songs:{type:Array,default:function(){return[]}},setList:{type:Function,default:function(){return[]}},headerListMenuPlayStyle:{type:Function,default:function(t){return null}}},methods:n()({},Object(l.b)(["setPlayList","setPlaySong","setPlayFlag","setSearchContext","setSearchLoadingFlag","setSearchResult"]),{setPlay:function(t){if("[object Array]"===Object.prototype.toString.call(t)){this.setPlayList(t);for(var s=0;s<t.length;s++)if(t[s].available){this.setPlaySong(t[s]);break}}else this.onPlaySong.id==t.id?document.getElementsByTagName("audio")[0].play():this.setPlaySong(t);this.setPlayFlag(!0)},setPause:function(){document.getElementsByTagName("audio")[0].pause(),this.setPlayFlag(!1)},addPlay:function(t){this.setPlayList(t)},getSongDuration:function(t){var s=Math.floor(t/1e3/60),e=Math.floor(t/1e3)-60*s;return(s<10?"0"+s:s)+":"+(e<10?"0"+e:e)},standardizationArtistName:function(t){var s=t;return-1==t.indexOf("【")&&-1==t.indexOf("】")||(s=t.replace(/【|】/g,"")),s},selectedItemLabelStyle:function(t){return this.list[t]&&this.list[t].selected?{backgroundPosition:"-60px -80px",opacity:1}:null},listItemStyle:function(t){var s=void 0;return t.available||(s={pointerEvents:"none",opacity:".5"}),t.id===this.onPlaySong.id&&this.onPlayFlag&&(s={color:"#fff"}),s},MDeleteAll:function(){for(var t=[],s=0,e=0;e<this.list.length;e++)this.list[e].selected||(t[s++]=this.list[e]);this.list=t,console.log(t),this.setList(t)},MDeleteItem:function(t){this.list.splice(t,1),this.setList(this.list)},MSelectItem:function(t,s){this.list[t].selected=s.target.checked,this.setList(this.list)},MSelectAll:function(t){for(var s=!1,e=0;e<this.list.length;e++)if(!this.list[e].selected){s=!0;break}for(var i=0;i<this.list.length;i++)this.list[i].selected=s;this.setList(this.list)},MHandleArtistClick:function(t){var s=this;"/search"!==this.$router.path&&this.$router.push("/search"),this.setSearchResult([]),this.setSearchContext(t.name),this.setSearchLoadingFlag(!0),Object(a.b)(t.id).then(function(t){Object(o.a)(t.data.hotSongs).then(function(t){s.setSearchLoadingFlag(!1),s.setSearchResult(t)}).catch(function(t){s.setSearchLoadingFlag(!1),console.error(t.message)})})}}),computed:n()({},Object(l.c)({onPlayFlag:function(t){return t.onPlayFlag},onPlaySong:function(t){return t.onPlaySong}}),{selectAllLabelStyle:function(){for(var t=0;t<this.list.length;t++)if(!this.list[t].selected)return null;return{backgroundPosition:"-60px -80px",opacity:1}},addPlayList:function(){for(var t=[],s=0;s<this.list.length;s++)this.list[s].selected&&t.push(this.list[s]);return t},CModListMenuStyle:function(){return this.addPlayList.length>0?void 0:{display:"none"}},headerTimeStyle:function(){return 0===this.addPlayList.length?{opacity:1}:void 0},CHeaderListMenuPlayStyle:function(){return"/onplay"===this.$route.path?{display:"none"}:void 0}})},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"song-list__overview"},[e("ul",{staticClass:"song-list__header"},[e("li",{staticClass:"song-list__edit sprite",style:t.selectAllLabelStyle},[e("input",{attrs:{type:"checkbox"},on:{click:function(s){return t.MSelectAll(s)}}})]),t._v(" "),e("li",{staticClass:"song-list__header-name"},[e("span",[t._v("歌曲")]),t._v(" "),e("div",{staticClass:"mod_list_menu",style:t.CModListMenuStyle},[e("i",{staticClass:"list_menu__icon_play",style:t.CHeaderListMenuPlayStyle,on:{click:function(s){return t.setPlay(t.addPlayList)}}}),t._v(" "),e("i",{staticClass:"list_menu__icon_add",style:t.CHeaderListMenuPlayStyle,on:{click:function(s){return t.addPlay(t.addPlayList)}}}),t._v(" "),e("i",{staticClass:"list_menu__icon_down"}),t._v(" "),e("i",{staticClass:"list_menu__icon_share"})])]),t._v(" "),e("li",{staticClass:"song-list__header-author"},[t._v("歌手")]),t._v(" "),e("li",{staticClass:"song-list__header-time",style:t.headerTimeStyle},[t._v("时长")]),t._v(" "),e("i",{staticClass:"list_menu__icon_delete",style:t.CModListMenuStyle,on:{click:function(s){return t.MDeleteAll()}}})]),t._v(" "),e("ul",{staticClass:"song-list__list"},t._l(t.list,function(s,i){return e("li",{key:i,style:t.listItemStyle(s)},[e("div",{staticClass:"song-list__item"},[e("div",{staticClass:"song-list__item__edit sprite",style:t.selectedItemLabelStyle(i)},[e("input",{attrs:{type:"checkbox"},on:{click:function(s){return t.MSelectItem(i,s)}}})]),t._v(" "),s.id===t.onPlaySong.id&&t.onPlayFlag?e("i",{staticClass:"song-list__item__onplay_icon"}):e("div",{staticClass:"song-list__item__number"},[t._v(t._s(i+1))]),t._v(" "),e("div",{staticClass:"song-list__item__name"},[e("span",{staticClass:"song-list__item__name__txt"},[t._v(t._s(s.name))]),t._v(" "),e("div",{staticClass:"mod_list_menu"},[t.onPlaySong&&t.onPlaySong.id==s.id&&t.onPlayFlag?e("i",{staticClass:"list_menu__icon_pause",on:{click:function(s){return t.setPause()}}}):e("i",{staticClass:"list_menu__icon_play",on:{click:function(e){return t.setPlay(s)}}}),t._v(" "),e("i",{staticClass:"list_menu__icon_add",style:t.CHeaderListMenuPlayStyle,on:{click:function(e){return t.addPlay(s)}}}),t._v(" "),e("i",{staticClass:"list_menu__icon_down"}),t._v(" "),e("i",{staticClass:"list_menu__icon_share"})])]),t._v(" "),e("div",{staticClass:"song-list__item__artists"},[1===s.artists.length?e("div",[e("span",{staticClass:"song-list__item__artist__txt",on:{click:function(e){return t.MHandleArtistClick(s.artists[0])}}},[t._v("\n              "+t._s(t.standardizationArtistName(s.artists[0].name))+"\n            ")])]):1!=s.artists.length?e("div",t._l(s.artists,function(i,n){return e("div",{key:n},[e("span",{staticClass:"song-list__item__artist__txt",on:{click:function(s){return t.MHandleArtistClick(i)}}},[t._v("\n                "+t._s(t.standardizationArtistName(i.name))+"\n              ")]),t._v(" "),n!=s.artists.length-1?e("span",[t._v(" / ")]):t._e()])}),0):t._e()]),t._v(" "),e("div",{staticClass:"song-list__item__duration"},[t._v(t._s(t.getSongDuration(s.duration)))]),t._v(" "),e("i",{staticClass:"list_menu__icon_delete",on:{click:function(s){return t.MDeleteItem(i)}}})])])}),0)])},staticRenderFns:[]};var _=e("VU/8")(c,r,!1,function(t){e("GgLE")},null,null);s.a=_.exports}});