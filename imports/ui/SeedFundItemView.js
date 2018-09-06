import    React       from 'react';
import    ReactDOM    from 'react-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const SeedFundItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>Voucher#</th>
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
                onClick  ={props.confirmSeedFundProof }
                name     ={ props._id }>Confirm</button>
                <button
                  onClick={props.confirmSeedFundProof }
                  name   ={ props._id }>Reject</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default SeedFundItemView;
