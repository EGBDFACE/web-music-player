<template>
    <div class="artist-detail"
        >
        <div class="artist-detail_header">
            <div class="header-pic_viewport">
                <img :src='CArtistPicUrl' />
            </div>
            <div class="header-desc">
                <div class="header-desc_name">{{artistState.info.name}}</div>
                <div class="header-desc_brief">
                    <p class="brief_detail">{{artistState.desc.brief}}</p>
                    <input type="checkbox"
                        id="show-brief-more"
                        class="brief-more_input"
                        @focus="MHandleMoreBriefClick(true)"
                        @blur="MHandleMoreBriefClick(false)"
                        />
                    <label class="brief-more_label"
                        for="show-brief-more"
                        >[更多]</label>
                    <div class="brief-more_detail"
                        v-if="showMoreBrief">
                        <div class="brief-more_detail_viewport">
                            <h1>歌手简介</h1>
                            <p>{{artistState.desc.brief}}</p>
                            <div v-for="(item, index) in artistState.desc.introduction" :key="index">
                                <h3>{{item.ti}}</h3>
                                <p>{{item.txt}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-desc_works">
                    <div class="works-songs">
                        <span>单曲</span>
                        <strong>{{artistState.info.songSize}}</strong>
                    </div>
                    <div class="works-albums">
                        <span>专辑</span>
                        <strong>{{artistState.info.albumSize}}</strong>
                    </div>
                    <div class="works-mvs">
                        <span>MV</span>
                        <strong>{{artistState.info.mvSize}}</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="artist-detail_hot-songs">
            <h2>热门歌曲</h2>
            <SongList 
                :deleteItem="MDelArtistHotSongItem"
                :setPlayFlag="setPlayFlag"
                :setPlayList="setPlayList"
                :setPlaySong="setPlaySong"
                :songs="hotSongs"
            />
        </div>
        <div class="artist-detail_albums"></div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SongList from '@/components/SongList.vue';
import { createHotSongList } from '@/utils/song';

export default {
    name: 'ArtistDetail',
    data(){
        return {
            showMoreBrief: false,
            hotSongs: []
        }
    },
    components: {
        SongList
    },
    mounted(){
        this.MHotSongs();
    },
    watch: {
        // artistState:{
        //     handler(nv, ov){
        //         console.log(nv); // 监听对象属性 每个属性触发一次
        //     },
        //     deep: true
        //     // console.log(nv);
        //     // console.log(ov);
        //     // if((nv != ov)&&(nv.info.id != ov.info.id)){
        //     //     this.MHotSongs();
        //     // }
        // },
        artistId(nv,ov){
            this.MHotSongs();
        }
    },
    props: {
        // setPlayFlag: {
        //     type: Function,
        //     default: v=>{
        //         return null
        //     }
        // },
        // setPlayList: {
        //     type: Function,
        //     default: v=>{
        //         return null
        //     }
        // },
        // setPlaySong: {
        //     type: Function,
        //     default: v=>{
        //         return null
        //     }
        // }
        // artistDetailHeight: {
        //     type: String,
        //     default: () => {
        //         return ''
        //     }
        // }
    },
    computed: {
        ...mapState({
            artistState: state => state.search.artist,
            artistId: state => state.search.artist.info.id
        }),
        CArtistPicUrl(){
            return this.artistState.info.picUrl + '?param=300y300' + '?max_age=2592000'
        },
        // CArtistHeight(){
        //     return `height: ${this.artistDetailHeight}`
        // }
    },
    methods: {
        ...mapActions([
            'setPlayFlag',
            'setPlayList',
            'setPlaySong'
        ]),
        MHandleMoreBriefClick(value){
            console.log(value);
            this.showMoreBrief = value;
        },
        MHotSongs(){
            // console.log(createHotSongList(this.artistState.songs.hotSongs));
            // return createHotSongList(this.artistState.songs.hotSongs);
            createHotSongList(this.artistState.songs.hotSongs.slice(0,10))
            .then( result => {
                console.log(result);
                // return result;
                this.hotSongs = result;
            })
            .catch( err => {
                console.error(err.message);
            })
        },
        MDelArtistHotSongItem(index){

        }
    }
}
</script>

<style lang="scss" scoped>
.artist-detail{
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.artist-detail_header{
    width: 100%;
    height: 260px;
    display: flex;
}
.header-pic_viewport{
    display: inline-block;
    width: 30%;
    // height: 100%;
    height: 0;
    padding-bottom: 30%;
    position: relative;
    img{
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
    }
}
.header-desc{
    // display: inline-block;
    // width: 80%;
    width: 65%;
    margin-left: 5%;
    height: 100%;
    position: relative;
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: center;
}
.header-desc_name{
    font-size: 38px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
.header-desc_brief{
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    width: 90%;
    display: flex;
    position: relative;
}
.brief_detail{
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.brief-more_input{
    position: absolute;
    right: 15px;
    top: 50%;
    height: 10px;
    margin-top: -5px;
    opacity: 0;
    pointer-events: none;
}
.brief-more_label{
    display: inline-block;
    width: 10%;
    margin-left: 2%;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover{
        color: #fff;
    }
}
.brief-more_detail{
    position: absolute;
    // z-index: 100;
    background-color: #292a2b;
    width: 100%;
    box-shadow: 0 0 4px rgba(0,0,0,.35);
    border-radius: 4px;
    z-index: 2;
    p{
        line-height: 1.5;
        text-align: justify;
        word-break: break-all;
        margin: 0 24px 0 19px;
    }
    h1{
        margin-left: 19px;
    }
    h3{
        margin-left: 19px;
    }
}
.brief-more_detail_viewport{
    max-height: 400px;
    margin: 30px 5px 30px 10px;
    overflow-y: auto;
}
.header-desc_works{
    height: 30px;
    overflow: hidden;
    line-height: 30px;
}
.works-songs, .works-albums, .works-mvs{
    display: inline-block;
    font-size: 18px;
    margin-right: 40px;
    strong{
        font-size: 25px;
        font-weight: 400;
        margin-left: 10px;
    }
    cursor: pointer;
    &:hover{
        color: #fff;
    }
}
.artist-detail_hot-songs{
    margin-top: 20px;
}
</style>
