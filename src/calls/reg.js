const TorClient = require('../tor-client')
const decodeUri = require('../uri/decode-uri')
const ping = require('./ping')
const GlobVars = require('../global')

const { getErrorForCode, RequestFailed} = require('../errors')

// Perform a REG call to Tofa client
// 'meta' must be object and contain "name" and "description"
// Returns authorization key or throws exception according to each case
module.exports = (uri, meta)=>{
    return new Promise(async (accept, reject)=>{
        try {
            // do a ping first
            await ping(uri)

            let url = decodeUri(uri).toUrl()

            // fire request
            let res = await TorClient.makeRequest(
                "REG", 
                url, 
                Buffer.from( JSON.stringify(meta) ),
                null,
                GlobVars.CALL_RESPONSE_TIMEOUT
            )

            if(res.status !== 270)
                throw getErrorForCode(res.status)

            res.text()
            .then(text=>accept(JSON.parse(text).auth_token))
            .catch(err=>reject( new RequestFailed(err) ))
        } catch(e) {
            reject(e)
        }        
    })
}
