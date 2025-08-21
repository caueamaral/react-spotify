import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type Artist from '../interfaces/Artist'
import type Album from '../interfaces/Album'
import type TopTracks from '../interfaces/TopTracks'

import formatArrayWithCommas from '../functions/formatArrayWithCommas'
import getArtist from '../services/getArtist'
import getAlbums from '../services/getAlbums'
import getTopTracks from '../services/getTopTracks'
import Title from '../components/Title'
import AlbumCard from '../components/AlbumCard'

export default function ArtistInfo() {
    const accessToken = useAccessToken()
    const [artist, setArtist] = useState<Artist | null>(null)
    const [albums, setAlbums] = useState<Album[] | null>(null)
    const [topTracks, setTopTracks] = useState<TopTracks | null>(null)
    
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
        if (!accessToken || !id) return

        getTopTracks(accessToken, id)
            .then(response => setTopTracks(response))
    }, [albums])

    return (
        <>
            {
                !artist ? (
                    <Title text="Loading artist..." />
                ) : (
                    <article className="flex flex-col gap-5 md:flex-row">
                        <figure className="w-full aspect-square rounded-lg overflow-hidden md:max-w-105">
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                        <section>
                            <Title text={artist.name} />
                            <div className="mt-1">
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
                            {
                                !topTracks ? (
                                    <h2 className="text-xl font-medium mt-10">
                                        Loading top tracks...
                                    </h2>
                                ) : (
                                    <div className="mt-10">
                                        <h2 className="text-xl font-medium">
                                            Top Tracks
                                        </h2>
                                        <div className="mt-1">
                                            {topTracks.tracks.map(track => (
                                                <p key={track.id}>
                                                    {track.album.name}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                        </section>
                    </article>
                )
            }
            {
                !albums ? (
                    <Title text="Loading albums..." />
                ) : (
                    <article className="mt-8">
                        <Title text="Albums" />
                        <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
                            {albums.map((album: Album) => (
                                <AlbumCard key={album.id} album={album} />
                            ))}
                        </div>
                    </article>
                )
            }
        </>
    )
}