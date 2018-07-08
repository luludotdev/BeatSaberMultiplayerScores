/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {number} ID
 * @property {number} score
 */

/**
 * @typedef {Object} Level
 */

/**
 * @typedef {Object} Packet
 * @property {string} version
 * @property {number} opcode
 * @property {Player[]} playerInfo
 * @property {Level} level
 */

/**
 * Decode WS Message Data
 * @param {string} data WS Message
 * @returns {Packet}
 */
const decode = data => {
  let { version, commandType: opcode, selectedLevelId, playerInfos } = JSON.parse(data)
  let playerInfo = playerInfos.map(x => JSON.parse(x))
    .map(x => {
      let { playerName, playerId, playerScore } = x
      return { name: playerName, ID: playerId, score: playerScore }
    })

  let level
  if (selectedLevelId) {
    console.log(selectedLevelId)
  } else {
    level = undefined
  }

  return { version, opcode, playerInfo, level }
}

const opcodes = {
  SetServerState: 0,
  SetLobbyTimer: 1,
  DownloadSongs: 2,
  StartSelectedSongLevel: 3,
  SetPlayerInfos: 4,
  SetSelectedSong: 5,
  UpdateRequired: 6,
  Ping: 7,
  Kicked: 8,
}

export { decode, opcodes }
