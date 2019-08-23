<template>
    <div class="bg_player" :style="CStyle"/>
</template>

<script>
import { mapState } from 'vuex';
import { fetchSongDetail } from '@/api';

export default {
    name: 'BackgroundPic',
    data: function () {
        return {
            songPicSrc: undefined
        }
    },
    watch: {
        onPlaySong (nv, ov) {
            if ((nv != ov) && (nv.id != ov.id)) {
                fetchSongDetail(nv.id)
                .then ( res => {
                    this.songPicSrc = res.data.songs[0].al.picUrl+'?max_age=2592000';
                })
                .catch( err => {
                    console.error(err.message);
                })
            }
        }
    },
    computed: {
        ...mapState({
            onPlaySong: state => state.onPlaySong
        }),
        CStyle() {
            if (this.onPlaySong) {
                return {
                    backgroundImage: `url(${this.songPicSrc})`
                }
            } else {
                return {
                    display: 'none'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.bg_player {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    // -webkit-filter: blur(65px);
    // filter: blur(65px);
    opacity: .6;
    // opacity: .3;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>