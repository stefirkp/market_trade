import Image from 'next/image';
import cn from 'classnames';

import style from './Button.module.css';
import type { ReactNode } from 'react';

type ButtonType = {
  children?: string | ReactNode;
  flat?: boolean;
  Element?: keyof JSX.IntrinsicElements;
  icon?: string;
  className: string;
  onClick?: () => void;
  primary?: boolean;
  iconProps?: object;
};

export const Button: React.FC<ButtonType> = ({
  children,
  flat,
  Element = 'button',
  icon,
  className,
  primary = false,
  onClick,
  iconProps = {},
  ...otherProps
}) => {
  return (
    <Element
      className={cn(style.btn, primary && style.primary, className)}
      onClick={onClick}
      {...otherProps}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon-btn"
          className={style.icon}
          width="20px"
          height="20px"
          {...iconProps}
        />
      )}
      <span className="text-sm sm:text-base ml-[8px]">{children}</span>
    </Element>
  );
};
