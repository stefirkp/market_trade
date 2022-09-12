import { ReactNode, useMemo } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { useMarketContext } from '@context/MarketContext';

import { useGetTradePriceChanges } from '@lib/services/trade';
import { useGetSupportedCurrencies } from '@lib/services/wallet';
import { formatCurrency } from '@lib/utils/currency-format';

import { Table } from '@components/Table/Table';

import { remapTradeMarketList } from '../functions';

import style from './MarketTable.module.css';

const MarketTable: React.FC = () => {
  const { loading, currenciesData } = useMarketContext();
  const { isLoading: isLoadingPriceChanges, data: priceChangesData } = useGetTradePriceChanges();

  const dataMapped = useMemo(() => {
    if (!isLoadingPriceChanges && priceChangesData && !loading && currenciesData) {
      return remapTradeMarketList({
        priceChangesData,
        currenciesData,
      });
    }

    return [];
  }, [isLoadingPriceChanges, loading, priceChangesData, currenciesData]);

  const customValuePricePercentage = (value: string) => {
    const convertValue = !value ? '0.00' : value;
    const isUp = Number(convertValue) > 0;
    const classValue =
      Number(convertValue) === 0 ? '' : isUp ? style.percentage_up : style.percentage_down;

    return (
      <span className={cn(classValue)} data-va>
        {isUp && '+'}
        {convertValue}%
      </span>
    );
  };

  const tableFields: tableFieldType = [
    {
      key: 'blockchainName',
      label: 'Crypto',
      customValue: ({ blockchainName, symbol, logo }) => (
        <div className={style.block_chain_col}>
          <Image src={logo} height="32" width="32" alt={blockchainName} />
          <div className={style.block_chain_name_wrap}>
            <span className={style.block_chain_name}>{blockchainName}</span>
            <div className={style.symbol}>{symbol}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'latestPrice',
      label: (
        <span>
          Harga <span className={style.mobile_only}>(24 Jam)</span>
        </span>
      ),
      customClass: style.mobile_mode,
      customValue: ({ converterCurrency, latestPrice, day }) => {
        return (
          <>
            <div>{formatCurrency(converterCurrency, Number(latestPrice))}</div>
            <div className={style.mobile_only}>{customValuePricePercentage(day)}</div>
          </>
        );
      },
    },
    {
      key: 'day',
      label: '24 Jam',
      customClass: style.desktop_only,
      customValue: ({ day }) => customValuePricePercentage(day),
    },
    {
      key: 'week',
      label: '1 Mgg',
      customClass: style.desktop_only,
      customValue: ({ week }) => customValuePricePercentage(week),
    },
    {
      key: 'month',
      label: '1 Bln',
      customClass: style.desktop_only,
      customValue: ({ month }) => customValuePricePercentage(month),
    },
    {
      key: 'year',
      label: '1 Thn',
      customClass: style.desktop_only,
      customValue: ({ year }) => customValuePricePercentage(year),
    },
  ];

  if (!priceChangesData || !currenciesData) {
    return <div>Oups. Data tidak ditemukan</div>;
  }

  return <Table className="market-trade" tableFields={tableFields} data={dataMapped} />;
};

interface itemMap {
  [key: string]: string;
}

type tableFieldType = {
  key: string;
  label?: string | ReactNode;
  customClass?: string;
  customValue?: (Args: itemMap) => string | any;
}[];

export default MarketTable;
