import { CONFIG } from '../config'
import {
  AppState,
  MessageContent,
  MessageType,
} from '../context/MessageContext'
import { LoginState } from '../context/Web3Context'
import { sleep } from '../utils/flowutils'
import { IMessageContext } from '../context/MessageContext'
import { IGenesisPretzelContext } from '../context/GenesisPretzelContext'
import { reduceEachTrailingCommentRange } from 'typescript'

// Build the URL for opening NFT in opensea
function buildURL(tokenId: number, collection: string) {
  // const url_built = `https://opensea.io/collection/${collection}/${tokenId}`
  // TODO NIck fix
  const url_built = `https://opensea.io/collection/${collection}/`

  return url_built
}

let TOKENID = 0

function changeToInside(messageContext: any) {
  messageContext.setBackgroundColor('#06121b')
  messageContext.setBackgroundColor2('#06121b')
  messageContext.setAppState(AppState.chat)
  return
}

function changeToSecret(messageContext: any) {
  messageContext.setBackgroundColor('#0e1234')
  messageContext.setBackgroundColor2('#0e1234')
  messageContext.setAppState(AppState.secret)
  return
}

function changeToOutside(messageContext: any) {
  messageContext.setAppState(AppState.welcome)
  messageContext.setBackground('dojoji_scene.webm')
  messageContext.setBackgroundColor('#06121b')
  messageContext.setBackgroundColor2('#06121b')
}
// Mint Genesis Pretzel. Removed this function from genesisPretzelMessage1 to have less double code for different number of Pretzels
//TODO @Johannes please review this function, I have almost no clue, what I am doing
async function mintGenesisPretzel(
  messageContext: IMessageContext,
  genesisPretzelContext: IGenesisPretzelContext,
  numberOfPretzels: number,
  newHist: MessageContent[]
) {
  //TODO @Nick what network is wallet on?
  const walletNetwork = 'Ethereum'
  newHist = await messageContext.addMessage({
    content: 'Minting bell(s) now ...',
    type: MessageType.text,
  })
  if (walletNetwork == 'Ethereum') {
    console.log('trying to mint now')
    console.log(genesisPretzelContext)
    const tokenId = await genesisPretzelContext.mint(numberOfPretzels)

    const mintSuccessful = tokenId >= 0
    if (!mintSuccessful) {
      console.log('Mint unSuccessful')
      return messageContext.addMessage(
        somethingWentWrongWhileMintingMessage,
        newHist
      )
    } else {
      console.log('Mint successful')
      //TODO @Johannes, this fails
      return await messageContext.addMessage(genesisPretzelMessage2, newHist)
    }
  } else {
    console.log('wrong chain')
    return messageContext.addMessage(changeChainEthereumMessage, newHist)
  }
}

