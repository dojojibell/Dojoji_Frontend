import React from 'react'
import { AppState, useMessageContext } from '../context/MessageContext'
import logo from './dojoji_logo_light.png'
export const AppHeader: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  return (
    <>
      <header className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent "
      style={{
                 
        zIndex: '1'
       }}>
        <div className="container px-4 mx-auto flex flex-row items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
              onClick={() => {
                messageContext.setAppState(AppState.welcome)
                messageContext.setBackground('dojoji_scene.webm')
                messageContext.setBackgroundColor('#06121b')
                messageContext.setBackgroundColor2('#06121b')
              }}
            >
              <img src= {logo } alt="logo" style={{ maxWidth: '70px' }}/> 
             </button>
          </div>
          <div className="flex flex-row justify-end">
            <span className="text-lg sm:text-center text-white">
              <a
                href="https://www.notion.so/pretzeldao/The-Bakery-FAQ-9324e4ace9a948b681ec994b50d133a4"
              >
                FAQ
              </a>
            </span>
          </div>
        </div>
      </header>
    </>
  )
}
