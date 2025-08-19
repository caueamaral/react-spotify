import axios from 'axios'
import { useEffect, useState } from 'react'
import type { Artist } from '../interfaces/Artist'
import { getAccessToken } from '../services/spotify'

export default function Artists() {
    const [accessToken, setAccessToken] = useState('')
    const [artists, setArtists] = useState<Artist[]>([])

    useEffect(() => {
        getAccessToken()
            .then(token => setAccessToken(token))
    }, [])

    useEffect(() => {
        if (!accessToken) return

        const fetchArtists = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/search',
                {
                    params: {
                        q: 'rock',
                        type: 'artist',
                        limit: 16
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            setArtists(response.data.artists.items)
        }

        fetchArtists()
    }, [accessToken])

    return  (
        <article>
            <h1 className="text-2xl font-medium">
                Artists in: Rock
            </h1>
            <section className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                {artists.map(artist => (
                    <div key={artist.id}>
                        <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                            <img
                                src={artist.images[0]?.url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                        <figcaption className="mt-2 text-gray-300 text-sm">
                            {artist.name}
                        </figcaption>
                    </div>
                ))}
            </section>
        </article>
    )
}