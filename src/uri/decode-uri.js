const {Decoded} = require('./decoded-class')
const { BadURI, UnsupportedURI } = require('../errors')

// Decode URIs of type version 0
const decodeV0 = (splUri)=>{

    let splPortPath = splUri[2].split('/')
    if(splPortPath.length !== 2)
        throw new BadURI('splPortPath')

    return new Decoded({
        onion: splUri[1],
        port: parseInt(splPortPath[0]),
        path: splPortPath[1],
        version: 0,
    })
}

// Decodes an URI and returns a decoded class
const decodeUri = (uri)=>{

    // decode b64
    let decUri = ''
    try {
        decUri = Buffer.from(uri, 'base64').toString('ascii')
    } catch(e) {
        throw new BadURI('base64 decode failed')
    }

    // split ":"
    let splUri = decUri.split(':')
    if(splUri.length < 2) 
        throw new BadURI("splUri")


    // parse based on version
    switch(splUri[0]){
        case '0': return decodeV0(splUri)
        default: throw new UnsupportedURI()
    }
}

module.exports = decodeUri
