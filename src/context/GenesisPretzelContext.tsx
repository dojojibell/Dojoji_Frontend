import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './GenesisPretzel.json'
import { useWeb3 } from './Web3Context'
import { BigNumber } from 'ethers'

export interface IGenesisPretzelContext {
  contractRead: ethers.Contract | undefined
  contractWrite: ethers.Contract | undefined
  mint: (quantity: number) => Promise<number>
  sendPray: ()  => Promise<boolean>
  isSoldOut: () => Promise<boolean>
}

const GenesisPretzelContext = createContext<IGenesisPretzelContext>(
  {} as IGenesisPretzelContext
)

const GenesisPretzelProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [contractWrite, setContractWrite] = useState<ethers.Contract>()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()

  const { provider, standardSigner, address, currentChainId } = useWeb3()

 
  const _sendpray = async (fn: (args: any) => Promise<any>, args: object) => {
    try {
      const txPending = await fn(args ?? {})
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMinted = await txPending.wait()
      console.log(txMinted)
      console.log(txMinted.blockNumber)

     

      
      return true
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
      }
      return false
    }
  }

  const sendPray = async () => {
    console.log(contractWrite)
    if (contractWrite === undefined) return false

    return _sendpray(contractWrite.sendPray(), {
      gasLimit: 300000,
    })
  }

  const mint = async (quantity: number) => {
    if (contractWrite === undefined){
      console.log("undifinedwrite")
      return -1}
    try {
      const txPending = await contractWrite.mintBell({
        value: ethers.utils.parseUnits(String(0.033), 'ether'),
      })
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMinted = await txPending.wait()
      console.log(txMinted)
      console.log(txMinted.blockNumber)

      const tokenId = txMinted.events[0].args[2] as ethers.BigNumber

      console.log(tokenId)
      console.log(tokenId.toNumber())
      return tokenId.toNumber()
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
      }
      return -1
    }
  }

  const isSoldOut = async () => {
    if (contractRead === undefined) return true
    console.log(contractRead)

    try {
      const totalSupply = (await contractRead.totalSupply()) as BigNumber
      const maxSupply = (await contractRead.bells()) as BigNumber
      console.log(maxSupply.toNumber())

      return totalSupply.toNumber() === maxSupply.toNumber()
    } catch (error) {
      console.log(error)
      return true
    }
  }

  useEffect(() => {
    console.log('TRYING TO SETUP SPECIAL PRETZEL CONTRACTS')

    if (provider === undefined) return
    setContractRead(
      new ethers.Contract(
        CONFIG.DOJOJI_GENESIS_CONTRACT.address,
        contract.abi,
        provider
      )
    )
    console.log('provider set')

    if (standardSigner === undefined) return
    setContractWrite(
      new ethers.Contract(
        CONFIG.DOJOJI_GENESIS_CONTRACT.address,
        contract.abi,
        standardSigner
      )
    )
    console.log('standardSigner set')
  }, [provider, standardSigner])

  return (
    <GenesisPretzelContext.Provider
      value={{
        contractRead,
        contractWrite,
        mint,
        sendPray,
        isSoldOut,
      }}
    >
      {children}
    </GenesisPretzelContext.Provider>
  )
}

const useGenesisPretzelContract = () => React.useContext(GenesisPretzelContext)

export { GenesisPretzelProvider, useGenesisPretzelContract }
