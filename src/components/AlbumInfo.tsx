import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'
import getAlbum from '../services/getAlbum'

import formatDate from '../functions/formatDate'
import formatDuration from '../functions/formatDuration'

import type Album from '../interfaces/Album'
import Title from '../components/Title'

export default function AlbumInfo() {
    const accessToken = useAccessToken()
    const [album, setAlbum] = useState<Album | null>(null)
    
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (!accessToken || !id) return

        getAlbum(accessToken, id)
            .then(response => {
                setAlbum(response)}
            )
    }, [accessToken])

    useEffect(() => {
        if (!accessToken || !id) return

        console.log('album', album)
    }, [album])

    return (
        <>
            {
                !album ? (
                    <Title text="Loading album..." />
                ) : (
                    <article>
                        <Title text="Album info" />
                        <div className="flex flex-col mt-4 gap-5 md:flex-row">
                            <figure className="w-full aspect-square rounded-lg overflow-hidden md:max-w-105">
                                <img
                                    src={album.images[0].url}
                                    alt={album.name}
                                    className="w-full object-cover rounded-lg"
                                />
                            </figure>
                            <section>
                                <Title text={album.name} />
                                <div className="mt-1">
                                    <p className="text-gray-400">
                                        Release date: {formatDate(album.release_date)}
                                    </p>
                                    <p className="text-gray-400">
                                        Total tracks: {album.total_tracks}
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <h2 className="text-xl font-medium">
                                        Tracks
                                    </h2>
                                    <div>
                                        {album.tracks.items.map(item => (
                                            <p key={item.id} className="mt-3">
                                                {item.track_number}-
                                                <span className="ml-1">{item.name}</span>
                                                <span className="text-gray-400 text-sm ml-1">
                                                    ({formatDuration(item.duration_ms)})
                                                </span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </article>
                )
            }
        </>
    )
}