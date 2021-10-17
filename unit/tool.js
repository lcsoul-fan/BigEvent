const jwttoken = require('jsonwebtoken');
const secretKey = 'sunzzhilianaaaaa1100__||?>';

function getToken(info) {
    return jwttoken.sign(info, secretKey, { algorithm: 'HS256' }, { expiresIn: '100s' })
}

function analysisToken(token) {
    return jwttoken.decode(token, secretKey)
}

module.exports = {
    getToken,
    analysisToken,
    secretKey
}