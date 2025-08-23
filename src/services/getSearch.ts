import axios from 'axios'
import type SearchResult from '../interfaces/SearchResult'

export default async function getSearch(accessToken: string, query: string): Promise<SearchResult> {
    try {
        const response = await axios.get<SearchResult>(
            `https://api.spotify.com/v1/search`,
            {
                params: {
                    q: query,
                    type: 'artist,album',
                    limit: 1
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    catch (err) {
        console.error('getSearch Spotify API error: ', err)
        throw err
    }
}