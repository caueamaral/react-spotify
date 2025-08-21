export default interface TopTracks {
    tracks: {
        id: number,
        name: string,
        album: {
            name: string
        }
    }[]
}