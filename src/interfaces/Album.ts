export default interface Album {
    id: number,
    name: string,
    images: {
        url: string
    }[]
}