// ******************* Menu Message Nodes *******************
export const welcomeMessage: MessageContent = {
 
  content: [
    'Hello wanderer!',
    'Welcome to the Bell of Dojoji!', 
    'Let us begin our journey...',
    'To enter Dojoji and see what lays beyond, first we must check if you are a worthy candidate!',
   
    
  ],
  actions: [
    {
      content: 'Enter Temple',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Yes! Please lemme in',
          type: MessageType.text,
          sendByUser: true,
        })
        const isHolder = await ISugarPretzelContext.isHolder()
        let address = web3Context.address
        web3Context.setTargetContract('SUGAR_PRETZEL_CONTRACT')
        if (web3Context.address) {
          console.log('Wallet connected')
          newHist = await messageContext.addMessage(
            {
              content:
                'Your wallet is connected.\nYour address: ' +
                web3Context.address,
              type: MessageType.text,
            },
            newHist
          )
          if (!web3Context.isCorrectChain('SUGAR_PRETZEL_CONTRACT')) {
            return messageContext.addMessage(changeChainPolygonMessage, newHist)
          }
        if(!isHolder)
            return messageContext.addMessage(freePretzelMessage, newHist)
          else
         {changeToSecret(messageContext)
            return messageContext.addMessage(
              connectWalletEthereumMessage,
              //clears hist
              []
            )}
          
        } else {
          console.log('Wallet not connected')
          return messageContext.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Pray and Ring',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'Genesis Pretzel sounds interesting!',
          type: MessageType.text,
          sendByUser: true,
        })
        web3Context.setTargetContract('GENESIS_PRETZEL_CONTRACT')
        if (web3Context.address) {
          console.log('Wallet connected')
          changeToSecret(messageContext)
          newHist = await messageContext.addMessage(
            {
              content:
                'Your wallet is already connected.\nYour address: ' +
                web3Context.address,
              type: MessageType.text,
            },
            newHist
          )
          if (!web3Context.isCorrectChain('GENESIS_PRETZEL_CONTRACT')) {
            return messageContext.addMessage(
              changeChainEthereumMessage,
              //clears hist
              []
            )
          }
          return messageContext.addMessage(
            checkSoldOutMessage,
            //clears hist
            []
          )
        } else {
          changeToSecret(messageContext)
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            //clears hist
            []
          )
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const checkSoldOutMessage: MessageContent = {
  content: ['Welcome to my secret room.', 'Let me quickly check may stash...'],
  actions: [
    {
      content: 'Ok',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'Ok.',
          type: MessageType.text,
          sendByUser: true,
        })
        const soldOut = await genesisPretzelContext.isSoldOut()
        let address = web3Context.address

        if (soldOut) {
          return messageContext.addMessage(
            genesisPretzelsSoldOutMessage,
            newHist
          )
        } else {
          newHist = await messageContext.addMessage(
            {
              content: 'We still have Genesis Pretzels on stock.',
              type: MessageType.text,
            },
            newHist
          )
          return messageContext.addMessage(genesisPretzelMessage1, newHist)
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const mainMenuMessage: MessageContent = {
  content: ['Have you Prayed or Ringed the bell today?'],
  actions: [
    {
      content: '!Pray',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'i must !pray to become whole again',
          type: MessageType.text,
          sendByUser: true,
        })

        web3Context.setTargetContract('SUGAR_PRETZEL_CONTRACT')
        console.log('ON CHAIN:', web3Context.targetContract)
        if (web3Context.address) {
          console.log('Wallet connected')
          if (!web3Context.isCorrectChain('SUGAR_PRETZEL_CONTRACT')) {
            return messageContext.addMessage(changeChainPolygonMessage, newHist)
          }
        
        
            return messageContext.addMessage(freePretzelMessage, newHist)
         
        } else {
          console.log('Wallet not connected')
          return messageContext.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: '!Ring',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'Genesis Pretzel sounds interesting!',
          type: MessageType.text,
          sendByUser: true,
        })
        web3Context.setTargetContract('GENESIS_PRETZEL_CONTRACT')
        console.log('ON CHAIN:', web3Context.targetContract)

        if (web3Context.address) {
          console.log('Wallet connected')
          changeToSecret(messageContext)
          if (!web3Context.isCorrectChain('GENESIS_PRETZEL_CONTRACT')) {
            return messageContext.addMessage(
              changeChainEthereumMessage,
              //clears hist
              []
            )
          }
          return messageContext.addMessage(
            checkSoldOutMessage,
            //clears hist
            []
          )
        } else {
          changeToSecret(messageContext)
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            //clears hist
            []
          )
        }
      },
    },
    {
      content: 'Leave Shop',
      onClick: async (messageContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Thank you so much! See you soon.',
          type: MessageType.text,
          sendByUser: true,
        })
        await sleep(2000)
        changeToOutside(messageContext)
        return []
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// ******************* Content Helper *******************

