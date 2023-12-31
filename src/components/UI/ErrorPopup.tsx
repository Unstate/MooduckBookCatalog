import { useEffect, useState } from 'react'

type ErrorProps = {
  message: string
  onClose: () => void
}

const ErrorPopup = ({ message, onClose }: ErrorProps) => {
  const HIDE_TIMEOUT = 5000
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  useEffect(() => {
    const hide = () => {
      onClose()
    }

    const intervalId = setInterval(() => {
      if (elapsedTime < HIDE_TIMEOUT) {
        setElapsedTime((time) => time + 1000)
      } else {
        hide()
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [elapsedTime, onClose])

  const progress = (elapsedTime / HIDE_TIMEOUT) * 100

  return (
    <>
      <div
        className="bg-white fixed bottom-[100px] right-0 z-10 w-[700px]
     rounded-[10px] border-[2px] border-[#160F29]"
      >
        <p className="p-[42px]">{message}</p>
        <div
          className="absolute bottom-0"
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#ddd',
            borderRadius: '10px'
          }}
        >
          <div
            className="absolute bottom-0"
            style={{
              width: `${progress}%`,
              height: '10px',
              backgroundColor: '#160F29',
              borderRadius: '10px',
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ErrorPopup
