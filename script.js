const timeElement = document.querySelector('.time')
const newGameBtn = document.querySelector('.new_game_btn')
const gridContainer = document.querySelector('.grid_container')
const player1Element = document.querySelector('.player1')
const player2Element = document.querySelector('.player2')
const currentPlayerElement = document.querySelector('.current_player')

const optionsArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

let currentItems = []
let currentPlayer = 'p1'
let count = 0

const players = [
   {
      player: 'p1',
      score: 0,
   },
   {
      player: 'p2',
      score: 0,
   }
]


newGameBtn.addEventListener("click", onResetGame)


function main() {
   player1Element.textContent = "Player 1: " + players[0].score
   player2Element.textContent = "Player 2: " + players[1].score

   currentPlayerElement.textContent = currentPlayer

   const shuffleArray = shuffle(optionsArray)

   for (let i = 0; i < shuffleArray.length; i++) {
      gridContainer.appendChild(createItem(shuffleArray[i], i + 1))
   }
}

function createItem(dataVal, index) {
   const divItem = document.createElement('div')

   divItem.classList.add('grid_item')
   divItem.setAttribute('data-val', dataVal)
   divItem.setAttribute('data-index', index)
   divItem.textContent = dataVal
   divItem.addEventListener('click', itemClick)

   return divItem
}



function shuffle(array) {
   let count = array.length - 1

   while (count > 0) {
      let index = Math.floor(Math.random() * array.length)

      let temp = array[index]
      array[index] = array[count]
      array[count] = temp

      count--
   }

   return array
}

function itemClick(event) {
   const currentItem = event.target
   const dataVal = currentItem.getAttribute('data-val')
   const dataIndex = currentItem.getAttribute('data-index')

   currentItem.classList.add('grid_item_open')

   if (currentItems.length === 1) {
      // console.log(currentItems[0].dataVal, dataVal)
      if (currentItems[0].dataIndex === dataIndex) {
         return
      }
   }

   currentItems.push({
      element: event.target,
      dataVal: dataVal,
      dataIndex: dataIndex
   })

   if (currentItems.length === 2) {

      if (currentItems[0].dataVal === currentItems[1].dataVal) {

         if (currentPlayer === 'p1') {
            players[0].score += 1
            player1Element.textContent = "Player 1: " + players[0].score
            clearItems('add_calss', 'disabled_grid_item_p1')
         } else {
            players[1].score += 1
            player2Element.textContent = "Player 2: " + players[1].score
            clearItems('add_calss', 'disabled_grid_item_p2')
         }

         count++

         if (count === optionsArray.length / 2) {
            currentPlayerElement.textContent = winner()
            return
         }

         // console.log(players)
      } else {
         gridContainer.classList.add('disabled_container')

         setTimeout(() => {
            currentPlayer = currentPlayer === 'p1' ? 'p2' : 'p1'
            currentPlayerElement.textContent = currentPlayer
            clearItems('remove_class', 'grid_item_open')
            gridContainer.classList.remove('disabled_container')
         }, 1500);
      }
   }
}

function clearItems(operation, className) {
   for (const item of currentItems) {
      if (operation === 'remove_class') {
         item.element.classList.remove(className)
      } else {
         item.element.classList.add(className)
      }
   }

   currentItems = []
}

function winner() {
   if (players[0].score === players[1].score) {
      return 'Draw'
   }
   return players[0].score > players[1].score ? 'Player 1 win' : 'Player 2 win'
}

function getCurrentTime() {
   const date = new Date()

   const hours = date.getHours()
   const minutes = date.getMinutes()
   const seconds = date.getSeconds()

   return `${hours}:${minutes}:${seconds}`
}


function onResetGame() {
   currentItems = []
   currentPlayer = 'p1'
   count = 0

   for (const player of players) {
      player.score = 0
   }

   clearContainer(gridContainer)

   main()
}

function clearContainer(selector) {
   const container = typeof selector === "string" ? document.querySelector(selector) : selector

   while (container.firstChild) {
      container.firstChild.remove()
   }
}

main()