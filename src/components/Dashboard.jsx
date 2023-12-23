import React, { useState } from 'react';
import BitcoinDetails from './BitcoinDetails';
import BNBDetails from './BNBDetails';
import EthereumDetails from './EthereumDetails';
import SolanaDetails from './SolanaDetails';
import TetherUSDDetails from './TetherUSDtDetails';

import '../styles/Dashboard.css';

function Dashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState(null);

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
      default:
    }
  };

  return (
    <div className="all">
      <div className="sidebar">
        <h3 className='text-center my-2'>Criptomonedas</h3>
        {['Bitcoin', 'Ethereum', 'BNB', 'Solana', 'Tether USDt'].map(crypto => (
          <button
            key={crypto}
            className={`btn btn-outline-primary my-1 w-100 ${selectedCrypto === crypto ? 'btn-selected' : ''}`}
            onClick={() => setSelectedCrypto(crypto)}
          >
            {crypto}
          </button>
        ))}

      </div>
      <div className="flex-grow-1 p-2">
        {renderCryptoDetails()}
      </div>
    </div>
  );
}

export default Dashboard;
