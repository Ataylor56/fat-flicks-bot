const Constants = require('../constants.js');
const Axios = require('axios');

exports.FetchImages = async function FetchImages({sku, width, height}) {
    //const angles = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'P']
    const angles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const urls = [];
    const buildUrl = async () => {
        for (const angle of angles) {
            const url = `https://secure-images.nike.com/is/image/DotCom/${sku}_${angle}_PREM?wid=${width}&hei=${height}`;
            const response = await Axios.get(url);
            if (response.data !== Constants.noImageResponse){
                urls.push(url)
            }
        }11
    }
    await buildUrl();
    return urls;
}