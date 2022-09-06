import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONFIG } from '../config'
import contract from './SugarPretzel.json'
import { useWeb3 } from './Web3Context'
import { BigNumber } from 'ethers'
export interface ISugarPretzelContext {
  contractRead: ethers.Contract | undefined
  contractGaslessWrite: ethers.Contract | undefined
  contractStandardWrite: ethers.Contract | undefined
  mintBell: () => Promise<number>
  ringNumber: () => Promise<number>
  isHolder: () => Promise<boolean>
  canRing: () => Promise<boolean>
}

const SugarPretzelContext = createContext<ISugarPretzelContext>(
  {} as ISugarPretzelContext
)

const SugarPretzelProvider = ({ children }: { children: React.ReactNode }) => {
  const [contractGaslessWrite, setContractGaslessWrite] =
    useState<ethers.Contract>()
  const [contractStandardWrite, setContractStandardWrite] =
    useState<ethers.Contract>()
  const [contractRead, setContractRead] = useState<ethers.Contract>()
  const [txHash, setTxHash] = useState<String>()

  const { provider, gaslessSigner, standardSigner, address } = useWeb3()

  const _mint = async (fn: (args: any) => Promise<any>, args: object) => {
    if (contractRead === undefined) return -1
    try {
      const txPending = await fn(args ?? {})
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMinted = await txPending.wait()
      console.log(txMinted)
      console.log(txMinted.blockNumber)
     
     
      const tokenId = (await contractRead.totalSupply()) as BigNumber
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



  const mintBell = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _mint(contractStandardWrite.mintBell, {
      value: ethers.utils.parseUnits(String(0.0333), 'ether'),
      gasLimit: 500000,
      
    })
  }
  const ringNumber = async () => {
    if (contractRead === undefined) return -1
    console.log(contractRead)

    try {
      const rings = (await contractRead._totalRings()) as BigNumber
      
      return rings.toNumber()
    } catch (error) {
      console.log(error)
      return -1
    }
  }

  const isHolder = async () => {
    
    if (contractRead === undefined) return false

    try {
      const balance = (await contractRead.balanceOf(address)) as BigNumber
      console.log("o nr de bells",balance)
      if(balance > BigNumber.from(0))
      return true
      else
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const canRing = async () => {
    
    if (contractRead === undefined) return false

    try {
      const prays = (await contractRead.userPraySinceRing(address)) as BigNumber
      console.log("o nr de prays",prays)
      if(prays > BigNumber.from(2))
      return true
      else
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    if (provider === undefined) return
    setContractRead(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        provider
      )
    )
    console.log('provider set')

    if (standardSigner === undefined) return
    setContractStandardWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        standardSigner
      )
    )
    console.log('standardSigner set')

    if (gaslessSigner === undefined) return
    setContractGaslessWrite(
      new ethers.Contract(
        CONFIG.SUGAR_PRETZEL_CONTRACT.address,
        contract.abi,
        gaslessSigner
      )
    )
    console.log('gaslessSigner set')
  }, [provider, standardSigner, gaslessSigner])

  return (
    <SugarPretzelContext.Provider
      value={{
        contractRead,
        contractGaslessWrite,
        contractStandardWrite,
        ringNumber,
        mintBell,
        isHolder,
        canRing,
      }}
    >
      {children}
    </SugarPretzelContext.Provider>
  )
}

const useSugarPretzelContract = () => React.useContext(SugarPretzelContext)

export { SugarPretzelProvider, useSugarPretzelContract }
