import cn from 'classnames';
import style from './Input.module.css';

type InputProps = {
  name: string;
  placeholder: string;
  icon?: any;
  value?: string;
  onChange?: (args: any) => void;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  icon,
  value,
  onChange,
  className,
  ...otherProps
}) => {
  return (
    <label className={cn(style.input_wrap, icon && style.with_icon, className)}>
      <span className="sr-only">{name}</span>
      {icon && (
        <span className={style.icon} data-testid="icon-input">
          {icon}
        </span>
      )}
      <input
        className={style.input}
        placeholder={placeholder}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </label>
  );
};
