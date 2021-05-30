// Contains URI bones and helper methods
module.exports.Decoded = class {
    // Contains the URI bones (version, onion, port, path)
    constructor(uri_bones){
        this.onion  = uri_bones.onion
        this.version = uri_bones.version
        this.port   = uri_bones.port
        this.path   = uri_bones.path
    }


    // Converts the bones to a http request URL
    toUrl(){
        return [
            "http://",
            this.onion,
            ".onion:",
            this.port,
            "/",
            this.path
        ].join('')
    }
}
