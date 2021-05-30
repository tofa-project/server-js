const {_ping, _reg, _ask, _info} = require('./calls')
const {initClient} = require('./tor-client')


// The exported methods which can be used outside package scope
const Exported = {
    init(addr){
        initClient(addr)
    },

    // Perform a REG call to Tofa client
    //
    // 'meta' must be object and contain "name" and "description"
    //
    // Returns authorization token or throws exception according to case
    async reg(uri, meta){
        return await _reg(uri, meta)
    },

    // Perform an ASK call to Tofa client
    //
    // 'meta' must be object and contain "description" and 'auth_token'
    //
    // Returns true if action is allowed, false if denied, or throws exception according to case
    async ask(uri, meta){
        return await _ask(uri, meta)
    },

    // Perform an INFO call to Tofa client
    //
    // 'meta' must be object and contain "description" and 'auth_token'
    //
    // Returns null or throws exception according to case
    async info(uri, meta){
        return await _info(uri, meta)
    },

    // Perform a PING call to Tofa client
    //
    // Used as preflight to ensure circuit stability
    //
    // Returns null or throws exception according to case
    async ping(uri){
        return await _ping(uri)
    }
}

module.exports = Exported
