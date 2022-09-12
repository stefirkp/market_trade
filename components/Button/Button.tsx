import Image from 'next/image';
import cn from 'classnames';

import style from './Button.module.css';
import type { ReactNode } from 'react';

type ButtonType = {
  children?: string | ReactNode;
  flat?: boolean;
  Element?: keyof JSX.IntrinsicElements;
  icon: any;
  className: string;
  onClick?: () => void;
  primary?: boolean;
};

export const Button: React.FC<ButtonType> = ({
  children,
  flat,
  Element = 'button',
  icon,
  className,
  primary = false,
  ...otherProps
}) => {
  return (
    <Element className={cn(style.btn, primary && style.primary, className)} {...otherProps}>
      {icon && <Image src={icon} alt="icon-btn" className={style.icon} />}
      <span className="text-sm sm:text-base">{children}</span>
    </Element>
  );
};
