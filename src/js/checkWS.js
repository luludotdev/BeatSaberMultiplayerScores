/**
 * Checks if a WebSocket server is alive.
 * @param {string} url WebSocket Server URL
 * @returns {boolean|WebSocket}
 */
const checkWS = url => new Promise((resolve, reject) => {
  try {
    const ws = new WebSocket(url)

    ws.onerror = e => reject(e)
    ws.onopen = () => resolve(ws)
  } catch (err) {
    reject(err)
  }
})

export default checkWS
