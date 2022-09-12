import cn from 'classnames';
import { Button } from '@components/Button';

import NewIcon from '@assets/tags-icon/new-icon.svg';
import DefiIcon from '@assets/tags-icon/defi.svg';
import NftIcon from '@assets/tags-icon/nft.svg';
import CexIcon from '@assets/tags-icon/cex.svg';
import DexIcon from '@assets/tags-icon/dex.svg';
import LayerIcon from '@assets/tags-icon/layer-1.svg';
import InfraIcon from '@assets/tags-icon/infra.svg';
import LendingIcon from '@assets/tags-icon/lending.svg';
import EcoIcon from '@assets/tags-icon/ecosystem.svg';

import style from './TagsNavigation.module.css';

const TagsNavigation: React.FC = () => {
  const tagsList = [
    { label: 'Terbaru', icon: NewIcon },
    { label: 'Defi', icon: DefiIcon },
    { label: 'NFT/Gaming', icon: NftIcon },
    { label: 'CEX', icon: CexIcon },
    { label: 'DEX', icon: DexIcon },
    { label: 'Layer-1', icon: LayerIcon },
    { label: 'Infrastructure', icon: InfraIcon },
    { label: 'Lending', icon: LendingIcon },
    { label: 'Layer-2', icon: LayerIcon },
    {
      label: 'Ekosistem Stablecoin',
      icon: EcoIcon,
    },
  ];

  return (
    <div className={cn(style.tags_navigation)}>
      {tagsList.map(({ label, icon }, idx) => (
        <Button icon={icon} key={idx} className={style.btn_tag} data-testid="btn-tag">
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TagsNavigation;
