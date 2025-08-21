import axios from 'axios'

export const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})


export async function getAlbums(accessToken: string, artistId: string) {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data.items
}