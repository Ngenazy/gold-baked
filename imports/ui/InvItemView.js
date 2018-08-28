import    React       from 'react';
import    ReactDOM    from 'react-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const InvItemView = ( props ) => (

      <div >
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Cellphone</th>
              <th>Seed Fund</th>
              <th>Interest</th>
              <th>Bank</th>
              <th>Acc#</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{ props.userName          }</td>
              <td>{ props.userCell          }</td>
              <td>R{ props.seedFund         }</td>
              <td>R{ props.seedFund * 0.3   }</td>
              <td>{ props.bank          }</td>
              <td>{ props.bankAcc       }</td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default InvItemView;
