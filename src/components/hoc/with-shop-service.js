import React from 'react';
import ShopServiceContext from '../shop-service-context';

const WithShopService = () => (Wrapped) => {
    return (props) => {
        return (
            <ShopServiceContext.Consumer>
                {
                    (ShopService) => {
                        return <Wrapped {...props} ShopService={ShopService}/>
                    }
                }
            </ShopServiceContext.Consumer>
        )
    }
};

export default WithShopService;