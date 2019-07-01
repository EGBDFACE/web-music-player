import { fetchCheckMusic } from '@/api';

class Song{
    constructor({album, artists, available, duration, id, name, selected}){
        this.album = album;
        this.artists = artists;
        this.available = available || true;
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.selected = selected || false;
    }
}
export function formatSong(music){
    const song = new Song({
        album: music.al,
        artists: music.ar,
        duration: music.dt,
        id: music.id,
        name: music.name
    });
    return song;
}

export function createSonglist(rawData){
    const songlist = [];
    for(let i=0; i<rawData.length; i++){
        songlist[i] = formatSong(rawData[i]);
    }
    return songlist;
}

function formatHotSong(music){
    const song = new Song({
        album: music.al,
        artists: music.ar,
        available: true,
        duration: music.dt,
        id: music.id,
        name: music.name,
        selected: false
    })
    // return song;
    return new Promise((resolve) => {
        fetchCheckMusic(music.id)
        .then( () => {
            song.available = true;
            // return song;
            resolve(song);
        })
        .catch( (err) => {
            console.error(err.message);
            song.available = false;
            // return song;
            resolve(song);
        })
    })
}

export async function createHotSongList ( rawData ){
    const songs = [];
    for(let i=0; i<rawData.length; i++){
        songs[i] = await formatHotSong(rawData[i]);
        // console.log(i);
    }
    return songs;
}
// export function createHotSongList (rawData){
//     const songs = [];
//     for (let i=0; i<rawData.length; i++){
//         songs[i] = formatHotSong(rawData[i]);
//         (function(j){
//             fetchCheckMusic(songs[j].id)
//             .then( () => {
//                 songs[j].available = true;
//             })
//             .catch( (err) => {
//                 console.error(err.message);
//                 songs[j].available = false;
//             })
//         })(i);
        
//     }
//     // return new Promise ( resolve => {
//     //     for(let i=0; i<rawData.length; i++){
//     //         // songs[i] = await formatHotSong(rawData[i]);
//     //         // console.log(songs[i]);
//     //         formatHotSong(rawData[i])
//     //         .then( result => {
//     //             songs[i] = result
//     //             if(i === rawData.length-1){
//     //                 // console.log(songs);
//     //                 resolve(songs);
//     //             }
//     //         })
//     //         .catch( err => {
//     //             console.error(err.message);
//     //         })
//     //     }
//     // })
//     // console.log(songs);
//     // return songs;
// }
