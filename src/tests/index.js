const {info, ask, reg, init, ping} = require('..')

const proxy_addr = '';
const uri = '';

// Calls tested one by one
(async ()=>{
    try {
        init(proxy_addr)

        console.log('ping sent', await ping(uri))

        let auth_token = await reg(uri, {
            name: "service name",
            description: "service description",
        })

        console.log(
            'Auth token:', 
            auth_token
        )

        console.log(
            'action allowed: ', 
            await ask(uri, {
                description: "ALlow to perform action X?",
                auth_token
            })
        )

        console.log(
            'info sent', 
            await info(uri, {
                description: "Quick info about smth",
                auth_token
            })
        )

    }catch(e){
        console.log(e)
    }

})();

