const fetch = require('node-fetch');
const ProxyAgent = require('simple-proxy-agent');
const { TorRequestFailed} = require('../errors')
const GlobVars = require('../global')
const {CallTimedOut, ConnectTimedOut} = require('../errors')

// Client instance
const Instance = {
    _Agent: null,

    // Initialize client agent with proxy address
    initClient: addr=>{
        this._Agent = new ProxyAgent('socks5://'+addr, {
            tunnel: true, // If true, will tunnel all HTTPS using CONNECT method
            timeout: 5000, // Time in milli-seconds, to maximum wait for proxy connection to establish
        })
    },

    // Perform request
    makeRequest: (method, url, body = null, headers= {}, timeout = GlobVars.CALL_RESPONSE_TIMEOUT)=>{
        return new Promise((accept, reject)=>{
            fetch(url, {
                agent: this._Agent,
                method, body, headers, 
                timeout: timeout*1000,
            })
            .then(res => accept(res))
            .catch(err => {
                if(err instanceof fetch.FetchError && err.message.indexOf('network timeout') !== -1)
                    reject(method === "PING" ? new ConnectTimedOut : new CallTimedOut)
                else 
                    reject(err)
            })
        })
    }

}

module.exports = Instance
