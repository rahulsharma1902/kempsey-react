import React from 'react';

const CustomerServicePolicy = () => {
    return (

        <div className="customer_policy p-130 light">
            <style>
                {`
                        .customer_policy_content .policy_info p:last-child {
                            margin-bottom: 1rem;
                        }
                    `}
                {`
                        .customer_policy_content .policy_info ul {
                            padding-left: 20px;
                             color:#727272;
                             margin-bottom:30px;
                        }
                    `}
                {`
                    .customer_policy_content h5 {
                      font-size: 28px;
                      line-height: 35px;
                         }
                    `}
            </style>
            <div className="container">
                <div className="customer_policy_content">
                    <h2 className='size46'>Returns Policy</h2>
                    <p>We understand that sometimes you may need to return a product you have purchased from a Kempsey Outdoors store, to assist you, we have set out below the Kempsey Outdoors Policy highlighting key points that you should know.</p>
                    <p>Our Returns Policy includes the rights you have under the Australian Consumer Law and other relevant laws</p>
                    <p>Your Rights under the Australian Consumer Law - Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and for compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure</p>
                    <p>Where a failure does not amount to a major failure, Kempsey Outdoors is entitled to choose between providing you with a repair, replacement or other suitable remedy.</p>
                    <p>Your rights under the Australian Consumer Law are not limited by a defined time. However, the Australian Consumer Law does recognise that the relevant time period can vary from product to product, depending on factors such as the nature of the product and the price. Kempsey Outdoors adopts the same approach. As you can appreciate, the type of remedy we can offer you may also vary depending on how long it takes you to return the product to us.
                        For any product return, please approach our sales/service counter in store or contact the store via phone/email. This includes products that carry a manufacturer's warranty. Any cost incurred by you in bringing the item to the store will be borne by you.</p>
                    <div className='policy_info'>
                        <h5>Please retain your receipt</h5>
                        <p>In order to obtain a refund, exchange or to repair a product purchased from Kempsey Outdoors, including those products which carry a manufacturer's warranty, you must have clear proof of purchase - typically, but not always, a receipt</p>
                        <p>If we cannot be satisfied that you purchased the product from us then, under the law, we are entitled to elect whether or not to accept your product for return.</p>
                    </div>
                    <div className='policy_info'>
                        <h5>Product Assessment</h5>
                        <p>Once proof of purchase has been established, if the product fault can safely and clearly be determined in-store, we will offer you either a refund, exchange, repair or Returns Card. The available remedy will depend on whether the fault amounts to a major failure. Where the product fault is difficult or potentially dangerous to determine in-store (for example firearms/ammunition testing), we will need to consult with the manufacturer or repair agent to determine the fault and resolution.</p>
                        <p>The manufacturer or their agent will determine whether a product has incurred a major or minor fault. Where a product has been sent to the manufacturer, the manufacturer will determine whether:</p>
                        <div className="policy_list">
                            <span>There is no fault found</span>
                            <ul>
                                <li>There is a minor fault which can be easily repaired within a reasonable time frame.</li>
                                <li>There is a major fault found and the customer is to be offered a replacement or a refund.</li>
                                <li>The product has been damaged or abused through misuse.</li>
                            </ul>
                        </div>
                        <p>Where there is no fault found, the product will be returned to the Store to be returned to the customer.</p>
                        <p>Where the manufacturer's assessment finds that there is no fault with the goods, or that the goods have been damaged due to misuse or abnormal use of the goods by you, we may require, at our option, that you compensate us for any fee imposed on us by the manufacturer in relation to this assessment</p>
                        <p>When we send your product to the manufacturer or their repair agent, we will ask them to assess the product and provide their assessment within a reasonable timeframe.</p>
                        <p>Unfortunately, Kempsey Outdoors cannot offer a refund or exchange where the product has sustained damage due to abnormal use, whether that has been identified by Kempsey Outdoors, the manufacturer or repair agent.</p>
                        <p>What should I do if I have changed my mind and want to return a product  Please choose carefully as Kempsey Outdoors does not normally accept return of goods where you have simply changed your mind</p>
                        <p>What happens if I have purchased a product online and need to return it?</p>
                        <p>Items can be returned by mail. This can be coordinated through our Store on 0 123 4567 890</p>
                        <p> You can also return or exchange most online purchases at the Kempsey Outdoors store. Simply approach the sales or service counter for assistance where you wish to make a claim, including when:</p>
                        <ul>
                            <li>Goods are damaged or faulty through no fault of your own</li>
                            <li>Goods are incorrectly ordered</li>
                            <li>Goods are supplied incorrectly</li>
                            <li>Goods vary from their description on the website (or any sample provided)</li>
                        </ul>
                        <p>Incorrectly ordered or supplied Online Goods can be returned but must be unopened. Please retain your invoice as proof of purchase.</p>
                        <p>Please note: When a refund is granted, we will refund the original purchase price via the previous method of payment indicated on the receipt</p>
                        <p>For further information on anything contained within this brochure please discuss with a Kempsey Outdoors Staff member</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerServicePolicy;
