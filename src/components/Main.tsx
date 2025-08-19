import Artists from './Artists'
import ArtistInfo from './ArtistInfo'
import { Routes, Route } from 'react-router-dom'

export default function Main() {
    return (
        <main className="bg-gray-800 text-gray-100 p-5 min-h-max">
            <article>
                <Routes>
                    <Route path="/" element={<Artists />} />
                    <Route path="/artists/:query" element={<ArtistInfo/>} />
                </Routes>
            </article>
        </main>
    )
}