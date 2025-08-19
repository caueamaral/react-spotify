import { useEffect, useState } from 'react'

export default function Artists() {
    const clientId = import.meta.env.VITE_CLIENT_ID
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET

    const [accessToken, setAccessToken] = useState('')
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const authHeader = btoa(`${clientId}:${clientSecret}`)

        fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`
            },
            body: `grant_type=client_credentials`
        })
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    useEffect(() => {
        if (!accessToken) return

        const fetchArtists = async () => {
            const response = await fetch(
                'https://api.spotify.com/v1/search?q=rock&type=artist&limit=16',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            const data = await response.json()
            setArtists(data.artists.items)
        }

        fetchArtists()
    }, [accessToken])

    return  (
        <article>
            <h1 className="text-2xl font-medium">
                Artists in: Rock
            </h1>
            <section className="grid gap-5 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                {artists.map(artist => (
                    <div key={artist.id}>
                        <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                            <img
                                src={artist.images[0]?.url}
                                alt={artist.name}
                                className="w-full object-cover"
                            />
                        </figure>
                        <figcaption className="mt-2 text-gray-300 text-sm">
                            {artist.name}
                        </figcaption>
                    </div>
                ))}
            </section>
        </article>
    )
}