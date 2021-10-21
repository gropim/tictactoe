import type { Grid, Row } from './types'

interface minimaxMove {
  score:number;
  row?:number;
  col?:number;
}

function minimax(grid:Grid, player:number, turn:number = 0):minimaxMove{
  const w = checkWinner(grid)
  if (w) return w === player ? {score:1} : {score:-1}
  
  const playingPlayer = (player + turn - 1) % 2 + 1
  const isAI = playingPlayer === 2
  let bestMove:minimaxMove = {score:isAI ? -Infinity : Infinity};
  let openSpot = 0;
  for(let i = 0 ; i < 3 ; i++){
    for(let j = 0 ; j < 3 ; j++){
      if (!grid[i][j]){
        openSpot++
        const newGrid = cloneGrid(grid)
        newGrid[i][j] = playingPlayer
        const move = minimax(newGrid, player, turn  + 1)
        if ((isAI && move.score > bestMove.score) || (!isAI && move.score < bestMove.score))
          bestMove = {...move, row:i, col:j}
        
      }
    }
  }

  if (!openSpot)
    return {score:0}

  return bestMove
  
}

function cloneGrid(grid:Grid):Grid{
  return grid.map((row:Row)=>[...row])
}

function checkWinner(grid:Grid):number|null{
  if (!grid.length) return null;

  if (grid[1][1] && ((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) || (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]))){
    return grid[1][1]
  }
  
  for(let i = 0 ; i < 3 ; i++){
    if (grid[i][0] && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2])
      return grid[i][0]
    if (grid[0][i] && grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i])
      return grid[0][i]
    
      
  }

  return null
}


export { minimax, cloneGrid, checkWinner }