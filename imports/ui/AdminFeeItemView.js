import    React       from 'react';
import    ReactDOM    from 'react-dom';
import    { Link }    from 'react-router-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const AdminFeeItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>Voucher Number</th>
              <th>Voucher Pin</th>
              <th>Redeem Bank</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{ props.voucherNum          }</td>
              <td>{ props.voucherPin          }</td>
              <td>{ props.bankToRedeem        }</td>
              <td>{ props.renderTimeLapsed    }</td>
              <td>
              <button
                onClick={props.activateUser}
                name={ props._id }>Activate User
              </button>

              <button
                onClick={props.rejectAdminProof}
                name={ props._id }>Reject Proof
              </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default AdminFeeItemView;
