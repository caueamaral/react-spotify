import axios from 'axios'

export default async function getAccessToken(): Promise<string> {
    try {
        const response = await axios.get('/api/getToken')

        return response.data.access_token
    }
    catch (err) {
        console.error('getAccessToken error: ', err)
        throw err
    }
}