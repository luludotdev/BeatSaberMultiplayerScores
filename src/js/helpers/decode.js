/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {number} ID
 * @property {number} score
 */

/**
 * @typedef {Object} Level
 * @property {string} hash
 * @property {string} name
 * @property {string} subname
 * @property {string} author
 * @property {string} url
 * @property {number} bpm
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
  let { version, commandType: opcode, selectedLevelID, playerInfos } = JSON.parse(data)
  let playerInfo = !playerInfos ? undefined : playerInfos.map(x => JSON.parse(x))
    .map(x => {
      let { playerName, playerId, playerScore } = x
      return { name: playerName, ID: playerId, score: playerScore }
    })

  let level
  if (selectedLevelID) {
    let [hash, name, subname, author, bpm] = selectedLevelID.split('∎')
    bpm = parseInt(bpm, 10)
    let url = `https://beatsaver.com/api.php?mode=hashinfo&hash=${hash}`
    level = { hash, name, subname, author, url, bpm }
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
