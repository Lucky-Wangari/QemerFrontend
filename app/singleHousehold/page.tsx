import React from 'react';
import ReusableTable from '../ atoms/TableAtom';

const SingleHousehold = () => {
  const columns = [{title:'Title',key:'title'},
   {title:'Information', key:'information'}];
  const data = [
    { title: 'Name', information: 'Sarah Kamau'},
    { title: 'ID number', information: '47672'},
    { title: 'Location', information: 'Kayole1'},
    { title: 'Number of Children', information: '1'},
    { title: 'Name of Children', information:'Mila Kamau'},
    { title: 'Elgibility', information: 'Yes'},

  ];

  const columnWidths = [70, 70]; 
  const tableClassName = 'w-4/5 ml-48'; 

  return (
    <div>
  <h1 className="page-heading ml-20 mb-6 mt-6 text-orange-500" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginLeft: '200px' }}>
  Sarahs Household
</h1>      <ReusableTable columns={columns} data={data} columnWidths={columnWidths} tableClassName={tableClassName} />
    </div>
  );
};
export default SingleHousehold;
