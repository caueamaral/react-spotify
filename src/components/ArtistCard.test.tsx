import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ArtistCard from './ArtistCard'
import type Artist from '../interfaces/Artist'

const mockArtist: Artist = {
    id: '1',
    name: 'Test Artist',
    popularity: 50,
    genres: ['rock'],
    followers: {
        total: 1000
    },
    images:[
        {
            url: 'https://placehold.co/600x400',
            height: 400,
            width: 600
        }
    ]
}

describe('ArtistCard', () => {
    it('renders artist image and name', () => {
        render(
            <MemoryRouter>
                <ArtistCard artist={mockArtist} index={0} />
            </MemoryRouter>
        )
        expect(screen.getByText(/Test Artist/i)).toBeInTheDocument()

        const image = screen.getByRole('img')
        expect(image).toHaveAttribute('src', mockArtist.images[0].url)
        expect(image).toHaveAttribute('alt', mockArtist.name)
    })
})