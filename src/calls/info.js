const TorClient = require('../tor-client')
const decodeUri = require('../uri/decode-uri')
const ping = require('./ping')
const GlobVars = require('../global')

const { getErrorForCode } = require('../errors')

// Perform an INFO call to Tofa client
//
// 'meta' must be object and contain "description" and 'auth_token'
//
// Returns null or throws exception according to case
module.exports = (uri, meta)=>{
    return new Promise(async (accept, reject)=>{
        try {
            // do a ping first
            await ping(uri)

            let url = decodeUri(uri).toUrl()
            
            // fire request
            let res = await TorClient.makeRequest(
                "INFO", 
                url, 
                Buffer.from( JSON.stringify(meta) ), 
                { Authorization: "Bearer "+meta.auth_token }, 
                GlobVars.CALL_RESPONSE_TIMEOUT
            )

            if(res.status === 200)
                accept(null)
            else
                throw getErrorForCode(res.status)
        } catch(e) {
            reject(e)
        }        
    })
}
