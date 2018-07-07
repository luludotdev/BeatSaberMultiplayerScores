/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {number} ID
 * @property {number} score
 */

/**
 * Decode WS Message Data
 * @param {string} data WS Message
 * @returns {Player[]}
 */
const decode = data => {
  let { playerInfos } = JSON.parse(data)
  let info = playerInfos.map(x => JSON.parse(x))
    .map(x => {
      let { playerName, playerId, playerScore } = x
      return { name: playerName, ID: playerId, score: playerScore }
    })
  return info
}

export default decode
