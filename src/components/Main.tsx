import { Routes, Route } from 'react-router-dom'

import Artists from './Artists'
import ArtistInfo from './ArtistInfo'

export default function Main() {
    return (
        <main className="p-5 min-h-max">
            <Routes>
                <Route path="/" element={<Artists />} />
                <Route path="/artist/:id/:name" element={<ArtistInfo/>} />
            </Routes>
        </main>
    )
}