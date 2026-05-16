/*==================================02 Async Programming & Error Handling) fetchWithRetry(url, maxRetries = 3)======================
Write an async function that fetches a URL and retries on failure up to maxRetries times using
exponential backoff (delay = 100ms x 2^n per attempt). On final failure, throw an error that includes the
URL and number of attempts. On success, return the parsed JSON body.
– Use the native fetch API (available in Node.js 18+).
– The thrown error message must include the URL and total attempt count.
*/
// Retry timing (maxRetries = 3)
// Attempt 1 fails -> wait 100ms
// Attempt 2 fails -> wait 200ms
// Attempt 3 fails -> wait 400ms -> throw
// Example usage

// const data = await fetchWithRetry('https://api.example.com/users')
// console.log(data)

// => { users: [...] }
// On repeated failure:
// await fetchWithRetry('https://api.example.com/users', 2)
// Error: Failed to fetch 'https://api.example.com/users' after 2 attempts


// ================================== Coding Part ================================== 


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            // Final failure
            if (attempt === maxRetries) {
                throw new Error(
                    `Failed to fetch '${url}' after ${attempt} attempts`
                )
            }
            // Exponential backoff
            const delay = 100 * (2 ** (attempt - 1))
            console.log(
                `Attempt ${attempt} failed. Retrying in ${delay}ms...`
            )
            await wait(delay)
        }
    }
}

async function runCorrecturl() {

    const data = await fetchWithRetry(
        'https://jsonplaceholder.typicode.com/users',
    )

    console.log("data from runCorrecturl", data)
}


async function runWrongurl() {

    const data = await fetchWithRetry(
        'https://api.example.com/users'
    )
    console.log("data from runWrongurl", data)
}
runCorrecturl()
runWrongurl()

module.exports = fetchWithRetry