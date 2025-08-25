import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AlbumCard from './AlbumCard'
import type Album from '../interfaces/Album'

const mockAlbum: Album = {
    id: 1,
    name: 'Test Album',
    release_date: '2025-08-08',
    total_tracks: 10,
    images: [
        {
            url: 'https://placeholder.co/600x400'
        }
    ],
    tracks: {
        items: [
            {
                id: '1',
                name: 'Track One',
                track_number: 1,
                duration_ms: 180000
            }
        ]
    }
}

describe('AlbumCard', () => {
    it('renders album image and name', () => {
        render(
            <MemoryRouter>
                <AlbumCard album={mockAlbum} index={0} />
            </MemoryRouter>
        )
        expect(screen.getByText(/Test Album/i)).toBeInTheDocument()

        const image = screen.getByRole('img')
        expect(image).toHaveAttribute('src', mockAlbum.images[0].url)
        expect(image).toHaveAttribute('alt', mockAlbum.name)
    })
})