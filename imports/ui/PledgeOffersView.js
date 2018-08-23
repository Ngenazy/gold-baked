import React from 'react';

const PledgeOffersView = ({ ...props }) => (
  <div >
    <ul> { props.renderOffers }</ul>
  </div>
)

export default PledgeOffersView;
