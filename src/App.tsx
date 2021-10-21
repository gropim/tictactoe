import { useEffect, useState } from 'react'
import './App.scss'
import type { Grid } from './types'
import { minimax, checkWinner, cloneGrid } from './Tools'

function App() {
  
  const [grid, setGrid] = useState<Grid>([])
  const [player, setPlayer] = useState<number>(1)
  const [winner, setWinner] = useState<number|null>(null)
  const [modeAI, setModeAI] = useState<boolean>(false)

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    const w = checkWinner(grid)
    if (w) setWinner(w)
  }, [grid])

  useEffect(() => {
    if (modeAI && player === 2){
      const move = minimax(grid, player)
      if (move.row !== undefined && move.col !== undefined)
        selectCell(move.row, move.col)
    }
  }, [player])

 function cellValue(v:number|null):string {
    switch(v){
      case 1:
        return 'x'
      case 2:
        return 'o'
      default:
        return ''
    }
  }

  function selectCell(row:number, col:number):void {
    if (winner) return
    if (grid[row][col]) return

    const newGrid:Grid = cloneGrid(grid)
    newGrid[row][col] = player
    setGrid(newGrid)
    setPlayer(otherPlayer())
  }

  function otherPlayer():number{
    return player % 2 + 1;
  }

  function reset():void{
    const temp:Grid = []
    for(let i = 0 ; i < 3 ; i++){
      temp.push([null, null, null])
    }
    setGrid(temp)
    setPlayer(1)
    setWinner(null)
  }

  return (
    <div className="App">
      <div className="player">Player {player}</div>
      {winner ? <div className="winner">Winner : Player {winner}</div> : null}
      <div className="game-grid">
      {grid.map((row, i) => {
        return row.map((cell, j) => {
          return <div className="cell" key={`cell_${i}_${j}`} onClick={()=>{selectCell(i, j)}}>{cellValue(cell)}</div>
        })
      })}
      </div>
      <div className="options"><button type="button" onClick={reset}>New Game</button></div>
      <div className="options"><button type="button" onClick={()=>setModeAI(!modeAI)}>Switch to {modeAI ? '2 players' : 'AI'}</button></div>
    </div>
  )
}

export default App
