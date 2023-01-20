// import React from 'react';
// import Accordian from './accordian';

import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Profile from './Profile'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}

export default App;

// function Faq() {
//     return (
//         <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '100vh', position: 'relative', top: '0', overflow: 'hidden' }}>
//             <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
//             <Accordian />
//           <div style={{paddingTop:'30px'}}></div>
//           <Accordian />
//           <div style={{paddingTop:'30px'}}></div>
//           <Accordian />
//           <div style={{paddingTop:'30px'}}></div>
//           <Accordian />
//           <div style={{paddingTop:'30px'}}></div>
//           <Accordian />
//             </div>

//         </div>
//     )
// };

// export default Faq;