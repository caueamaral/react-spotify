import type Artist from './Artist'
import type Track from './Track'

export default interface SearchResult {
    artists?: {
        items: Artist[]
    },
    tracks?: {
        items: Track[]
    }
}