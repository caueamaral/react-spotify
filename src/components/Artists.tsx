import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type { Artist } from '../interfaces/Artist'

import getArtists from '../services/getArtists'
import formatText from '../functions/formatText'


export default function Artists() {
    const accessToken = useAccessToken()
    const [artistsRock, setArtistsRock] = useState<Artist[]>([])
    const [artistsPop, setArtistsPop] = useState<Artist[]>([])

    useEffect(() => {
        if (!accessToken) return

        getArtists(accessToken, 'rock')
            .then(response => setArtistsRock(response))

        getArtists(accessToken, 'pop')
            .then(response => setArtistsPop(response))
    }, [accessToken])

    return (
        <>
            <article>
                {
                    !artistsRock.length ? (
                        <h1 className="text-2xl font-medium">
                            Loading artists...
                        </h1>
                    ) : (
                        <>
                            <h1 className="text-2xl font-medium">
                                Artists in: Rock
                            </h1>
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsRock.map(artist => (
                                    <section key={artist.id} className="relative">
                                        <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                                            <img
                                                src={artist.images[1]?.url}
                                                alt={artist.name}
                                                className="w-full object-cover"
                                            />
                                        </figure>
                                        <figcaption className="mt-2 text-gray-400 text-sm">
                                            {artist.name}
                                        </figcaption>
                                        <Link to={`/artist/${artist.id}/${formatText(artist.name)}`} className="absolute inset-0"></Link>
                                    </section>
                                ))}
                            </div>   
                        </>
                    )
                }
            </article>
            <article className="mt-10">
                {
                    !artistsPop.length ? (
                        <h1 className="text-2xl font-medium">
                            Loading artists...
                        </h1>
                    ) : (
                        <>
                            <h1 className="text-2xl font-medium">
                                Artists in: Pop
                            </h1>
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsPop.map(artist => (
                                    <section key={artist.id} className="relative">
                                        <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                                            <img
                                                src={artist.images[1]?.url}
                                                alt={artist.name}
                                                className="w-full object-cover"
                                            />
                                        </figure>
                                        <figcaption className="mt-2 text-gray-400 text-sm">
                                            {artist.name}
                                        </figcaption>
                                        <Link to={`/artist/${artist.id}/${formatText(artist.name)}`} className="absolute inset-0"></Link>
                                    </section>
                                ))}
                            </div>   
                        </>
                    )
                }
            </article>
        </>
    )
}