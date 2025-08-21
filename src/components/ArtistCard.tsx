
import { Link } from 'react-router-dom'
import formatText from '../functions/formatText'

import type { Artist } from '../interfaces/Artist'

export default function ArtistCard({ artist }: { artist: Artist }) {
    return (        
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
    )
}