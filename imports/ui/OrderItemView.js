import    React       from 'react';
import    ReactDOM    from 'react-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const OrderItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Pledge</th>
              <th>Returns</th>
              <th>Pay</th>
              <th>Get Paid</th>
              <th>Recommit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{ props.orderType  }</td>
              <td>{ props.pledge     }</td>
              <td>{ props.potential  }</td>
              <td>{ props.pay        }</td>
              <td>{ props.payout     }</td>
              <td>{ props.recommit   }</td>
              <td>
              { !props.isLocked ?<button >Locked</button>
                                     :<button
                                              onClick={props.handlePledgeRequest}
                                              name={ props.orderType }>Pledge</button>
              }
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default OrderItemView;