export const setUpMetamaskMessage: MessageContent = {
  content: [
    "So you don't have a wallet, yet?",
    "No worries! If you don't know what a wallet is checkout the course by Bankless Academy.",
    'If you just need to set up Metamask, go straight to the installation page.',
  ],
  actions: [
    {
      content: 'Bankless Academy',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'Let me do the lesson.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url = 'https://app.banklessacademy.com/lessons/wallet-basics'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        newHist = await messageContext.addMessage(
          {
            content: 'Great, let me know when you are ready!',
            type: MessageType.text,
          },
          newHist
        )
        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage2,
            newHist
          )
        } else {
          return messageContext.addMessage(
            connectWalletPolygonMessage2,
            newHist
          )
        }
      },
    },
    {
      content: 'Metamask Chrome extension',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'Let me set up Metamask',
          type: MessageType.text,
          sendByUser: true,
        })
        const url =
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        newHist = await messageContext.addMessage(
          {
            content: 'Great, let me know when you are ready!',
            type: MessageType.text,
          },
          newHist
        )
        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage2,
            newHist
          )
        } else {
          return messageContext.addMessage(
            connectWalletPolygonMessage2,
            newHist
          )
        }
      },
    },
    {
      content: 'I got everything.',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'I got everything.',
          type: MessageType.text,
          sendByUser: true,
        })
        newHist = await messageContext.addMessage(
          {
            content: 'Great! Let us continue, then.',
            type: MessageType.text,
          },
          newHist
        )
        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(
            connectWalletEthereumMessage2,
            newHist
          )
        } else {
          return messageContext.addMessage(
            connectWalletPolygonMessage2,
            newHist
          )
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const whatIsAChainMessage: MessageContent = {
  content: [
    'A blockchain is a decentralized ledger that lets you store data.\nFor example it stores which NFT belongs to which wallet.',
    'At the moment, the most common chain for NFTs is Ethereum.\nHowever, it is also quite expensive.',
    'For our Sugar Pretzels we therefore use Polygon.\nAnd our Genesis Pretzels are on Ethereum',
  ],
  actions: [
    {
      content: 'Got it!',
      onClick: async (messageContext, web3Context) => {
        const newHist = await messageContext.addMessage({
          content: 'Got it!',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          return messageContext.addMessage(changeChainEthereumMessage2, newHist)
        } else {
          return messageContext.addMessage(changeChainPolygonMessage2, newHist)
        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// *********************************************************
// ******************** Free Pretzels Minting *******************

export const connectWalletPolygonMessage: MessageContent = {
  content: [
    'One step closer to join us in this quest...',
    'First You need to connect your wallet.',
  ],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (messageContext, web3Context, sugarPretzelContext) => {
        let loginState = LoginState.notInstalled
        let newHist = await messageContext.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context) {
          loginState = await web3Context.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await messageContext.addMessage(
            {
              content:
                'Metamask is not installed, please install it!\nYou are wondering what a wallet is?',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(
            setUpMetamaskMessage,
            newHist
          )

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await messageContext.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        //TODO @Nick web3Context.address seams to not update quickly enough. Can not post it.
        // newHist = await messageContext.addMessage(
        //   {
        //     content:
        //       'You connected the following address:\n' + web3Context.address,
        //     type: MessageType.text,
        //   },
        //   newHist
        // )
      
        // Wallet just got connected -> Context update. canMintGasless needs to be checked in another message
        return messageContext.addMessage(checkCanMintGasless, newHist)
      },
    },
    {
      content: 'Set up Metamask',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Help me set up Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(setUpMetamaskMessage, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const connectWalletPolygonMessage2: MessageContent = {
  content: [],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (messageContext, web3Context, sugarPretzelContext) => {
        let loginState = LoginState.notInstalled
        let newHist = await messageContext.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context) {
          loginState = await web3Context.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await messageContext.addMessage(
            {
              content:
                'Metamask is not installed, please install it!\nYou are wondering what a wallet is?',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(
            setUpMetamaskMessage,
            newHist
          )

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await messageContext.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        //TODO @Nick web3Context.address seams to not update quickly enough. Can not post it.
        // newHist = await messageContext.addMessage(
        //   {
        //     content:
        //       'You connected the following address:\n' + web3Context.address,
        //     type: MessageType.text,
        //   },
        //   newHist
        // )
        if (!web3Context?.isCorrectChain()) {
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
        // Wallet just got connected -> Context update. canMintGasless needs to be checked in another message
        return messageContext.addMessage(checkCanMintGasless, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainPolygonMessage: MessageContent = {
  content: [
    'Your wallet is connected to the wrong Network.',
    'Please change chain to Polygon.',
  ],
  actions: [
    {
      content: 'Change to Polygon!',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Changing to Polygon.',
          type: MessageType.text,
          sendByUser: true,
        })
        const switchSuccess = await web3Context.switchToCorrectChain()
        if (!switchSuccess) {
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
        // Chain just got changed to Polygon -> Context update. canMintGasless needs to be checked in another message
        return messageContext.addMessage(checkCanMintGasless, newHist)
      },
    },
    {
      content: 'What is a chain?',
      onClick: async (messageContext) => {
        let newHist = await messageContext.addMessage({
          content: 'What is a chain?',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(whatIsAChainMessage, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainPolygonMessage2: MessageContent = {
  content: ['Great, now let us switch chain.'],
  actions: [
    {
      content: 'Change to Polygon!',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Changing to Polygon.',
          type: MessageType.text,
          sendByUser: true,
        })
        const switchSuccess = await web3Context.switchToCorrectChain()
        if (!switchSuccess) {
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
        // Chain just got changed to Polygon -> Context update. canMintGasless needs to be checked in another message
        return messageContext.addMessage(checkCanMintGasless, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}


export const freePretzelMessage: MessageContent = {
  content: [
    'Your journey Begins Now!',
    'The monk must pray and the bell must Ring... \n The only way to open the trade of $Dojoji is by praying and ringing the bell!',
    'But first you must have a Bell...',
    
  ],
  actions: [
    {
      content: 'Mint BELL',
      onClick: async (messageContext, web3Context, sugarPretzelContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Give me a Bell, please!',
          type: MessageType.text,
          sendByUser: true,
        })

        if (web3Context.isCorrectChain()) {
          console.log('trying to mint now')
          console.log(sugarPretzelContext)

          const tokenIdPromise = sugarPretzelContext.mintBell()

          newHist = await messageContext.addMessage(
            {
              content: [
                'While we are waiting, let me tell you a bit about this Journey.',
                'With each mint the bell rings...After reaching our goal a token is released',
                'You must pray and ring to becomme englightened and trade $Dojoji without fees',
                'Now let us wait for the bell to mint...',
              ],
              delay: 2000,
              type: MessageType.text,
            },
            newHist
          )
          console.log('awaiting id')
          const tokenId = await tokenIdPromise
          TOKENID = tokenId
          console.log('got id', tokenId)

          //TODO @Johannes spinning wheel?

          const mintSuccessful = tokenId >= 0
          if (!mintSuccessful) {
            console.log('Mint unSuccessful')
            return messageContext.addMessage(
              somethingWentWrongWhileMintingMessage,
              newHist
            )
          } else {
           
            const data = await fetch(
              CONFIG.BACKEND_URL + '/sugarpretzel/' + tokenId
            )
            const datajson = await data.json()
            console.log('adding image for ', datajson)
            newHist = await messageContext.addMessage(
              {
                content: 'You are one step closer to enligtnment',
                type: MessageType.text,
              },
              newHist
            )
            console.log('RESPONSE:', datajson)
           
            await sleep(400)
            return messageContext.addMessage(freePretzelMessage2, newHist)
          }
        } else {
          console.log('wrong chain')
          return messageContext.addMessage(changeChainPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'No, I dont want to be enlightned.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'Link to FAQ',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'I would like to learn more.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url =
          'https://www.notion.so/pretzeldao/The-Bakery-FAQ-9324e4ace9a948b681ec994b50d133a4'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        newHist = await messageContext.addMessage(
          {
            content: 'Sure, let me know when you are ready!',
            type: MessageType.text,
          },
          newHist
        )
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const freePretzelMessage2: MessageContent = {
  content: ['Help the community launch $DOJOJI faster', 'Spread the word on twitter!'],
  actions: [
    {
      content: 'Of course!',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Of course!',
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Nick think about way to store last token mint

        const pretzel_id = TOKENID
        const twitterMessage = `Look%20at%20my%20awesome%20Pretzel%20fresh%20from%20the%20bakery%21%0Ahttps%3A%2F%2Fopensea.io%2Fassets%2Fmatic%2F0xbb542c33014ea667166361213e94135dab695d9c%2F${pretzel_id}%0AThe%20first%20one%20is%20100%25%20free%2C%20and%20by%20that%20I%20mean%20even%20gasless.%0A%40PretzelDAO%20%23sugarpretzels%20%0A`
        const url = `https://twitter.com/intent/tweet?text=${twitterMessage}`
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return messageContext.addMessage(freePretzelMessage3, newHist)
      },
    },
    {
      content: 'No',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(freePretzelMessage3, newHist)
      },
    },
  ],
  delay: 1000,
  type: [MessageType.text, MessageType.text],
}

export const freePretzelMessage3: MessageContent = {
  content: ['Do you also want to look at your bell on Opensea?'],
  actions: [
    {
      content: 'Yes',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Yes, let me have a look.',
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Nick think about way to store last token mint
        const url = buildURL(1, 'sugarpretzel')
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'No',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: [MessageType.text, MessageType.text],
}

// *********************************************************
// ******************** Genesis Pretzels Minting *******************

export const connectWalletEthereumMessage: MessageContent = {
  content: [
    'Genesis Pretzels are stored on the Ethereum blockchain.',
    'In order to mint them, you need to connect your wallet.',
  ],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let loginState = LoginState.notInstalled
        let newHist = await messageContext.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context) {
          loginState = await web3Context.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await messageContext.addMessage(
            {
              content:
                'Metamask is not installed, please install it!\nYou are wondering what a wallet is?',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(
            setUpMetamaskMessage,
            newHist
          )

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await messageContext.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        //TODO @Nick web3Context.address seams to not update quickly enough. Can not post it.
        // newHist = await messageContext.addMessage(
        //   {
        //     content:
        //       'You connected the following address:\n' + web3Context.address,
        //     type: MessageType.text,
        //   },
        //   newHist
        // )
        if (!web3Context?.isCorrectChain()) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        } else {
          return messageContext.addMessage(checkSoldOutMessage, newHist)
        }
      },
    },
    {
      content: 'Set up Metamask',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Help me set up Metamask.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(setUpMetamaskMessage, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const connectWalletEthereumMessage2: MessageContent = {
  content: [],
  actions: [
    {
      content: 'Connect Metamask',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        let loginState = LoginState.notInstalled
        let newHist = await messageContext.addMessage({
          content: 'Connecting Metamask...',
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context) {
          loginState = await web3Context.loginMetamask(true)
        }
        if (loginState == LoginState.notInstalled) {
          console.log('No metamask')
          newHist = await messageContext.addMessage(
            {
              content:
                'Metamask is not installed, please install it!\nYou are wondering what a wallet is?',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(
            setUpMetamaskMessage,
            newHist
          )

          return newHist
        }
        if (loginState == LoginState.error) {
          newHist = await messageContext.addMessage(
            {
              content: 'Metamask could not connect!',
              type: MessageType.text,
            },
            newHist
          )
          newHist = await messageContext.addMessage(mainMenuMessage, newHist)

          return newHist
        }
        //TODO @Nick web3Context.address seams to not update quickly enough. Can not post it.
        // newHist = await messageContext.addMessage(
        //   {
        //     content:
        //       'You connected the following address:\n' + web3Context.address,
        //     type: MessageType.text,
        //   },
        //   newHist
        // )
        if (!web3Context?.isCorrectChain()) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        }
        return messageContext.addMessage(checkSoldOutMessage, newHist)
      },
    },
    {
      content: 'Go Back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainEthereumMessage: MessageContent = {
  content: [
    'Your wallet is connected to the wrong Network.',
    'Please change chain to Ethereum.',
  ],
  actions: [
    {
      content: 'Change to Ethereum',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'Changing to Ethereum.',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Nick @Johannes check
        const switchSuccess = await web3Context.switchToCorrectChain()
        if (!switchSuccess) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        }
        return messageContext.addMessage(checkSoldOutMessage, newHist)
      },
    },
    {
      content: 'What is a chain?',
      onClick: async (messageContext) => {
        let newHist = await messageContext.addMessage({
          content: 'What is a chain?',
          type: MessageType.text,
          sendByUser: true,
        })
        return messageContext.addMessage(whatIsAChainMessage, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const changeChainEthereumMessage2: MessageContent = {
  content: ['Great, now let us switch chain.'],
  actions: [
    {
      content: 'Change to Ethereum!',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'Change to Ethereum!',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO @Nick @Johannes check this seams to be buggy.
        const switchSuccess = await web3Context.switchToCorrectChain()
        if (!switchSuccess) {
          return messageContext.addMessage(changeChainEthereumMessage, newHist)
        }
        return messageContext.addMessage(checkSoldOutMessage, newHist)
      },
    },
    {
      content: 'Go back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I do not want a pretzel.',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const genesisPretzelsSoldOutMessage: MessageContent = {
  content: [
    'Oh no, we are already out of Genesis Pretzels.',
    'Have a look at Opensea to buy some on the secondary market',
  ],
  actions: [
    {
      content: 'View on Opensea',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'Let me look.',
          type: MessageType.text,
          sendByUser: true,
        })
        //TODO Nick not sure if this link works .... OS added their route structure
        const url = buildURL(1, 'genesispretzel')
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'I am good',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: 'I am good.',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const genesisPretzelMessage1: MessageContent = {
  content: [
    'Genesis Pretzels were created by us and our friends at PretzelDAO\n to collect funds for making more cool stuff.',
    'They are all unique and will be revealed on Friday 3rd of June.',
    'You can mint as many as you want. They are 0.1 eth each.',
    'If you want several, minting in bulk is cheaper. How many do you want?',
  ],
  actions: [
    {
      content: '1',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: '1 is fine, thx!',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintGenesisPretzel(
          messageContext,
          genesisPretzelContext,
          1,
          newHist
        )
      },
    },
    {
      content: '2',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'I am having 2, please.',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintGenesisPretzel(
          messageContext,
          genesisPretzelContext,
          2,
          newHist
        )
      },
    },
    {
      content: '3',
      onClick: async (
        messageContext,
        web3Context,
        _,
        genesisPretzelContext
      ) => {
        let newHist = await messageContext.addMessage({
          content: 'I am having 3, please!',
          type: MessageType.text,
          sendByUser: true,
        })
        return mintGenesisPretzel(
          messageContext,
          genesisPretzelContext,
          3,
          newHist
        )
      },
    },
    {
      content: 'Link to FAQ',
      onClick: async (messageContext, web3Context) => {
        let newHist = await messageContext.addMessage({
          content: 'I would like to learn more.',
          type: MessageType.text,
          sendByUser: true,
        })
        const url =
          'https://www.notion.so/pretzeldao/The-Bakery-FAQ-9324e4ace9a948b681ec994b50d133a4'
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        newHist = await messageContext.addMessage(
          {
            content: 'Sure, let me know when you are ready!',
            type: MessageType.text,
          },
          newHist
        )
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'Go Back',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: "Actually, I don't want to buy one.",
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

export const genesisPretzelMessage2: MessageContent = {
  content: [
    'I put your pretzel(s) in your wallet!',
    'You can have a look at the preview on Opensea. \nBut they will only be revealed on Friday 3rd of June.',
  ],
  actions: [
    {
      content: 'Take me to Opensea',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: "Yes, let's go to Opensea.",
          type: MessageType.text,
          sendByUser: true,
        })
        // TODO @Nick think about how to store tken id
        //TODO @Johannes Link to Opensea
        const url = buildURL(1, 'genesispretzel')
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
    {
      content: 'I am good.',
      onClick: async (messageContext) => {
        const newHist = await messageContext.addMessage({
          content: "No, I'm good.",
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// *********************************************************
// ******************** Error Handling *******************

export const somethingWentWrongWhileMintingMessage: MessageContent = {
  content: ['Uh oh, seems like something went wrong.'],
  actions: [
    {
      content: 'Try again',
      onClick: async (messageContext, web3Context, ISugarPretzelContext, _) => {
        let newHist = await messageContext.addMessage({
          content: "Ok let's try again.",
          type: MessageType.text,
          sendByUser: true,
        })
        if (web3Context.targetContract == 'GENESIS_PRETZEL_CONTRACT') {
          if (web3Context.address) {
            if (!web3Context.isCorrectChain('GENESIS_PRETZEL_CONTRACT')) {
              return messageContext.addMessage(
                changeChainEthereumMessage,
                newHist
              )
            }
            return messageContext.addMessage(genesisPretzelMessage1, newHist)
          }
          return messageContext.addMessage(
            connectWalletEthereumMessage,
            newHist
          )
        } else {
          changeToInside(messageContext)
          if (web3Context.address) {
            console.log(web3Context.isCorrectChain('SUGAR_PRETZEL_CONTRACT'))
            console.log(web3Context.currentChainId)
            if (!web3Context.isCorrectChain('SUGAR_PRETZEL_CONTRACT')) {
              return messageContext.addMessage(
                changeChainPolygonMessage,
                newHist
              )
            }
          
              return messageContext.addMessage(freePretzelMessage, newHist)
            
          }
          return messageContext.addMessage(connectWalletPolygonMessage, newHist)
        }
      },
    },
    {
      content: 'Never mind',
      onClick: async (messageContext) => {
        let newHist = await messageContext.addMessage({
          content: 'Never mind.',
          type: MessageType.text,
          sendByUser: true,
        })
        changeToInside(messageContext)
        return messageContext.addMessage(mainMenuMessage, newHist)
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}

// ==========================================
export const checkCanMintGasless: MessageContent = {
  content: ['Let me have a look, whether you already own a bell.'],
  actions: [
    {
      content: 'Ok',
      onClick: async (messageContext, web3Context, ISugarPretzelContext) => {
        const isHolder = await ISugarPretzelContext.isHolder()
        let newHist = await messageContext.addMessage({
          content: 'Let me show you.',
          type: MessageType.text,
          sendByUser: true,
        })
        if(!isHolder){
          newHist = await messageContext.addMessage(
            {
              content: `Looks like you don't own a Bell`,
              type: MessageType.text,
            },
            newHist
          )
          return messageContext.addMessage(freePretzelMessage, newHist)
          }
        else{
          newHist = await messageContext.addMessage(
            {
              content: `You already have a Bell, please go Pray and Ring`,
              type: MessageType.text,
            },
            newHist
          )
          return messageContext.addMessage(freePretzelMessage, newHist)
          

        }
      },
    },
  ],
  delay: 1000,
  type: MessageType.text,
}
