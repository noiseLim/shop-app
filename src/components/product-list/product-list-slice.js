import {createSlice} from '@reduxjs/toolkit';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: [],
        currentPage: 1,
        limitPage: 15,
        totalCount: [],
        loading: true,
        error: false,
        items: [],
        totalPrice: 0
    },
    reducers: {
        productLoaded: (state, action) => {
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        },
        productRequested: (state) => {
            return {
                ...state,
                products: state.products,
                loading: true
            };
        },
        productError: (state) => {
            return {
                ...state,
                products: state.products,
                error: true
            };
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload,
                error: false
            };
        },
        getTotalCount: (state, action) => {
            return {
                ...state,
                totalCount: action.payload,
                loading: false
            };
        },
        addedToCart: (state, action) => {
            const id = action.payload;
            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice
                };
            }

            const item = state.products.find(item => item.id === id);
            const newItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                url: item.url,
                info: item.info,
                qtty: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };
        },
        addedCountToMinus: (state, action) => {
            const idCountToMinus = action.payload;
            const itemCountToMinus = state.items.find(item => item.id === idCountToMinus);

            if(itemCountToMinus.qtty > 1) {
                return {
                    ...state,
                    items: state.items.map((item) => item.id === idCountToMinus
                    ? {...item, qtty: itemCountToMinus.qtty - 1}
                    : item),
                    totalPrice: state.totalPrice - itemCountToMinus['price']
                }
            }            
        },
        addedCountToPlus: (state, action) => {
            const idCountToPlus = action.payload;
            const itemCountToPlus = state.items.find(item => item.id === idCountToPlus);

            return {
                ...state,
                items: state.items.map((item) => item.id === idCountToPlus
                ? {...item, qtty: itemCountToPlus.qtty + 1}
                : item),
                totalPrice: state.totalPrice + itemCountToPlus['price']
            }
        }
    }
})

export const {
        productLoaded, 
        productRequested, 
        productError, 
        setCurrentPage, 
        getTotalCount, 
        addedToCart,
        addedCountToMinus,
        addedCountToPlus
    } = productListSlice.actions

export default productListSlice.reducer