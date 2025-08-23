import type Artist from './Artist'
import type Album from './Album'

export default interface SearchResult {
    artists?: {
        items: Artist[]
    },
    albums?: {
        items: Album[]
    }
}