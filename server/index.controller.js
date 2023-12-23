const axios = require('axios');

const fetchData = async (req, res) => {
    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD', {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_KEY
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchData
};
