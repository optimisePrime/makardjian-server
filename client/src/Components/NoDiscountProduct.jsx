import React from 'react';

const NoDiscountProduct = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <span>
                  Price:
              </span>
            </td>
            <td>
              <span>
                  {props.product.price}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NoDiscountProduct;