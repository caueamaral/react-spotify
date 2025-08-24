import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    function goBack() {
        navigate(-1)
    }

    useEffect(() => {
        if (!accessToken || !id) return

        Promise.all([
            getArtist(accessToken, id).then(setArtist),
            getAlbums(accessToken, id).then(setAlbums),
            getTopTracks(accessToken, id).then(setTopTracks)
        ])
            .finally(() => setIsLoading(false))

    }, [accessToken, id])
    return (
        <>
            <article className="relative">
                {isLoading ? (
                    <Title text="Artist info" />
                ) : artist ? (
                    <div className="flex flex-col mt-4 gap-5 md:flex-row slide-in">
                        <figure className="w-full aspect-square rounded-lg overflow-hidden md:max-w-105">
                            {
                                !artist.images[0] ? (
                                    <img
                                        src={`/src/images/image-not-found.jpg`}
                                        alt="Image not found"
                                        className="w-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        className="w-full object-cover rounded-lg"
                                    />
                                )
                            }
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
                                                    - {track.name}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                        </section>
                        <button onClick={goBack} className="text-gray-400 cursor-pointer underline absolute right-0 top-1">
                            Back
                        </button>
                    </div>
                ) : null}
            </article>
            
            <article className="mt-8">
                <Title text="Albums" />
                {isLoading ? (
                    <Title text="Loading albums..." />
                ) : albums ? (
                    <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
                        {albums.map((album, index) => (
                            <AlbumCard
                                key={album.id}
                                album={album}
                                index={index}
                            />
                        ))}
                    </div>
                ) : null}
            </article>
        </>
    )
}