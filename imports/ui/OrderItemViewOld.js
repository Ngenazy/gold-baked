import    React       from 'react';
//import { Link } from 'react-router-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const OrderItemView = ({...props}) => (
//console.log(props.planLocks)
    //assigning props for the UI
    //const { match, location, history } = this.props
      <div>
        <ul>
          <FlipMove mantaincontainerheight={true.toString()}>
            { props.renderPlanOptions }
          </FlipMove>

        </ul>
      </div>
)

export default OrderItemView;
