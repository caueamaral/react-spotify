import axios from 'axios'

import type TopTracks from '../interfaces/TopTracks'

export default async function getTopTracks(accessToken: string, artistId: string) {
    try {
        const response = await axios.get<TopTracks>(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        return response.data
    }
    catch (err) {
        console.error('getTopTracks Spotify API error: ', err)
        throw err
    }
}