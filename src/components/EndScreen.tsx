import React from 'react'

interface Props{
  shouldRestart: boolean,
  setShouldRestart: React.Dispatch<React.SetStateAction<boolean>>,
  correctAnswers: number
}

const EndScreen = ({shouldRestart, setShouldRestart, correctAnswers}: Props) => {
  return (
    <div className="end-screen">
        <h3 className="end-correct">You got {correctAnswers} questions right out of 10.</h3>
        <button onClick={() => setShouldRestart(true)} className="btn btn-light">Restart</button>
    </div>
  )
}

export default EndScreen