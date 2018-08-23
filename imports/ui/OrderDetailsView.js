import React from 'react';

const OrderDetailsView = ({ ...props }) => (
  <div >
    <ul>{props.orders}</ul>
    <button>Change Of Mind</button>
  </div>
)

export default OrderDetailsView;
