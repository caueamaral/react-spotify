import Title from './Title'
import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'
import getSearch from '../services/getSearch'
import ArtistCard from '../components/ArtistCard'
import AlbumCard from '../components/AlbumCard'

import type SearchResult from '../interfaces/SearchResult'

export default function SearchInfo() {
    const accessToken = useAccessToken()
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { query } = useParams<{ query: string }>()

    useEffect(() => {
        if (!accessToken || !query) return

        getSearch(accessToken, query)
            .then(setSearchResult)
            .finally(() => setIsLoading(false))

    }, [accessToken, query])

    if (isLoading) {
        return <Title text="Searching..." />
    }

    return (
        <>
            {searchResult?.artists?.items.length ? (
                <article>
                    <Title text={`Artist found`} />
                    <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                        <ArtistCard
                            key={searchResult.artists.items[0].id}
                            artist={searchResult.artists.items[0]}
                            index={1}
                        />
                    </div>
                </article>
            ) : null}

            {searchResult?.albums?.items.length ? (
                <article className="mt-10">
                    <Title text={`Album found`} />
                    <div className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                        <AlbumCard
                            key={searchResult.albums.items[0].id}
                            album={searchResult.albums.items[0]}
                            index={1}
                        />
                    </div>
                </article>
            ) : null}
        </>
    )
}