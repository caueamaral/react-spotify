export default interface Album {
    id: number,
    name: string,
    release_date: string,
    total_tracks: number,
    images: {
        url: string
    }[],
    tracks: {
        items: {
            id: string,
            name: string,
            track_number: number,
            duration_ms: number
        }[]
    }
}