import { Routes, Route } from 'react-router-dom'

import Artists from './Artists'
import ArtistInfo from './ArtistInfo'
import AlbumInfo from './AlbumInfo'
import SearchInfo from './SearchInfo'
import NotFound from './NotFound'

export default function Main() {
    return (
        <main className="p-5 min-h-max">
            <Routes>
                <Route path="/" element={<Artists />} />
                <Route path="/artist/:id/:name" element={<ArtistInfo/>} />
                <Route path="/album/:id/:name" element={<AlbumInfo />} />
                <Route path="/search/:query" element={<SearchInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}