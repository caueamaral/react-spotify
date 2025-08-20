import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken, getArtist, getAlbums } from '../services/spotify'
import formatArrayWithCommas from '../functions/formatArrayWithCommas'
import type { Artist } from '../interfaces/Artist'

export default function ArtistInfo() {
    const [accessToken, setAccessToken] = useState('')
    const [artist, setArtist] = useState<Artist | null>(null)
    const [albums, setAlbums] = useState(null)
    
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        getAccessToken()
            .then(token => setAccessToken(token))
    }, [])

    useEffect(() => {
        if (!accessToken || !id) return

        getArtist(accessToken, id)
            .then(response => {
                setArtist(response)}
            )
    }, [accessToken])

    useEffect(() => {
        if (!accessToken || !id) return

        getAlbums(accessToken, id)
            .then(response => setAlbums(response))
    }, [artist])

    useEffect(() => {
        console.log('artist', artist)
    }, [albums])

    return (
        <>
            {
                !artist ? (
                    <p>Loading artist...</p>
                ) : (
                    <section className="flex flex-col gap-5 md:flex-row">
                        <figure className="w-full aspect-square rounded-lg overflow-hidden md:max-w-96">
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                        <div>
                            <h1 className="text-2xl font-medium">
                                {artist.name}
                            </h1>
                            <div className="mt-5">
                                <p className="text-gray-300">
                                    Popularity: {artist.popularity}
                                </p>
                                <p className="text-gray-300">
                                    Followers: {artist.followers.total}
                                </p>
                                <p className="text-gray-300">
                                    Genres: {formatArrayWithCommas(artist.genres)}
                                </p>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    )
}