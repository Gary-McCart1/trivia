import React from 'react'

interface Props{
  shouldRestart: boolean,
  setShouldRestart: React.Dispatch<React.SetStateAction<boolean>>
}

const EndScreen = ({shouldRestart, setShouldRestart}: Props) => {
  return (
    <div>
        <button onClick={() => setShouldRestart(true)} className="btn btn-light">Restart</button>
    </div>
  )
}

export default EndScreen