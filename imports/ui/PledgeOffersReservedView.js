import React from 'react';

const PledgeOffersReservedView = ({ ...props }) => (
  <div >
    <h3> Reserved Offers</h3>
    <ul> { props.donorId }</ul>
  </div>
)

export default PledgeOffersReservedView;
