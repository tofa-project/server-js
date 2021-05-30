const TorClient = require('../tor-client')
const decodeUri = require('../uri/decode-uri')
const GlobVars = require('../global')
const {getErrorForCode} = require('../errors')

// Perform a PING call to Tofa client
//
// Used as preflight to ensure circuit stability
//
// Returns null or throws exception according to case
module.exports = (uri)=>{
    return new Promise(async (accept, reject)=>{
        try {
            let url = decodeUri(uri).toUrl()
            
            // fire request
            let res = await TorClient.makeRequest(
                "PING", 
                url, 
                null, 
                null, 
                GlobVars.CALL_CONNECT_TIMEOUT
            )

            if(res.status !== 204) {
                throw getErrorForCode(res.status)
            }

            accept(null)
        } catch(e) {
            reject(e)
        }        
    })
}
