// When human being rejects action
class CallRejected extends Error {}

// When tofa client rejects action
class CallForbidden extends Error {}

// When server sends malformed request (aka code 400)
class BadCall extends Error {}

// When client does not reply in mean time
// Nothing which server can fix from its side
class CallTimedOut extends Error {}

// Used in preflight/ping requests
// When connection doesn't establish in mean time
class ConnectTimedOut extends Error {}

// Fault's on client side
// When there is a conflict between client GUI and Daemon.
// Nothing which server can fix from its side
class ClDaConflict extends Error {}

// Fired amid unexpected response codes from client
class UnsupportedResponseCode extends Error {}

// Fired amid bad URI
class BadURI extends Error {}

// Amid unsuported URI
class UnsupportedURI extends Error{}

// When request failed due to different causes
class RequestFailed extends Error {}

// When client is busy processing another call to the same app
class CallConflicts extends Error {}

// export them all
module.exports = {
    CallRejected, CallForbidden, BadCall, 
    CallTimedOut, ClDaConflict, UnsupportedResponseCode,
    BadURI, RequestFailed, UnsupportedURI,
    ConnectTimedOut, CallConflicts,
    
    // Returns appropriate error based on status code
    getErrorForCode(code){
        switch(code){
            case 403: return new CallForbidden
            case 400: return new BadCall
            case 408: return new CallTimedOut
            case 409: return new CallConflicts
            case 570: return new CallRejected
            case 571: return new ClDaConflict
            default: return new UnsupportedResponseCode(code)
        }
    }
}
