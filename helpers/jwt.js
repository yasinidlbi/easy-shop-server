//const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt');


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            //{url: `${api}/products`,method:['GET', 'OPTIONS']},
            {url: /\public\/uploads(.*)/ ,method:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ ,method:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ ,method:['GET', 'OPTIONS']},

            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, token){
    if(!token.payload.isAdmin) {
       return true;
    }
}
/*
async function isRevoked(req, payload, done) {
    if(!payload.isAdmin){
        done(null, true)
    }
    done();

}
*/
    module.exports = authJwt;