export default interface TopTracks {
    tracks: {
        id: number,
        album: {
            name: string
        }
    }[]
}