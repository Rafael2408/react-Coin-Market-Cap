import React, { useState, useEffect } from 'react';
import useAxios from '../Hooks/useAxios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import bnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg';

function BNBDetails() {
  const { data, loading, error } = useAxios('http://localhost:4000/api/data');
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    setAnimation('animate__animated animate__zoomIn');
    const timer = setTimeout(() => {
      setAnimation('');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace(/,/g, ' ');
  }

  const coinName = "BNB";
  const bnbData = data.data.find(coin => coin.name === coinName);
  const quote = bnbData.quote.USD;

  const percentChanges = [
    { name: '90 días', value: quote.percent_change_90d / 100 },
    { name: '60 días', value: quote.percent_change_60d / 100 },
    { name: '30 días', value: quote.percent_change_30d / 100 },
    { name: '7 días', value: quote.percent_change_7d / 100 },
    { name: '24 horas', value: quote.percent_change_24h / 100 },
    { name: 'Última: hora', value: quote.percent_change_1h / 100 },
  ];

  const percentChangesPos = percentChanges.map(item => ({ ...item, value: item.value > 0 ? item.value : 0 }));
  const percentChangesNeg = percentChanges.map(item => ({ ...item, value: item.value < 0 ? item.value : 0 }));

  return (
    <div className={`p-2 ${animation}`}>
      <div className='title'>
        <h2 className='text-center'>Detalles de BNB <img src={bnbIcon} alt="BNB Icon" width={35} /></h2>
        <h6 style={{ color: 'black' }}>{new Date(bnbData.last_updated).toLocaleString()}</h6>
      </div>
      <h3>Precio actual:  <b>{formatNumber(quote.price.toFixed(2))}</b> $</h3>
      <h5>Domonio en el mercado: <b>{quote.market_cap_dominance.toFixed(2)} %</b></h5>
      <div className='d-flex flex-row align-items-center'>
        <h6 className='text-center'>Volumen de operaciones en las últimas 24 horas:</h6>
        <h5 className='volume_24h'>
          <b>{formatNumber(quote.volume_24h.toFixed(2))} $</b>
        </h5>
      </div>

      <div>
        <h3 className='text-center titlePorcentajes'>Cambios porcentuales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={percentChanges}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="black" />
            <XAxis dataKey="name" stroke="black" />
            <YAxis stroke="black" tickFormatter={(tick) => `${(tick * 100).toFixed(2)}%`} domain={['dataMin', 'dataMax']} />
            <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
            <Legend />
            <Area type="linear" dataKey="value" name='Cambio Porcentual' stroke="#000000" fill="#000000"
              fillOpacity={0.5}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BNBDetails;
