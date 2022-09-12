import { useState } from 'react';
import { Input } from '@components/Input';

const TopSearchBar: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');

  return (
    <div className="topbar flex justify-between flex-col sm:flex-row mb-4 px-6 sm:p-0">
      <h1 className="text-2xl font-bold">Harga Crypto dalam Rupiah Hari ini</h1>

      <div className="search-bar my-[20px] sm:my-0 sm:mb-[10px]">
        <Input
          name="search"
          placeholder="Cari aset di Pintu"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          data-testid="search-input"
        />
      </div>
    </div>
  );
};

export default TopSearchBar;
