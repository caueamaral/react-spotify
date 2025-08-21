import { useEffect, useState } from 'react'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type Artist from '../interfaces/Artist'

import getArtists from '../services/getArtists'
import Title from '../components/Title'
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
                        <Title text="Loading artists..." />
                    ) : (
                        <>
                            <Title text="Artists in: Rock" />
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
                        <Title text="Loading artists..." />
                    ) : (
                        <>
                            <Title text="Artists in: Pop" />
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
                        <Title text="Loading artists..." />
                    ) : (
                        <>
                            <Title text="Artists in: Country" />
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