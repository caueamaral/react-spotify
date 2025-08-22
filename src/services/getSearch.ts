import axios from 'axios'
import type SearchResult from '../interfaces/SearchResult'

export default async function getSearch(accessToken: string, query: string): Promise<SearchResult> {
    const response = await axios.get<SearchResult>(
        `https://api.spotify.com/v1/search`,
        {
            params: {
                q: query,
                type: 'artist,track',
                limit: 5
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}