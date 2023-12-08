import { useState } from 'react';
import '../index.scss';
import Tabs from '../../components/PlaceOrderTabs'

const PlaceOrderTabs = () => {
  return (
    <div className="dashboard">
      <div>
         <Tabs />
      </div>
    </div>
  );
};

export default PlaceOrderTabs;
