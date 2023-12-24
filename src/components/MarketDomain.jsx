import React, { useState, useEffect } from 'react';
import useAxios from '../Hooks/useAxios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

function MarketDomain() {
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

    const COLORS = {
        bitcoin: '#fd9417',
        ethereum: '#627eea',
        bnb: '#f3ba2f',
        solana: '#66f9a1',
        "tether usdt": '#26a17b',
        other: '#f598c4'
    };

    let marketDominanceData = data.data.map(coin => ({
        name: coin.name,
        value: coin.quote.USD.market_cap_dominance,
    }));

    // Calculate the sum of market dominance of the five main cryptocurrencies
    let sumDominance = marketDominanceData.reduce((sum, coin) => sum + coin.value, 0);

    // Calculate the market dominance of "Other cryptocurrencies"
    let otherDominance = 100 - sumDominance;

    // Add "Other cryptocurrencies" to marketDominanceData
    marketDominanceData.push({
        name: 'Other cryptocurrencies',
        value: otherDominance,
    });

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = outerRadius + 30; // To put label outside
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    return (
        <div>
            <h2 className='text-center'>Dominio de Mercado de Criptomonedas</h2>
            <ResponsiveContainer width="100%" height={500} className={animation}>
                <PieChart>
                    <Pie
                        data={marketDominanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={180}
                        dataKey="value"
                    >
                        {marketDominanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || COLORS.other} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MarketDomain;
