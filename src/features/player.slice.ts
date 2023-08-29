/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import data from "../data";

export interface ISong {
    id: number;
    title: string;
    singer: string;
    cover: string;
    src: string;
    img: string;
    album: string;
}


type SongID = ISong["id"];

interface IPlayerState {
    songs: ISong[];
    currentSong: ISong | null;
    isPlaying: boolean;
    volume: number;
    loop: false | true | 1;
    suffle: boolean;
}

const initialState: IPlayerState = {
    songs: data,
    currentSong: null,
    isPlaying: false,
    volume: 100,
    loop: false,
    suffle: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        togglePlay(state) {
            if (!state.currentSong) {
                state.currentSong = state.songs[0];
            }

            state.isPlaying = !state.isPlaying;
        },
        setSong(state, action: PayloadAction<SongID>) {
            const song = state.songs.find((song) => song.id == action.payload);


            if (song) {
                state.currentSong = song;
            }
        },
        next(state) {
            if (!state.currentSong) {
                state.currentSong = state.songs[0];
            } else {
                const currentSong = state.currentSong;

                const currentSongIndex = state.songs.findIndex(
                    (song) => song.id == currentSong.id
                );

                if (!state.loop || state.loop === 1) {
                    state.currentSong = state.songs[currentSongIndex + 1] || currentSong;
                } else {
                    state.currentSong =
                        state.songs[currentSongIndex + 1] || state.songs[0];
                }
            }
        },
        prev(state) {
            if (!state.currentSong) {
                state.currentSong = state.songs[state.songs.length - 1];
            } else {
                const currentSong = state.currentSong;

                const currentSongIndex = state.songs.findIndex(
                    (song) => song.id == currentSong.id
                );

                if (!state.loop || state.loop === 1) {
                    state.currentSong = state.songs[currentSongIndex - 1] || currentSong;
                } else {
                    state.currentSong =
                        state.songs[currentSongIndex - 1] ||
                        state.songs[state.songs.length - 1];
                }
            }
        },
        // setVolume(state, action: PayloadAction<number>) {

        // },
        setVolume(state, action: PayloadAction<number>) {
            const volume = Math.max(0, Math.min(action.payload, 100));
            state.volume = volume;
        },

        toggleLoop(state, action: PayloadAction<boolean>) {
            state.loop = action.payload;
        },

        // Giá trị của nó bằng false thì sẽ không can thiệp
        // Giá trị bằng true sẽ lặp lại bài hát hiện tại

        toggleShuffle(state) {
            state.suffle = !state.suffle;

            if (state.suffle) {
                const currentSong = state.currentSong;
                if (currentSong) {
                    const shuffledSongs = [...state.songs].filter(song => song.id !== currentSong.id);
                    shuffledSongs.sort(() => Math.random() - 0.5);
                    state.songs = [currentSong, ...shuffledSongs];
                }
            } else {
                // Nếu tính năng shuffle bị tắt, đưa danh sách bài hát về trạng thái ban đầu
                // state.songs = data;
            }
        }

    },
});

export default playerSlice;
