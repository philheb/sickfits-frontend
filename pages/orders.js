import React from 'react';
import Orders from '../components/Orders';
import PleaseSignIn from '../components/PleaseSignIn';

const OrderPage = () => {
  return (
    <div>
      <PleaseSignIn>
        <Orders />
      </PleaseSignIn>
    </div>
  );
};

export default OrderPage;
