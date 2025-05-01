import { Card } from 'antd';

function CryptocurrencyCard({ currency }) {
  if (!currency) return <p className="text-center text-gray-500">Загрузка данных...</p>;

  const price = Math.round(currency.quote.USD.price);
  const change_24h = Math.round(currency.quote.USD.percent_change_24h * 1000) / 1000;
  const change_30d = Math.round(currency.quote.USD.percent_change_30d * 1000) / 1000;
  const market_cap = currency.quote.USD.market_cap;

  function formatMarketCap(value) {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(2) + 'K';
    return value.toString();
  }

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
              alt={currency.name}
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold">{currency.name}</span>
          </div>
        }
        style={{ width: 400 }}
      >
        <p className="text-base text-gray-600 mb-2">
          <span className="font-medium">Текущая цена:</span>{' '}
          <span className="text-lg font-bold text-black">{price.toLocaleString()} $</span>
        </p>

        <p className="text-base text-gray-600 mb-2">
          <span className="font-medium">Рыночная капитализация:</span>{' '}
          <span className="text-lg font-bold text-black">
            {formatMarketCap(market_cap)} $
          </span>
        </p>
        
        <p className="text-base text-gray-600 mb-2">
          <span className="font-medium">Объём торгов (24ч):</span>{' '}
          <span className="text-lg font-bold text-black">
            {formatMarketCap(currency.quote.USD.volume_24h)} $
          </span>
        </p>

        <p className="text-base mb-2">
          <span className="text-gray-600 font-medium">Изменение цены за 24 часа:</span>{' '}
          <span
            className={`font-bold ${
              change_24h > 0
                ? 'text-green-600'
                : change_24h < 0
                ? 'text-red-600'
                : 'text-gray-500'
            }`}
          >
            {change_24h}%
          </span>
        </p>

        <p className="text-base mb-2">
          <span className="text-gray-600 font-medium">Изменение цены за 30 дней:</span>{' '}
          <span
            className={`font-bold ${
              change_30d > 0
                ? 'text-green-600'
                : change_30d < 0
                ? 'text-red-600'
                : 'text-gray-500'
            }`}
          >
            {change_30d}%
          </span>
        </p>
      </Card>
    </div>
  );
}

export default CryptocurrencyCard;
