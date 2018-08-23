import   React            from 'react';
import { PropTypes }      from 'prop-types';
//importing container components
import  PrivateHeader     from './PrivateHeader';
import  PledgeOffers      from './PledgeOffers';
import  InfoPanelView     from './InfoPanelView';

const IncomingOrdersPage = ({...props}) => (
    //assigning props for the UI
    //const { match, location, history } = this.props
      <div>
        <div>
          <PrivateHeader    { ...props } />
          <InfoPanelView/>
          <PledgeOffers     { ...props } />
        </div>
      </div>
)

export default IncomingOrdersPage;
