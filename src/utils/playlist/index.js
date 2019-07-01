// import { createHotSongList as createSongList } from '../song';
import { createSonglist } from '../song';

class Playlist {
    constructor({id,name,picUrl,playCount,songs}){
        this.id = id;
        this.name = name;
        this.picUrl = picUrl;
        this.playCount = playCount;
        this.songs = songs;
    }
}

export function formatPlaylist(list){
    // const playlistSongs = createSongList(list.tracks)
    // const playlistSongs = await createSongList(list.tracks);
    let songlist = [];
    if(list.tracks){
        songlist = createSonglist(list.tracks);
    }
    // console.log(songlist);
    const playlist = new Playlist({
        id: list.id,
        name: list.name,
        picUrl: list.coverImgUrl || list.picUrl,
        playCount: list.playCount,
        songs: songlist
    });
    return playlist;
}

export function createPlaylists(rawData){
    const playlists = [];
    for(let i=0; i<rawData.length; i++){
        playlists[i] = formatPlaylist(rawData[i]);
    }
    return playlists;
}