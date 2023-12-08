import { useState } from 'react';
import '../index.scss';
import Tabs from '../../components/Tabs'

const UserActionTabs = () => {
  return (
    <div className="dashboard">
      <div>
         <Tabs />
      </div>
    </div>
  );
};

export default UserActionTabs;
