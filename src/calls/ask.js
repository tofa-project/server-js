const TorClient = require('../tor-client')
const decodeUri = require('../uri/decode-uri')
const ping = require('./ping')
const GlobVars = require('../global')

const { getErrorForCode } = require('../errors')

// Perform an ASK call to Tofa client
//
// 'meta' must be object and contain "description" and 'auth_token'
//
// Returns true if action is allowed, false if denied, or throws exception according to case
module.exports = (uri, meta)=>{
    return new Promise(async (accept, reject)=>{
        try {
            // do a ping first
            await ping(uri)

            let url = decodeUri(uri).toUrl()
            
            // fire request
            let res = await TorClient.makeRequest(
                "ASK", 
                url, 
                Buffer.from( JSON.stringify(meta) ), 
                { Authorization: "Bearer "+meta.auth_token },
                GlobVars.CALL_RESPONSE_TIMEOUT
            )

            if(res.status === 270)
                accept(true)
            else if (res.status === 570)
                accept(false)
            else
                throw getErrorForCode(res.status)
        } catch(e) {
            reject(e)
        }        
    })
}
