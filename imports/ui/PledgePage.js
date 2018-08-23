import   React            from 'react';
import { PropTypes }      from 'prop-types';
//importing container components
import  OrdersMenu        from './OrdersMenu';
import  InfoPanelView     from './InfoPanelView';
import   PrivateHeader    from './PrivateHeader';

const PledgePage = ({ ...props }) => (
    //assigning props for the UI
    //const { match, location, history } = this.props
      <div>
        <div>
          <PrivateHeader    { ...props } />
          <InfoPanelView/>
          <OrdersMenu       { ...props } />
        </div>
      </div>
)

export default PledgePage;
