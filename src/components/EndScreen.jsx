import React from 'react'

const EndScreen = ({shouldRestart, setShouldRestart}) => {
  return (
    <div>
        <button onClick={() => setShouldRestart(true)} className="btn btn-light">Restart</button>
    </div>
  )
}

export default EndScreen