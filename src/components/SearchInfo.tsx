import Title from './Title'
import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { useAccessToken } from '../contexts/AccessTokenContext'
import getSearch from '../services/getSearch'
import type SearchResult from '../interfaces/SearchResult'
import type Artist from '../interfaces/Artist'
import type Track from '../interfaces/Track'

export default function SearchInfo() {
    const accessToken = useAccessToken()
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
    const { query } = useParams<{ query: string }>()

    useEffect(() => {
        if (!accessToken || !query) return

        getSearch(accessToken, query)
            .then(response => setSearchResult(response))
    }, [accessToken, query])

    useEffect(() => {
        if (!accessToken || !query) return

        console.log('searchResult', searchResult)
    }, [searchResult, query])

    return (
        <>
            {
                !searchResult || !searchResult.artists ? (
                    <Title text="Loading artists results..." />
                ) : (
                    <article>
                        <Title text={`Artists found for: ${query}`} />
                        <div className="mt-4">
                            {searchResult.artists.items.map((item: Artist) => (
                                <div key={item.id}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </article>
                )
            }
            {
                !searchResult || !searchResult.tracks ? (
                    <Title text="Loading tracks results..." />
                ) : (
                    <article className="mt-10">
                        <Title text={`Tracks found for: ${query}`} />
                        <div className="mt-4">
                            {searchResult.tracks.items.map((item: Track) => (
                                <div key={item.id}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </article>
                )
            }
        </>
    )
}