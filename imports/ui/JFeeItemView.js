import    React       from 'react';
import    ReactDOM    from 'react-dom';
import    { Link }    from 'react-router-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const JFeeItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>Voucher Number</th>
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
                name={ props.fee_id }>Activate User</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default JFeeItemView;
