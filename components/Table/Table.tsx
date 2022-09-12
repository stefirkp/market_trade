import type { ReactNode } from 'react';
import cn from 'classnames';

import style from './Table.module.css';

interface itemMap {
  [key: string]: string;
}

type tableFieldType = {
  key: string;
  label?: string | ReactNode;
  customClass?: string;
  customValue?: (Args: itemMap) => string | any;
};

type TableProps = {
  tableFields: tableFieldType[];
  data: Array<any>;
  className?: string;
};

export const Table: React.FC<TableProps> = ({ tableFields, data, className }) => {
  return (
    <table className={cn(className, 'w-full border')}>
      <thead className="border-b">
        <tr>
          {tableFields.map(({ label = '', customClass }, idx) => (
            <th scope="col" className={cn(style.thead_col, customClass)} key={idx}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: itemMap, itemIdx) => (
          <tr className="border-b" key={itemIdx}>
            {tableFields.map(({ key, customClass, customValue }, idx) => (
              <td className={cn(style.tbody_col, customClass)} key={idx} data-testid="tbody-col">
                {customValue ? customValue(item) : item[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
