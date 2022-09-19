import React from 'react'
import { AppState, useMessageContext } from './context/MessageContext'
export const Welcome: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  return (
    <div className="p-10 flex  h-screen justify-center items-end">
     

      <div className="z-50">
        <button
          className="p-3 text-black font-bold tracking-wide bg-primary transform rounded-md border-2 border-black w-40 hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer mx-2"
        
          onClick={() => {
            messageContext.setAppState(AppState.chat)

            messageContext.setBackground('/scenes/inside_bakery_scene.mp4')
            messageContext.setBackgroundColor('#06121b')
            messageContext.setBackgroundColor2('#06121b')
          }}
          style={{
            fontFamily :'chandler-42-regular',
            fontWeight: '800',
           fontSize:"1.5rem",
           
            backgroundColor : "rgba(169,170,150,0.9)"
           }}
        ><div style={{ background: '-webkit-linear-gradient(#f0ecca, #f0ecca)',
        WebkitBackgroundClip: 'text',
        
       top:"0px",

        WebkitTextFillColor: 'transparent',}}>
  (🔔,🔔) 

  </div>
        </button>

      </div>
      
    </div>
  )
}
