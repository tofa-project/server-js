## Javascript Adapter
Use this package if you're developing web apps in javascript.

## Include
`npm install tofa-server-js`

## Use
Flow of use:
1. Initialize with Tor socks5 proxy address
2. Use adapter methods to communicate with Tofa Clients

Calls are asynchronous.

```javascript
const {init, reg, info, ask } = require('tofa-server-js')
const TofaErrors = require('tofa-server-js/src/errors')

(async ()=>{
    try {
        /**
        * First initialize adapter with Tor proxy address. Usually it's 127.0.0.1:9050
        * Adapter instance is shared across application, so init should be called only once.
        */
        init('127.0.0.1:9050')

        /**
        * Attempts to register with Tofa Client. 
        * It requires Client URI, and metadata so human can recognize your service.
        * Metadata must contain "name" and "description" (both strings).
        * 
        * @returns: the authentication token which is mandatory when performing ASK and INFO calls.
        *           If any error occurred it will throw an exception exported at 'TofaErrors'
        *
        * Registration process must occur only once, and authentication token
        * must be stored in a database and re-used for eternity.
        */
        let auth_token = await reg(uri, {
            name: "service name",
            description: "service description",
        })

        console.log( 'Auth token:', auth_token )

        /**
        * Attempts to ask for confirmation form Tofa Client amid an action. 
        * It requires Client URI, and metadata so human can recognize the action.
        * Metadata must contain a comprehensive "description" and the "auth_token" (both strings).
        * 
        * @returns: true/false whether human allowed the action or not.
        *           If any error occurred it will throw an exception exported at 'TofaErrors'
        */
        let does_client_allow_action = await ask(uri, {
            description: "Please allow me to perform action X. Will you?",
            auth_token: auth_token,
        })

        console.log( 'did client allow action?: ', does_client_allow_action)
        
        /**
        * Attempts to send an INFO call. This is only a notification sent to the Client.
        * It requires Client URI, and metadata so human can recognize your service.
        * Metadata must contain "name" and "auth_token" (both strings).
        * 
        * @returns: void
        *           If any error occurred it will throw an exception exported at 'TofaErrors'
        */
        await info(uri, {
            description: "Quick info about something. A notification like",
            auth_token
        })

        console.log( 'info sent' )

    }catch(e){
        console.log(e)
        
        /**
        * Exceptions are splitted based on error case.
        * You can take actions based on which error occurred.
        *
        * A full documented list can be browsed within IDE at node_modules/tofa-server-js/src/errors/index.js
        */
        if(e instanceof TofaErrors[...]) 
          console.log(`take this action`)
    }

})();

```

