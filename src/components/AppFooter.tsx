import React from 'react'
const isMobile = window.innerWidth <= 1000;
export const AppFooter: React.FC = () => {
  return (
    <>
      <footer className="relative flex flex-wrap px-2 py-3 bg-transparent mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
         {!isMobile &&( <span className="text-sm sm:text-center " style={{color:"rgba(255,255,255,0.8)"}}>
            <a
              href="kekek"
              className=""
            >
             Copyright © 2023 All Rights Reserved by DojojiBell Labs.
            </a>
          </span>)}
          <div className="flex mt-4 space-x-12 sm:justify-center sm:mt-0">
          <a href="https://PretzelDAO.com" className="">
              <svg
                className="w-6 h-6"
                fill="white"
                viewBox="0 0 510 510"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                strokeMiterlimit="2"
                strokeLinejoin="round"
                clipRule="evenodd"
              >
               <path
                  d="M256 0.5c141.11,0 255.5,114.39 255.5,255.5 0,141.11 -114.39,255.5 -255.5,255.5 -141.11,0 -255.5,-114.39 -255.5,-255.5 0,-141.11 114.39,-255.5 255.5,-255.5zm-75.05 159.07c53.26,0 96.43,43.18 96.43,96.43 0,53.25 -43.17,96.43 -96.43,96.43 -53.25,0 -96.42,-43.18 -96.42,-96.43 0,-53.25 43.17,-96.43 96.42,-96.43zm154.29 7.62c26.95,0 48.79,39.76 48.79,88.81 0,49.05 -21.84,88.81 -48.79,88.81 -26.95,0 -48.79,-39.76 -48.79,-88.81 0,-49.05 21.84,-88.81 48.79,-88.81zm75.24 7.61c9.38,0 16.99,36.35 16.99,81.2 0,44.85 -7.61,81.2 -16.99,81.2 -9.39,0 -17,-36.35 -17,-81.2 0,-44.85 7.61,-81.2 17,-81.2z"
                />
           
              </svg>
            </a>
          
            <a
              href="https://github.com/PretzelDAO/Bakery-Frontend"
              className=""
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/pretzeldao" className="">
              <svg
                className="w-8 h-6"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="7 0 60 60"
              >
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/> </svg>
            </a>
            <a href="https://twitter.com/DojojiEth" className="">
              <svg
                className="w-6 h-6"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.002 512.002"
              >
                <path d="M500.398 94.784a194.219 194.219 0 0 1-24.763 9.023 109.468 109.468 0 0 0 22.287-39.193 8.258 8.258 0 0 0-12.078-9.619c-17.945 10.643-37.305 18.292-57.605 22.764-20.449-19.981-48.222-31.353-76.934-31.353-60.606 0-109.913 49.306-109.913 109.91 0 4.773.302 9.52.9 14.201-75.206-6.603-145.124-43.568-193.136-102.463a8.259 8.259 0 0 0-13.537 1.061c-9.738 16.709-14.886 35.82-14.886 55.265 0 26.484 9.455 51.611 26.158 71.246a93.118 93.118 0 0 1-14.711-6.568 8.26 8.26 0 0 0-12.267 7.03c-.012.487-.012.974-.012 1.468 0 39.531 21.276 75.122 53.805 94.52a94.762 94.762 0 0 1-8.362-1.214 8.254 8.254 0 0 0-7.731 2.638 8.25 8.25 0 0 0-1.681 7.994c12.04 37.591 43.039 65.24 80.514 73.67-31.082 19.468-66.626 29.665-103.939 29.665-7.786 0-15.616-.457-23.279-1.364A8.258 8.258 0 0 0 3.8 418.617c47.935 30.735 103.361 46.98 160.284 46.98 111.903 0 181.907-52.769 220.926-97.037 48.657-55.199 76.562-128.261 76.562-200.451 0-3.016-.046-6.061-.139-9.097 19.197-14.463 35.724-31.967 49.173-52.085a8.256 8.256 0 0 0-.545-9.906 8.245 8.245 0 0 0-9.663-2.237z" />
              </svg>
            </a>
            <a
              href="https://www.notion.so/pretzeldao/PretzelDAO-b965318493954321ba7bf94b890f00c3"
              className=""
            >
              <svg
                className="w-6 h-6"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="12 0.19 487.619 510.941"
              >
                <path
                  d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934L358.186 335.22V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          
          </div>
        </div>
      </footer>
    </>
  )
}
