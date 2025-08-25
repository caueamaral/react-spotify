import { useQuery } from '@tanstack/react-query'
import { useAccessToken } from '../contexts/AccessTokenContext'

import type Artist from '../interfaces/Artist'

import getArtists from '../services/getArtists'
import Title from '../components/Title'
import ArtistCard from '../components/ArtistCard'

export default function Artists() {
    const accessToken = useAccessToken()
    const fiveMinutes = 1000 * 60 * 5

    const { data: artistsRock, isLoading: loadingRock } = useQuery<Artist[]>({
        queryKey: ['artists', 'rock'],
        queryFn: () => getArtists(accessToken!, 'rock'),
        enabled: !!accessToken,
        staleTime: fiveMinutes
    })

    const { data: artistsPop, isLoading: loadingPop } = useQuery<Artist[]>({
        queryKey: ['artists', 'pop'],
        queryFn: () => getArtists(accessToken!, 'pop'),
        enabled: !!accessToken,
        staleTime: fiveMinutes
    })

    const { data: artistsCountry, isLoading } = useQuery<Artist[]>({
        queryKey: ['artists', 'country'],
        queryFn: () => getArtists(accessToken!, 'country'),
        enabled: !!accessToken,
        staleTime: fiveMinutes
    })

    const renderArtistsSection = (title: string, artists?: Artist[]) => (
        <article>
            <Title text={title} />
            <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                {artists?.map((artist, index) => (
                    <ArtistCard
                        key={artist.id}
                        artist={artist}
                        index={index}
                    />
                ))}
            </div>
        </article>
    )

    if (loadingRock || loadingPop) {
        return <Title text="Loading Artists..." />
    }

    return (
        <div className="grid gap-10">
            {renderArtistsSection('Rock Artists', artistsRock)}
            {renderArtistsSection('Pop Artists', artistsPop)}
            {renderArtistsSection('Country Artists', artistsCountry)}
        </div>
    )
}