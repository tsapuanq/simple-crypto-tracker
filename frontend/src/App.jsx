import React, { useEffect, useState } from 'react';
import { Menu ,Spin} from 'antd';
import axios, { Axios } from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard';


const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)


  const fetchCurrencies = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/cryptocurrencies`).then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        {
          key: 'g1',
          label: (
            <span className="text-gray-500 font-semibold text-sm uppercase tracking-wide px-2">
              Список криптовалют
            </span>
          ),
          type: 'group',
          children: currenciesResponse.map(currency => ({
            key: currency.id,
            label: currency.name,
          })),
        },
      ]
      setCurrencies(menuItems)
    })
  }

  const fetchCurrency = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/cryptocurrencies/${currencyId}`).then(r => {
      setCurrencyData(r.data)
    })
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency();
  }, [currencyId]);

  const onClick = e => {
    setCurrencyId(e.key)
  };


  return (
    <div className="flex">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className='mx-auto my-auto'>
        {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size="large" />}
      </div>
    </div>
  );
};
export default App;