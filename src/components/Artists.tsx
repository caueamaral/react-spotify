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
                        <Title text="Loading Rock Artists..." />
                    ) : (
                        <>
                            <Title text="Rock Artists" />
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsRock.map((artist, index) => (
                                    <ArtistCard
                                        key={artist.id}
                                        artist={artist}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </>
                    )
                }
            </article>
            <article className="mt-10">
                {
                    !artistsPop.length ? (
                        <Title text="Loading Pop Artists..." />
                    ) : (
                        <>
                            <Title text="Pop Artists" />
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsPop.map((artist, index) => (
                                    <ArtistCard
                                        key={artist.id}
                                        artist={artist}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </>
                    )
                }
            </article>
            <article className="mt-10">
                {
                    !artistsCountry.length ? (
                        <Title text="Loading Country Artists..." />
                    ) : (
                        <>
                            <Title text="Country Artists" />
                            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                                {artistsCountry.map((artist, index) => (
                                    <ArtistCard
                                        key={artist.id}
                                        artist={artist}
                                        index={index}
                                    />
                                ))}
                            </div>   
                        </>
                    )
                }
            </article>
        </>
    )
}