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
  claimBell: () => Promise<number>
  ringNumber: () => Promise<number>
  isHolder: () => Promise<boolean>
  isEligible: () => Promise<boolean>
  canRing: () => Promise<boolean>
  canPray: () => Promise<boolean>
  pray: () => Promise<number>
  ring: () => Promise<number>
  praytoMint: () => Promise<number>
  enlightnedBells: () => Promise<number>
  totalMints: () => Promise<number>
  totalPray: () => Promise<number>
  mintPrice: () => Promise<string>
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
  const _send = async (fn: (args: any) => Promise<any>, args: object) => {
    if (contractRead === undefined) return -1
    try {
      const txPending = await fn(args ?? {})
      console.log(txPending.hash)
      setTxHash(txPending.hash)

      const txMinted = await txPending.wait()
    
     
      
      return 1
    } catch (error) {
      if (error?.code === -32603) {
        const errorMessage = error.data.message.split(': ')[1]
        console.log(errorMessage)
      }
      return -1
    }
  }


  const praytoMint = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _send(contractStandardWrite.prayToMint(), {
      value: ethers.utils.parseUnits(String(0), 'ether'),
      gasLimit: 500000,
      
    })
  }

  const pray = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _send(contractStandardWrite.pray(), {
      value: ethers.utils.parseUnits(String(0), 'ether'),
      gasLimit: 500000,
      
    })
  }
  const ring = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _send(contractStandardWrite.ringBell(), {
      value: ethers.utils.parseUnits(String(0), 'ether'),
      gasLimit: 500000,
      
    })
  }
  const mintBell = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _mint(contractStandardWrite.mintBell, {
      value: ethers.utils.parseUnits(String(0.0333), 'ether'),
      gasLimit: 500000,
      
    })
  }
  const claimBell = async () => {
    console.log(contractStandardWrite)
    if (contractStandardWrite === undefined) return -1

    return _mint(contractStandardWrite.claimBell, {
      value: ethers.utils.parseUnits(String(0.0222), 'ether'),
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
  const totalPray = async () => {
    console.log("trying totalpray")
    if (contractRead === undefined) return -1
    console.log(contractRead)

    try {
      const prayers = (await contractRead._totalpray()) as BigNumber
      console.log("totalprays")
      console.log(prayers)
      return prayers.toNumber()
    } catch (error) {
      console.log(error)
      return -1
    }
  }
  const enlightnedBells = async () => {
    if (contractRead === undefined) return -1
    console.log(contractRead)

    try {
      const eBell = (await contractRead._enligthenedBells()) as BigNumber
      
      return eBell.toNumber()
    } catch (error) {
      console.log(error)
      return -1
    }
  }
  const totalMints = async () => {
    if (contractRead === undefined) return -1
    console.log(contractRead)

    try {
      const mints = (await contractRead.totalSupply()) as BigNumber
      
      return mints.toNumber()
    } catch (error) {
      console.log(error)
      return -1
    }
  }
  const mintPrice = async () => {
    if (contractRead === undefined) return "false"
    console.log(contractRead)

    try {
      const _mintprice = (await contractRead.userMintPrice(address)) as BigNumber
     const ethvalue= ethers.utils.formatEther(_mintprice);
      return ethvalue.substring(0,5);
    } catch (error) {
      console.log(error)
      return "false"
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
  const isEligible = async () => {
    
    if (contractRead === undefined) return false

    try {
      const isEligible = (await contractRead.isEligible(address)) 
      
      return isEligible
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const canRing = async () => {
    
    if (contractRead === undefined) return false

    try {
      const ring = (await contractRead._canRing(address)) 
      
      
      return ring
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const canPray = async () => {
    
    if (contractRead === undefined) return false

    try {
      const pray = (await contractRead._canPray(address)) 
     
      return pray
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
        claimBell,
        isHolder,
        canRing,
        canPray,
        isEligible,
        ring,
        pray,
        praytoMint,
        enlightnedBells,
        totalMints,
        totalPray,
        mintPrice
      }}
    >
      {children}
    </SugarPretzelContext.Provider>
  )
}

const useSugarPretzelContract = () => React.useContext(SugarPretzelContext)

export { SugarPretzelProvider, useSugarPretzelContract }
