
import { Link } from 'react-router-dom'
import formatText from '../functions/formatText'

import type Artist from '../interfaces/Artist'

export default function ArtistCard({ artist, index }: { artist: Artist, index: number }) {
    const image = artist.images[1] || artist.images[0] || null

    console.log('artist', artist)

    return (        
        <section
            key={artist.id}
            className="relative slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                {
                    !image ? (
                        <img
                            src="image-not-found.jpg"
                            alt="Image not found"
                            className="w-full object-cover"
                        />
                    ) : (
                        <img
                            src={image.url}
                            alt={artist.name}
                            className="w-full object-cover"
                        />
                    )
                }
            </figure>
            <figcaption className="mt-2 text-gray-400 text-sm">
                {artist.name}
            </figcaption>
            <Link
                to={`/artist/${artist.id}/${formatText(artist.name)}`}
                className="absolute inset-0"
            />
        </section>
    )
}