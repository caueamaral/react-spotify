import { Link } from 'react-router-dom'
import formatText from '../functions/formatText'

import type Album from '../interfaces/Album'

export default function AlbumCard({ album }: { album: Album }) {
    const image = album.images[1] ?? album.images[0]

    return (
        <section key={album.id} className="relative">
            <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
                {
                    !image ? (
                        <img
                            src={`/src/images/image-not-found.jpg`}
                            alt="Image not found"
                            className="w-full object-cover"
                        />
                    ) : (
                        <img
                            src={image.url}
                            alt={album.name}
                            className="w-full object-cover"
                        />
                    ) 
                }
                <img
                    src={album.images[1]?.url}
                    alt={album.name}
                    className="w-full object-cover"
                />
            </figure>
            <figcaption className="mt-2 text-gray-400 text-sm">
                {album.name}
            </figcaption>
            <Link
                to={`/album/${album.id}/${formatText(album.name)}`}
                className="absolute inset-0"
            />
        </section>
    )
}