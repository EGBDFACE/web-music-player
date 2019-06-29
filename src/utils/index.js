import { fetchCheckMusic } from '@/api';

class Song{
    constructor({artists, available, duration, id, name, selected}){
        this.artists = artists;
        this.available = available;
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.selected = selected;
    }
}

function formatHotSong(music){
    const song = new Song({
        artists: music.ar,
        duration: music.dt,
        id: music.id,
        name: music.name,
        selected: false
    })
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

export function createHotSongList (rawData){
    const songs = [];
    return new Promise ( resolve => {
        for(let i=0; i<rawData.length; i++){
            // songs[i] = await formatHotSong(rawData[i]);
            // console.log(songs[i]);
            formatHotSong(rawData[i])
            .then( result => {
                songs[i] = result
                if(i === rawData.length-1){
                    console.log(songs);
                    resolve(songs);
                }
            })
            .catch( err => {
                console.error(err.message);
            })
        }
    })
    // console.log(songs);
    // return songs;
}