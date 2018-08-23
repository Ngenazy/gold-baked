import   React            from 'react';
import { PropTypes }      from 'prop-types';
//importing container components
import   PrivateHeader    from './PrivateHeader';
import   OrderDetails     from './OrderDetails';
//import   AddLink         from './AddLink';
import   InfoPanelView    from './InfoPanelView';

const OrderDetailsPage = ({...props}) => (
    //assigning props for the UI
    //const { match, location, history } = this.props
      <div>
        <PrivateHeader    { ...props } />
        <div className="page-content">
          <InfoPanelView/>
          <OrderDetails   { ...props } />
        </div>


      </div>
)

export default OrderDetailsPage;
