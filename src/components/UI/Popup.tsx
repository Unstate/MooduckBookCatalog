import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/features/userSlice'
import { cross } from '../../assets'
import { ReactSVG } from 'react-svg'

interface PopupInterface {
  handleOnClose: Function
  message: string
}

const Popup: React.FC<PopupInterface> = ({ message, handleOnClose }) => {
  
  const dispatch = useAppDispatch()

  const HIDE_TIMEOUT = 5000
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  useEffect(() => {
    const hide = () => {
      handleOnClose(undefined)
    }

    const intervalId = setInterval(() => {
      if (elapsedTime < HIDE_TIMEOUT) {
        setElapsedTime((time) => time + 1000)
      } else {
        hide()
        dispatch(userSlice.actions.setError(''))
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [elapsedTime])

  const progress = (elapsedTime / HIDE_TIMEOUT) * 100

  return (
    <div
      className="z-100 fixed 2xl:bottom-[50px] xl:bottom-[50px] lg:bottom-[50px] md:bottom-[50px] bottom-[10px] 2xl:right-2 xl:right-2 lg:right-2 md:right-2 right-0 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/3 w-full rounded-[10px]
     border-[2px] border-[#160F29] bg-mooduck-white"
    >
      <div className="flex items-center justify-between p-10">
        <p className='flex flex-wrap'>{message}</p>
        <ReactSVG
          src={cross}
          className="hover:cursor-pointer"
          onClick={() => {
            handleOnClose()
            dispatch(userSlice.actions.setError(''))
          }}
        />
      </div>
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
  )
}

export default Popup
