import    React       from 'react';
import    ReactDOM    from 'react-dom';
import {  PropTypes } from 'prop-types';
import    FlipMove    from 'react-flip-move';

const PackageItemView = ( props ) => (

      <div className="page-content" >
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Seed Fund</th>
              <th>Weekly Payout</th>
              <th>Total/Month</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{ props.package             }</td>
              <td>R { props.seedFund          }</td>
              <td>R { props.weeklyPayout      }</td>
              <td>R { props.monthlyTotal      }</td>
              <td>
              <button
                className="button"
                onClick={props.createInvestment}
                name={ props.package }>Invest</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )

export default PackageItemView;
