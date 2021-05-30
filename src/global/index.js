// Holds all global variables used across package.
// Can be modified as well, changes being applied instantly
const Variables = {
    // 60 seconds to download descriptors and establish connection to Tofa client
    CALL_CONNECT_TIMEOUT: 60,

    // 45 seconds for user to decide
    // 30 seconds to compensate for network timeout
    CALL_RESPONSE_TIMEOUT: 45 + 30
}

module.exports = Variables
