import Web3 from 'web3'

const avalancheProvider = 'https://api.avax.network/ext/bc/C/rpc'
const web3 = new Web3(avalancheProvider)

/**
 *
 * @param {number} blockNumber block number for which you want to check date
 * @returns {Date} of block checked
 */
async function getBlockDate(blockNumber) {
  const block = await web3.eth.getBlock(blockNumber)
  const blockDate = new Date(block.timestamp * 1000)
  return blockDate
}

/**
 *
 * @param {Date} date1
 * @param {Date} date2 order does not matter
 * @returns {number} number of day between both date
 */
function diffDays(date1, date2) {
  const diffTime = Math.abs(date1.getTime() - date2.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function isDateMatching(date1, date2) {
  if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
    return true
  } else {
    return false
  }
}

function getDateJJMMYYY(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const dateString = day + '/' + month + '/' + year
  return dateString
}

export function getDatesBetween(startDate, endDate) {
  const dates = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export async function getBalance(inputValue, blockNumber = null) {
  //0xA22BCe5a3CB160399bD30E74D5e8B16D3C0c2d6B
  if (blockNumber === null) {
    blockNumber = await web3.eth.getBlockNumber()
  }
  const address = inputValue
  const balanceInWei = await web3.eth.getBalance(address, blockNumber)
  const balanceInAVAX = balanceInWei / 1e18
  const balance = balanceInAVAX.toFixed(2)
  let blockDate = await getBlockDate(blockNumber)
  return { address: address, balance: balance, date: getDateJJMMYYY(blockDate) }
}

export async function getBlockNumberForDates(targetDate) {
  const today = new Date()
  const diffDaysValue = diffDays(today, targetDate)
  const latestBlockNumber = await web3.eth.getBlockNumber()
  // 43000 is approximately the number of block there is each day it allow to be closer of the result from start
  const supposedBlockNumberAtTargetDate = latestBlockNumber - diffDaysValue * 43000
  const block = await web3.eth.getBlock(supposedBlockNumberAtTargetDate)
  const blockDate = new Date(block.timestamp * 1000)
  const areDateEqual = isDateMatching(blockDate, targetDate)

  if (areDateEqual) {
    return supposedBlockNumberAtTargetDate
  } else {
    // if supposed date isn't equal to target date binary search to find a block that match the target date
    let startBlockNumber = supposedBlockNumberAtTargetDate
    let endBlockNumber = latestBlockNumber
    let blockNumber = -1

    while (startBlockNumber <= endBlockNumber) {
      const midBlockNumber = Math.floor((startBlockNumber + endBlockNumber) / 2)
      const block = await web3.eth.getBlock(midBlockNumber)
      const blockDate = new Date(block.timestamp * 1000)

      if (blockDate.getFullYear() < targetDate.getFullYear() || (blockDate.getFullYear() === targetDate.getFullYear() && blockDate.getMonth() < targetDate.getMonth()) || (blockDate.getFullYear() === targetDate.getFullYear() && blockDate.getMonth() === targetDate.getMonth() && blockDate.getDate() < targetDate.getDate())) {
        startBlockNumber = midBlockNumber + 1
      } else if (blockDate.getFullYear() > targetDate.getFullYear() || (blockDate.getFullYear() === targetDate.getFullYear() && blockDate.getMonth() > targetDate.getMonth()) || (blockDate.getFullYear() === targetDate.getFullYear() && blockDate.getMonth() === targetDate.getMonth() && blockDate.getDate() > targetDate.getDate())) {
        endBlockNumber = midBlockNumber - 1
      } else {
        blockNumber = midBlockNumber
        break
      }
    }
    return blockNumber
  }
}

