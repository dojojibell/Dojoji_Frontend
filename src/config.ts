const CHAIN_CONFIG = {
  polygon: {
    NAME: 'Polygon',
    SYMBOL: 'Matic',
    ID: 137,
    SCAN_LINK: 'https://polygonscan.com',
    RPC_URL: 'https://polygon-rpc.com/',
  },
  mumbai: {
    NAME: 'Mumbai',
    SYMBOL: 'Matic',
    ID: 80001,
    SCAN_LINK: 'https://explorer-mumbai.maticvigil.com',
    RPC_URL: 'https://rpc-mumbai.maticvigil.com',
  },
  mainnet: {
    NAME: 'Ethereum',
    SYMBOL: 'ETH',
    ID: 1,
    SCAN_LINK: 'https://etherscan.io',
    RPC_URL: 'https://mainnet.infura.io/v3/',
  },
  kovan: {
    NAME: 'Kovan',
    SYMBOL: 'ETH',
    ID: 42,
    SCAN_LINK: 'https://kovan.etherscan.io',
    RPC_URL: 'https://kovan.infura.io/v3/',
  },
  goerli: {
    NAME: 'goerli',
    SYMBOL: 'ETH',
    ID: 5,
    SCAN_LINK: 'https://goerli.etherscan.io',
    RPC_URL: 'https://goerli.infura.io/v3/',
  },
}

export const CONFIG = {
  DEV: true,
  DOJOJI_GENESIS_CONTRACT: {
    address: '0xE60Db8F7fbfEd857828a7eeD4F6373E7D0acF722',
    DEV_CONFIG: CHAIN_CONFIG['goerli'],
    MAIN_CONFIG: CHAIN_CONFIG['goerli'],
  },
  SUGAR_PRETZEL_CONTRACT: {
    address: '0xE60Db8F7fbfEd857828a7eeD4F6373E7D0acF722',
    DEV_CONFIG: CHAIN_CONFIG['goerli'],
    MAIN_CONFIG: CHAIN_CONFIG['goerli'],
  },
  PAYMASTER_CONTRACT: { address: '0x51CD28C89EB7B4620AE9beB3dcCA53b8501768e2' },
  GAS_LIMIT: null,
  BACKEND_URL: 'https://metadata.pretzeldao.com',
}
