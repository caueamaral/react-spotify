import { Link } from 'react-router-dom'
import formatText from '../functions/formatText'

import type Album from '../interfaces/Album'

export default function AlbumCard({ album }: { album: Album }) {
    return (
        <section key={album.id} className="relative">
            <figure className="bg-gray-400 w-full aspect-square rounded-md overflow-hidden">
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