const axios = require("axios");
const https = require('https');

const {
    maximaDiscounts,
} = require("../services/maximaServices");

const httpsAgent = new https.Agent({ keepAlive: true });


const getMaximaDiscounts = (req, res) => {
    axios.get('https://www.maxima.lt/akcijos', {
        httpsAgent,
        params: {
            cat_id: '876',
        },
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
        },
    })
    .then(response => data = maximaDiscounts(response))
    .then(data => res.status(200).json(data))
}

module.exports = {
    getMaximaDiscounts,
}