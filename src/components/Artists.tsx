import { useEffect, useState } from 'react'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type { Artist } from '../interfaces/Artist'

import getArtists from '../services/getArtists'
import ArtistCard from '../components/ArtistCard'

export default function Artists() {
    const accessToken = useAccessToken()
    const [artistsRock, setArtistsRock] = useState<Artist[]>([])
    const [artistsPop, setArtistsPop] = useState<Artist[]>([])
    const [artistsCountry, setArtistsCountry] = useState<Artist[]>([])

    useEffect(() => {
        if (!accessToken) return

        getArtists(accessToken, 'rock')
            .then(response => setArtistsRock(response))

        getArtists(accessToken, 'pop')
            .then(response => setArtistsPop(response))

        getArtists(accessToken, 'country')
            .then(response => setArtistsCountry(response))
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
                                    <ArtistCard artist={artist} />
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
                                    <ArtistCard artist={artist} />
                                ))}
                            </div>
                        </>
                    )
                }
            </article>
            <article className="mt-10">
                {
                    !artistsCountry.length ? (
                        <h1 className="text-2xl font-medium">
                            Loading artists...
                        </h1>
                    ) : (
                        <>
                            <h1 className="text-2xl font-medium">
                                Artists in: Country
                            </h1>
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsCountry.map(artist => (
                                    <ArtistCard artist={artist} />
                                ))}
                            </div>   
                        </>
                    )
                }
            </article>
        </>
    )
}