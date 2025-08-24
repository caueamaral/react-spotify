import axios from 'axios'

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://caueamaral.github.io/react-spotify')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    const clientId = process.env.VITE_CLIENT_ID
    const clientSecret = process.env.VITE_CLIENT_SECRET
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        res
            .status(200)
            .json({
                access_token : response.data.access_token
            })
    }
    catch(err) {
        console.error('getToken Spotify API error:' , err)
        res
            .status(500)
            .json({
                error: 'Failed to fetch token'
            })
    }
}