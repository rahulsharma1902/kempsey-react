import React from 'react';

const CheckDetail = () => {

// export default function CheckDetail () {


    return (
        <div className='summary-bill'>
            <div className='summary-bill-box'>
                <h2 className='size46'>Check Details And Confirm</h2>
                <div className="summary-bill-detail">
                    <table>
                        <tbody>
                            <tr>
                                <td>4 August 2024</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>HONDA</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Standard Plus Service</td>
                                <td>$169</td>
                            </tr>
                            <tr>
                                <td>Standard Service</td>
                                <td>$119</td>
                            </tr>
                            <tr>
                                <td>Tune Up</td>
                                <td>$79</td>
                            </tr>
                            <tr className='total-price'>
                                <td>Total</td>
                                <td>$ 367.00</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <div className="cupon-btn">
                        <form method="post" class="d-flx">
                            <input type="text" name="coupon" id="coupon" placeholder="Add coupon or gift code" class="form_control" />
                            <button type="submit" class="cuppn-btn cta">Apply</button>
                        </form>
                    </div>
                    <div className="summary-bill-deatial">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default CheckDetail;