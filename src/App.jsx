import { useState } from 'react'
import './App.css'

function App() {
  const [players, setPlayers] = useState([])
  const [inputName, setInputName] = useState('')
  const [loser, setLoser] = useState(null)

  const handleAddPlayer = (e) => {
    e.preventDefault()
    if (inputName.trim() && !players.includes(inputName.trim())) {
      setPlayers([...players, inputName.trim()])
      setInputName('')
    }
  }

  const handleRemovePlayer = (nameToRemove) => {
    setPlayers(players.filter(name => name !== nameToRemove))
  }

  const pickRandomLoser = (currentPlayers) => {
    if (currentPlayers.length === 0) return
    const randomIndex = Math.floor(Math.random() * currentPlayers.length)
    setLoser(currentPlayers[randomIndex])
  }

  const handleNext = () => {
    pickRandomLoser(players)
  }

  const handleGetNewLoser = () => {
    pickRandomLoser(players)
  }

  const handleStartOver = () => {
    setPlayers([])
    setLoser(null)
    setInputName('')
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Who pays the bill?</h1>
        <p className="subtitle">Find out who is going to pay!</p>
      </div>

      <div className="exercises-grid">
        <div className="card">
          {!loser ? (
            <div>
              <h3>Add player name</h3>
              <form onSubmit={handleAddPlayer} className="add-player-form">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="input-field pretty-input"
                  />
                </div>
                <button type="submit" className="btn pretty-add-btn">
                  <span>Add</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </form>

              <ul className="todo-list">
                {players.map((player, index) => (
                  <li key={index}>
                    <span>{player}</span>
                    <button 
                      onClick={() => handleRemovePlayer(player)} 
                      className="delete-btn"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {players.length > 0 && (
                <button 
                  onClick={handleNext} 
                  className="btn btn-green mt-2" 
                  style={{ width: '100%' }}
                >
                  NEXT
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h3>The loser is:</h3>
              <div className="display-num" style={{ margin: '1.5rem 0' }}>
                {loser}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleGetNewLoser} className="btn">
                  GET NEW LOSER
                </button>
                <button onClick={handleStartOver} className="btn btn-red">
                  START OVER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App