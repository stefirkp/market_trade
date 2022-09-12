import type { NextPage } from 'next';
import TopSearchBar from './components/TopSearchBar';
import TagsNavigation from './components/TagsNavigation';
import MarketTable from './components/MarketTable';

import { MarketProvider } from '@context/MarketContext';

const MarketPage: NextPage = () => {
  return (
    <MarketProvider>
      <div className="market-page">
        <TopSearchBar />
        <TagsNavigation />
        <MarketTable />
      </div>
    </MarketProvider>
  );
};

export default MarketPage;
