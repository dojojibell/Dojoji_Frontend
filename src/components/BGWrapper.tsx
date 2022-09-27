import CSS from 'csstype'
import React from 'react'
import { BigNumber } from 'ethers'
import { useEffect,useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { AppState, useMessageContext } from '../context/MessageContext'
import { ISugarPretzelContext,useSugarPretzelContract} from '../context/SugarPretzelContext'
import { Welcome } from '../Welcome'
import { useWeb3 } from '../context/Web3Context'
import { ChatInterface } from './ChatInterface'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { Transition } from '@headlessui/react'
export const BGWrapper: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  const web3 =useWeb3()
const dojojiContext = useSugarPretzelContract()
const [totalsupply, setTotalSupply] = useState(Number);
const [prayers, setPrayers] = useState(Number);
const [rings, setRings] = useState(Number);
const [enlightnedBells, setEnlightnedBells] = useState(Number);
const [mintPrice, setMintPrice] = useState(String);
const [hasBell, setHasBell] = useState(Boolean);


const connect = async () => {
  console.log(web3)
 await web3.loginMetamask(false)
  
};

useEffect(() => {
  console.log("this is context");
console.log(dojojiContext);
  if (!dojojiContext) return;

  
  const load = async () => {
    setTotalSupply(await dojojiContext.ringNumber());
    setPrayers(await dojojiContext.totalPray());
    setEnlightnedBells(await dojojiContext.enlightnedBells());
    setMintPrice(await dojojiContext.mintPrice());
    setRings(await dojojiContext.ringNumber());
    setHasBell(await dojojiContext.isHolder());
  };
  load()
}, [dojojiContext]);

async function mint( ){
  if(hasBell)
  await dojojiContext.ring();
  else
  await dojojiContext.mintBell();
}
async function pray( ){
 
 if(hasBell)
  await dojojiContext.pray();
else
  await dojojiContext.praytoMint();

  const twitterMessage = `This%20is%20my%20proof%20of%20pray%20for%20today%21%0ACome%20pray%20with%20me%20to%20ring%20the%20bell%20and%20open%20the%20trading%20of%20$DOJOJI%20token%20%0A%0Ahttps%3A%2F%2Fwww.dojoji.quest%20%0A%40DojojiETH%20%23PRAYTOMINT%20%0A`
  const url = `https://twitter.com/intent/tweet?text=${twitterMessage}`
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  
}

const isMobile = window.innerWidth <= 1000;
  const bgprops: CSS.Properties = {
    // backgroundImage: `url('/scenes/${messageContext.background}')`,
   
    background: " radial-gradient(circle, rgba(17,44,64,1) 0%, rgba(6,18,27,1) 96%)"
  }
  const bgprops2: CSS.Properties = {
    background: `linear-gradient(0.25turn,#00000000,${messageContext.backgroundColor})`,
    borderRadius: '25px',
    
  }
  const bgprops3: CSS.Properties = {
    background: `linear-gradient(0.75turn,#00000000,${messageContext.backgroundColor})`,
    borderRadius: '25px',
    position: 'relative',
    fontFamily: 'chandler-42-regular',
    fontWeight: '800',
    width: '200%',

    height: '50%',
    right: '5vh',
  }
  const bgpropsColor: CSS.Properties = {
    backgroundColor: messageContext.backgroundColor2,
  }

  return (
    <div
      className="bg-yellow-800 flex flex-col h-screen bg-top overflow-hidden"
      style={bgprops}
    >
      <Transition
        appear={true}
        key={'bg'}
        show={messageContext.appState == AppState.welcome}
       
        enterFrom="opacity-0 "
        enterTo="opacity-100 "
        leave="transition transform scale ease-linear duration-800  "
        leaveFrom="opacity-100 translate-x-0 scale-y-100"
        leaveTo="opacity-0 -translate-x-5 scale-y-120"
      >
        <video
          autoPlay
          loop
          muted
          className="absolute content-center w-screen h-screen"
          poster="/scenes/ou_bakery.png"
          style={{position: "fixed" ,width: isMobile ?  "100%": "50%",left: isMobile ? "3%" :"26%",bottom:isMobile ? "10%" :"5%"}}
        >
          <source src="/scenes/dojojii.webm" type="video/webm" />
        </video>
      </Transition>
      <div className="flex flex-col h-screen bg-top" style={bgpropsColor}>
        <AppHeader />
        {children}

        <Transition
          className="flex h-full flex-row justify-start mr-4 ml-2"
          appear={true}
          key={'bg'}
          show={messageContext.appState == AppState.chat}
        
          enterFrom="opacity-0  "
          enterTo="opacity-100 "
        >
          <div
            className="container  px-32 z-3 justify-start items-center"
            style={{
              
              top: '10px',
              zIndex: '0',
            }}
          >
            <video
              autoPlay
              loop
              muted
              className="absolute object-cover content-center w-screen h-screen"
              poster="/scenes/inside_bakery.png"
              style={{
                top: '0px',
                left: '0px',
                zIndex: '0',
              }}
            >
              <source
                src="/scenes/inside_bakery_scene.webm"
                type="video/webm"
              />
            </video>

            {web3.address && !isMobile && (<div
              className="container z-0 flex flex-row justify-end"
              style={{
                background: `linear-gradient(0.75turn,#00000000,${messageContext.backgroundColor})`,
                borderRadius: '25px',
                position: 'relative',
                minWidth: '400px',
                maxWidth: '700px',
                width: '150%',
                height: '50%',
                minHeight:"370px",

                
                alignItems: 'bottom',
                padding: '30px',
                paddingTop: '100px',
              }}
            >
              <div
                style={{
                  color: 'rgba(240,235,202,0.9)',
                  fontFamily: 'Shenttpuro, sans-serif',
                  wordSpacing: "-3px",
                  fontWeight: '800',
                  fontSize: '4rem',
                  top: '0px',
                  left: '15px',
                  position: 'absolute',
                }}
              >
                Bell of Dojoji
              </div>
            

              <div
                className="container z-0 flex flex-column justify-left"
                style={{
                  fontFamily: 'chandler-42-regular',
                  fontWeight: '800',
                  fontSize: '1.2rem',
                  padding: '10px',
                  borderRadius: '25px',
             
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-end',
                }}
              >
                  <div
                style={{
                  color: 'rgba(240,235,202,1)',
                  fontFamily: 'chandler-42-regular',
                  fontWeight: '800',
                  fontSize: '1rem',
                  bottom: '20%',
                  width:"70%",
                  left: '3%',
                  position: 'absolute',
                }}
              >{"#rings until launch:"}
                <div
                  style={{
                    position: 'absolute',
                    marginTop:"10px",
                    marginLeft:"10px",
                    width: '50%',
                    zIndex:"5",
                    height: '20px',
                    background:
                    'linear-gradient(200deg,rgba(240,235,202,0.7) ,rgba(240,235,202,0.7))',
                  
                    borderRadius: '4px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
                  }}
                >
                   <div
                  style={{
                    transition:" width 0.5s linear",
                    height: "100%",
                    width:`${rings*100/10}%`,
                    backgroundColor: "#29556E",
                    borderRadius: "4px"
                  }}
                >
             
                
  </div>
  <div
                style={{
                  color: 'rgba(240,235,202,1)',
                  fontFamily: 'chandler-42-regular',
                  fontWeight: '800',
                  fontSize: '2.5rem',
                  bottom: "-25px",
                  width:"160%",
                  left: '110%',
                 
                  position: 'absolute',
                }}
              >{rings}/777 
              
              <button onClick={mint}
               className=" transform rounded-md hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer "
              style={{  
                bottom:"10%",
                 width:"15%",
                 height:"70px",
                 borderRadius:"10px",
                 marginLeft:"15px",
                 background:
                    `linear-gradient(90deg,rgba(6,18,27,0.9),rgba(6,18,27,0.5) )`,
                  boxShadow:
                    ' -24px 24px 48px #0a141a,24px -24px 48px rgba(11,23,29,0.4)',}}>

                      <div style={{ background: '-webkit-linear-gradient(#f0ecca, #f0ecca)',
                    WebkitBackgroundClip: 'text',
                   

                    WebkitTextFillColor: 'transparent',}}>
              🔔
            
              </div>
              <div style={{position:"absolute", color: 'rgba(240,235,202,1)',
                  fontFamily: 'chandler-42-regular',
                  fontWeight: '400',
                  fontSize: '1rem',
                  left:"10px",
                  bottom: "-3px",}}>
                    { hasBell && (
              <a> Ring</a> )}
              { !hasBell && (
              <a> Mint</a> )}
                </div>
              </button>
              <button 
              onClick={pray}
              className=" transform rounded-md hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer "
              style={{  
                 width:"15%",
                 height:"70px",
                 borderRadius:"10px",
                 marginLeft:"10px",
                 background:
                    `linear-gradient(90deg,rgba(6,18,27,0.9),rgba(6,18,27,0.5) )`,
                  boxShadow:
                    ' -24px 24px 48px #0a141a,24px -24px 48px rgba(11,23,29,0.4)',}}>

                      <div style={{ background: '-webkit-linear-gradient(#f0ecca, #f0ecca)',
                    WebkitBackgroundClip: 'text',
                   

                    WebkitTextFillColor: 'transparent',}}>
              🙏🏻
            
              </div>
              <div style={{position:"absolute", color: 'rgba(240,235,202,1)',
                  fontFamily: 'chandler-42-regular',
                  fontWeight: '400',
                  fontSize: '1rem',
                  right:"10px",
                  bottom: "-3px",}}>
                Pray
                </div>
              </button>
              
              </div>
                </div>
              </div>
                <div
                  style={{
                    flexDirection: 'column',
                    background: '-webkit-linear-gradient(#d3eded, #deffe8)',
                    WebkitBackgroundClip: 'text',
                    marginLeft: '10%',

                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <div
                    className="container z-0 flex flex-row justify-left"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  >
                    Bell{' '}
                    <div style={{position:"relative",left:"10px"}}>
                    <svg width="25" height="25" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z" fill="#a9aa96"/>
</svg>

                   </div> <div style={{position:"relative",left:"15px"}}> <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 293.775 293.667"
                    >
                      <g
                        id="etherscan-logo-light-circle"
                        transform="translate(-219.378 -213.333)"
                      >
                        <path
                          id="Path_1"
                          data-name="Path 1"
                          d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.467-12.47h20.779a12.47,12.47,0,0,1,12.467,12.47v90.276s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.465-12.467h20.779A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
                          transform="translate(0 0)"
                          fill="#a9aa96"
                        />
                        <path
                          id="Path_2"
                          data-name="Path 2"
                          d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.405-232.79,128.793"
                          transform="translate(35.564 80.269)"
                          fill="#a9aa96"
                        />
                      </g>
                    </svg>
                    </div>
                  </div>
                  <ul>Mints: {totalsupply}/3333 🔔</ul>
                  <p>
                    <p>_totalPray: {prayers} 🙏🏻 </p>
                     <p>_enligthenedBells: {enlightnedBells}  ⛩️</p>
                     <p>_userMintPrice: {mintPrice}Ξ</p>
                  </p>
                </div>

                <div>
                  <div
                    className="container z-0 flex flex-row justify-left"
                    style={{
                      background: '-webkit-linear-gradient(#d3eded, #deffe8)',
                      WebkitBackgroundClip: 'text',

                      WebkitTextFillColor: 'transparent',
                      fontSize: '1.5rem',
                    }}
                  >
                    $Dojoji{' '}
                    <div style={{position:"relative",left:"10px"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 293.775 293.667"
                    >
                      <g
                        id="etherscan-logo-light-circle"
                        transform="translate(-219.378 -213.333)"
                      >
                        <path
                          id="Path_1"
                          data-name="Path 1"
                          d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.467-12.47h20.779a12.47,12.47,0,0,1,12.467,12.47v90.276s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.465-12.467h20.779A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152"
                          transform="translate(0 0)"
                          fill="#a9aa96"
                        />
                        <path
                          id="Path_2"
                          data-name="Path 2"
                          d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.405-232.79,128.793"
                          transform="translate(35.564 80.269)"
                          fill="#a9aa96"
                        />
                      </g>
                    </svg>
                    </div>
                  </div>

                  <a
                    style={{
                      flexDirection: 'column',
                      background: '-webkit-linear-gradient(#d3eded, #deffe8)',
                      WebkitBackgroundClip: 'text',

                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {' '}
                    _openDojoji:{' '}
                  </a>
                  <a
                    style={{
                      color: 'rgba(117,54,65,1)',
                    }}
                  >
                    false
                  </a>
                  <div
                    style={{
                      background: '-webkit-linear-gradient(#d3eded, #deffe8)',
                      WebkitBackgroundClip: 'text',

                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <p>_normieFee:7%</p>
                    <p>_bellHolderFee:2%</p>
                    <p>_enlightenedFee:0%</p>
                  </div>
                </div>
              </div>
            </div>)}
          </div>

          <div
            className="container z-0 flex flex-row justify-right"
            style={bgprops2}
          >
            <div
              className="w-10/12 overflow-visible"
              style={{position:"relative", right: isMobile? "60%":"0", marginLeft:"10%", bottom: isMobile? "10%":"20",maxWidth:"80vh",fontFamily: 'chandler-42-regular', fontWeight: '800' }}
            >
              <ChatInterface />
            </div>
          </div>
        </Transition>

        {messageContext.appState === AppState.secret && (
          <div className="flex h-screen flex-row justify-end mr-4 ml-2">
            <div className="container mx-auto flex flex-row p-4">
              <div className="container z-0 flex flex-row justify-end items-center">
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute object-fit w-3/5 z-0"
                  poster="/scenes/secret_bakery.png"
                >
                  <source
                    src="/scenes/secret_bakery_scene.webm"
                    type="video/webm"
                  />
                </video>
              </div>
              <div
                className="container z-50 d-flex flex-row justify-center"
                style={bgprops2}
              >
                <div className="w-10/12"   >
                  <ChatInterface />
                </div>
              </div>
            </div>
          </div>
        )}
        {messageContext.appState == AppState.welcome && <Welcome></Welcome>}
        <AppFooter />
      </div>
    </div>
  )


}
