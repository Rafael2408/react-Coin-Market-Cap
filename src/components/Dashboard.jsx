import React, { useState } from 'react';
import BitcoinDetails from './BitcoinDetails';
import BNBDetails from './BNBDetails';
import EthereumDetails from './EthereumDetails';
import SolanaDetails from './SolanaDetails';
import TetherUSDDetails from './TetherUSDtDetails';
import MarketDomain from './MarketDomain';

import genericIcon from 'cryptocurrency-icons/svg/color/generic.svg';
import bitcoinIcon from 'cryptocurrency-icons/svg/color/btc.svg';
import bnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg';
import ethIcon from 'cryptocurrency-icons/svg/color/eth.svg';
import solIcon from 'cryptocurrency-icons/svg/color/sol.svg'; 
import usdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg'; 

import '../styles/Dashboard.css';

function Dashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState('Market Domain');

  const renderCryptoDetails = () => {
    switch (selectedCrypto) {
      case 'Bitcoin':
        return <BitcoinDetails />;
      case 'BNB':
        return <BNBDetails />;
      case 'Ethereum':
        return <EthereumDetails />;
      case 'Solana':
        return <SolanaDetails />;
      case 'Tether USDt':
        return <TetherUSDDetails />;
      case 'Market Domain':
        return <MarketDomain />;
      default:
    }
  };

  return (
    <div className="all">
      <div className="sidebar">
        <h3 className='text-center my-2'>Criptomonedas</h3>
        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'Market Domain' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('Market Domain')}
        >
          <img src={genericIcon} alt="Generic Icon" className='imgIcon'/>
          Dominio en el Mercado
        </button>

        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'Bitcoin' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('Bitcoin')}
        >
          <img src={bitcoinIcon} alt="Bitcoin Icon" className='imgIcon'/>
          Bitcoin
        </button>

        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'Ethereum' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('Ethereum')}
        >
          <img src={ethIcon} alt="ETH Icon" className='imgIcon'/>
          Ethereum
        </button>

        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'BNB' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('BNB')}
        >
          <img src={bnbIcon} alt="BNB Icon" className='imgIcon'/>
          BNB
        </button>

        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'Solana' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('Solana')}
        >
          <img src={solIcon} alt="SOL Icon" className='imgIcon'/>
          Solana
        </button>

        <button
          className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === 'Tether USDt' ? 'btn-selected' : ''}`}
          onClick={() => setSelectedCrypto('Tether USDt')}
        >
          <img src={usdtIcon} alt="USDT Icon" className='imgIcon'/>
          Tether USDt
        </button>
      </div>
      <div className="flex-grow-1 p-2">
        {renderCryptoDetails()}
      </div>
    </div>
  );
}

export default Dashboard;
