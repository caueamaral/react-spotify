import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type { Artist } from '../interfaces/Artist'
import type { Album } from '../interfaces/Album'

import formatArrayWithCommas from '../functions/formatArrayWithCommas'
import getAlbums from '../services/getAlbums'
import getArtist from '../services/getArtist'

export default function ArtistInfo() {
    const accessToken = useAccessToken()
    const [artist, setArtist] = useState<Artist | null>(null)
    const [albums, setAlbums] = useState<Album[] | null>(null)
    
    const { id } = useParams<{ id: string }>()

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
                    <article className="flex flex-col gap-5 md:flex-row">
                        <figure className="w-full aspect-square rounded-lg overflow-hidden md:max-w-96">
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                        <section>
                            <h1 className="text-2xl font-medium">
                                {artist.name}
                            </h1>
                            <div className="mt-5">
                                <p className="text-gray-400">
                                    Popularity: {artist.popularity}
                                </p>
                                <p className="text-gray-400">
                                    Followers: {artist.followers.total}
                                </p>
                                <p className="text-gray-400">
                                    Genres: {formatArrayWithCommas(artist.genres)}
                                </p>
                            </div>
                        </section>
                    </article>
                )
            }
            {
                !albums ? (
                    <p>Loading albums...</p>
                ) : (
                    <article className="mt-5">
                        <h1 className="text-2xl font-medium">
                            Albums
                        </h1>
                        <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
                            {albums.map((album: Album) => (
                                <section key={album.id}>
                                    <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                                        <img
                                            src={album.images[1]?.url}
                                            alt={album.name}
                                            className="w-full object-cover"
                                        />
                                    </figure>
                                    <figcaption className="mt-2 text-gray-400 text-sm">
                                        {album.name}
                                    </figcaption>
                                </section>
                            ))}
                        </div>
                    </article>
                )
            }
        </>
    )
}