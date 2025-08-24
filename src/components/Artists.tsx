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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!accessToken) return

        Promise.all([
            getArtists(accessToken, 'rock').then(response => setArtistsRock(response)),
            getArtists(accessToken, 'pop').then(response => setArtistsPop(response)),
            getArtists(accessToken, 'country').then(response => setArtistsCountry(response))
        ])
            .finally(() => setIsLoading(false))

    }, [accessToken])

    const renderArtistsSection = (title: string, artists: Artist[]) => (
        <article className="mt-10">
            {isLoading ? (
                <Title text={`Loading ${title}...`} />
            ) : (
                <>
                    <Title text="Pop Artists" />
                    <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                        {artists.map((artist, index) => (
                            <ArtistCard
                                key={artist.id}
                                artist={artist}
                                index={index}
                            />
                        ))}
                    </div>
                </>
            )}
        </article>
    )

    return (
        <>
            {renderArtistsSection('Rock Artists', artistsRock)}
            {renderArtistsSection('Pop Artists', artistsPop)}
            {renderArtistsSection('Country Artists', artistsCountry)}
        </>
    )
}