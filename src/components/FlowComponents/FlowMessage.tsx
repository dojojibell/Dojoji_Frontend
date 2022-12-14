import { Transition } from '@headlessui/react'
import { MessageContent, MessageType } from '../../context/MessageContext'
import { FlowButton } from './FlowButton'

export const FlowMessage = (message: MessageContent) => {
  const isImagetype = message.type == MessageType.image
  const mcontent =
    message.delay != null
      ? message.content[message.content.length - 1]
      : message.content
  //TODO Nicer Formatting of Link

  return (
    <div
      className={`flex flex-row w-full overflow-visible ${
        message.sendByUser ? 'justify-end' : 'justify-start'
      }`}
    >
        <div
          className={` ${
            isImagetype ? 'rounded-md  pt-1' : 'rounded-xl mx-2 my-2  pt-2'
          } w-max px-2 col ${
            message.sendByUser ? 'bg-pretzelChatColor' : 'bg-white'
          } pb-1 shadow-xl drop-shadow-lg whitespace-pre-line`}
          style={{backgroundColor:"rgba(240,235,202,0.7)"}}
        >
          {isImagetype ? (
            <img src={mcontent} className="w-32 rounded-md"></img>
          ) : (
            mcontent
          )}
          <div className="flex flex-col justify-evenly"></div>
        </div>
    </div>
  )
}
