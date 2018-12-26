import React from 'react';

  const DiscountProduct = (props) => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
                <td>
                    <span>
                        List Price:
                    </span>
                </td>
                <td>
                    <span>
                        {props.product.list_price}
                    </span>
                </td>
            </tr>
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
            <tr>
                <td>
                    <span>
                        You Save:
                    </span>
                </td>
                <td>
                    <span>
                        {props.product.discount}
                    </span>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  export default DiscountProduct;