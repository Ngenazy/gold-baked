import    React       from 'react';
import    ReactDOM    from 'react-dom';
import    { Link }    from 'react-router-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const InvItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Voucher Pin</th>
              <th>Redeem Bank</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{ props.voucherNum          }</td>
              <td>{ props.voucherPin          }</td>
              <td>{ props.bankToRedeem        }</td>
              <td>
              <button
                onClick={props.handlePledgeRequest}
                name={ props._id }>Activate User</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default InvItemView;
