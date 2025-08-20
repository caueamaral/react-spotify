import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccessToken, getArtist } from '../services/spotify'
import type { Artist } from '../interfaces/Artist'

export default function ArtistInfo() {
    const [accessToken, setAccessToken] = useState('')
    const [artist, setArtist] = useState<Artist | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        getAccessToken()
            .then(token => setAccessToken(token))
    }, [])

    useEffect(() => {
        if(!id) return

        getArtist(accessToken, id)
            .then(response => {
                console.log('artist1', artist)

                setArtist(response)}
            )
    }, [accessToken])

    useEffect(() => {
        console.log('artist2', artist)
    }, [artist])

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
                        <figure className="w-128 max-w-full aspect-square rounded-md overflow-hidden mt-5">
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