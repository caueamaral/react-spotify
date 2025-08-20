import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken, getArtist, getAlbums } from '../services/spotify'
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
        console.log('albums', albums)
    }, [albums])

    return (
        <>
            {
                !artist ? (
                    <p>Loading artist...</p>
                ) : (
                    <>
                         <h1 className="text-2xl font-medium">
                            {artist.name}
                        </h1>
                        <p className="text-gray-300 mt-1">
                            Popularity: {artist.popularity}
                        </p>
                        <figure className="w-96 max-w-full aspect-square rounded-md overflow-hidden mt-5">
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                    </>
                )
            }
        </>
    )
}