import React from 'react';
import { ColumnType } from '../types';


interface ReusableTableProps {
  columns: ColumnType[];
  data: any
  columnWidths: number[];
  tableClassName?: string;
}

const ReusableTable= ({
  columns,
  data,
  columnWidths,
  tableClassName,
}:ReusableTableProps) => {

  
  return (
    <div className="overflow-x-auto">
      <table className={`table-auto border border-[#7e7e7e] rounded text-[#49454f] ${tableClassName} w-[50%]`}>
        <thead>
          <tr>
            {columns.map((column:ColumnType, columnIndex:number) => (
              <th
                key={columnIndex}
                className="w-fit pl-10 py-6  mb-6 text-left text-base font-bold text-gray-800 uppercase tracking-wider border-b border-[#7e7e7e]"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >
          {data && data.length >0 && data.map((row:any, rowIndex:number) => (
            <tr
              key={rowIndex}
              className="hover:bg-[#fde4ccec]"
            >
              {columns.map((column:ColumnType, columnIndex:number) => (
                <td
                  key={columnIndex}
                  className="py-4 pl-10 text-sm border-b border-[#7e7e7e] w-[5%]"
                >
                    {column.render ?
                    column.render(column,row):
                    
                    row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
