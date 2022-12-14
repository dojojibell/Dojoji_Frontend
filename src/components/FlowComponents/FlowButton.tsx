import { FC, useState } from 'react'
import { Action, useMessageContext } from '../../context/MessageContext'
import { useWeb3 } from '../../context/Web3Context'
import { useSugarPretzelContract } from '../../context/SugarPretzelContext'
import { useGenesisPretzelContract } from '../../context/GenesisPretzelContext'

interface FlowButtonProps {
  action: Action
}

export const FlowButton: FC<FlowButtonProps> = ({ action }) => {
  const [loading, setLoading] = useState(false)
  const messageContext = useMessageContext()
  const web3Context = useWeb3()
  const sugarPretzelContext = useSugarPretzelContract()
  const genesisPretzelContext = useGenesisPretzelContract()

  return (
    <div className="h-20 transition-all overflow-visible">
      <button
        className="p-3 bg-white transform rounded-md border-2 border-black w-max hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer mx-2 overflow-visible"
        style={{backgroundColor:"rgba(240,235,202,0.7)"}}
        onClick={() => {
          setLoading(true)
          action
            .onClick(
              messageContext,
              web3Context,
              sugarPretzelContext,
              genesisPretzelContext
            )
            .then(() => setLoading(false))
            .finally(() => setLoading(false))
        }}
      >
        {loading ? (
          <img
            src={require('./loading_dots.gif').default}
            className="w-14"
          ></img>
        ) : (
          <div>{action.content}</div>
        )}
      </button>
    </div>
  )
}
