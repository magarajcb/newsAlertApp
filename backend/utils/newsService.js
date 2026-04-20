const axios = require('axios');
require('dotenv').config();

const fetchNewsByCategory = async (category) => {
    try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
            params: { q: category, lang: 'en', max: 5, apikey: process.env.GNEWS_API_KEY }
        });
        return response.data.articles || [];
    } catch (error) {
        console.log('News fetch error:', error.message);
        return [];
    }
};

module.exports = { fetchNewsByCategory };