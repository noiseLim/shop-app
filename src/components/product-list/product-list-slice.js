import { createSlice } from '@reduxjs/toolkit';

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
    totalPrice: 0,
    totalQuantityProducts: 0,
    warrantiesPrice: 0,
  },
  reducers: {
    productLoaded: (state, action) => {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    },
    productRequested: (state) => {
      return {
        ...state,
        products: state.products,
        loading: true,
      };
    },
    productError: (state) => {
      return {
        ...state,
        products: state.products,
        error: true,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
        error: false,
      };
    },
    getTotalCount: (state, action) => {
      return {
        ...state,
        totalCount: action.payload,
        loading: false,
      };
    },
    addedToCart: (state, action) => {
      const id = action.payload;
      const itemInd = state.items.findIndex((item) => item.id === id);
      if (itemInd >= 0) {
        const itemInState = state.items.find((item) => item.id === id);
        const newItem = {
          ...itemInState,
          qtty: itemInState.qtty,
        };
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemInd),
            newItem,
            ...state.items.slice(itemInd + 1),
          ],
          totalPrice: state.totalPrice,
          totalQuantityProducts: state.totalQuantityProducts,
        };
      }

      const item = state.products.find((item) => item.id === id);
      const newItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        url: item.url,
        info: item.info,
        qtty: 1,
      };
      const price = (state.totalPrice + newItem.price).toFixed(2);
      return {
        ...state,
        items: [...state.items, newItem],
        totalPrice: Math.round(price * 100) / 100,
        // totalPrice: price,
        totalQuantityProducts: state.totalQuantityProducts + newItem.qtty,
      };
    },
    removeFromCart: (state, action) => {
      const idRemoveFromCart = action.payload;
      const itemRemoveFromCart = state.items.findIndex(
        (item) => item.id === idRemoveFromCart
      );
      const price = (
        state.items[itemRemoveFromCart]['price'] *
        state.items[itemRemoveFromCart]['qtty']
      ).toFixed(2);
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemRemoveFromCart),
          ...state.items.slice(itemRemoveFromCart + 1),
        ],
        totalPrice: Math.round((state.totalPrice - price) * 100) / 100,
        totalQuantityProducts:
          state.totalQuantityProducts - state.items[itemRemoveFromCart]['qtty'],
      };
    },
    cleanCartAfterOrder: (state) => {
      return {
        ...state,
        items: [],
        totalPrice: 0,
        totalQuantityProducts: 0,
      };
    },
    addedCountToMinus: (state, action) => {
      const idCountToMinus = action.payload;
      const itemCountToMinus = state.items.find(
        (item) => item.id === idCountToMinus
      );
      const price = (state.totalPrice - itemCountToMinus['price']).toFixed(2);

      if (itemCountToMinus.qtty > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === idCountToMinus
              ? { ...item, qtty: itemCountToMinus.qtty - 1 }
              : item
          ),
          totalPrice: Math.round(price * 100) / 100,
          totalQuantityProducts: state.totalQuantityProducts - 1,
        };
      }
    },
    addedCountToPlus: (state, action) => {
      const idCountToPlus = action.payload;
      const itemCountToPlus = state.items.find(
        (item) => item.id === idCountToPlus
      );
      const price = (state.totalPrice + itemCountToPlus['price']).toFixed(2);

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === idCountToPlus
            ? { ...item, qtty: itemCountToPlus.qtty + 1 }
            : item
        ),
        totalPrice: Math.round(price * 100) / 100,
        totalQuantityProducts: state.totalQuantityProducts + 1,
      };
    },
    // addedAdditionalWarrantiesNo: (state, action) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   const warrantiesPriceItem = +item.price.toFixed(2);

    //   return {
    //     ...state,
    //     items: state.items.map((item) =>
    //       item.id === id ? { ...item, warrantiesPrice: 0 } : item
    //     ),
    //     totalPrice: Math.round(warrantiesPriceItem * 100) / 100,
    //   };
    // },
    // addedAdditionalWarranties12Month: (state, action) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   const warrantiesPriceItem = +(item.price + item.price * 0.05).toFixed(2);

    //   return {
    //     ...state,
    //     items: state.items.map((item) =>
    //       item.id === id
    //         ? { ...item, warrantiesPrice: warrantiesPriceItem }
    //         : item
    //     ),
    //     totalPrice: Math.round(warrantiesPriceItem * 100) / 100,
    //   };
    // },
    // addedAdditionalWarranties24Month: (state, action) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   const warrantiesPriceItem = +(item.price + item.price * 0.1).toFixed(2);

    //   console.log(+(item.price * 0.1).toFixed(2));
    //   console.log(warrantiesPriceItem);

    //   return {
    //     ...state,
    //     items: state.items.map((item) =>
    //       item.id === id
    //         ? { ...item, warrantiesPrice: warrantiesPriceItem }
    //         : item
    //     ),
    //     totalPrice: Math.round(warrantiesPriceItem * 100) / 100,
    //   };
    // },
  },
});

export const {
  productLoaded,
  productRequested,
  productError,
  setCurrentPage,
  getTotalCount,
  addedToCart,
  addedCountToMinus,
  addedCountToPlus,
  removeFromCart,
  cleanCartAfterOrder,
  addedAdditionalWarrantiesNo,
  addedAdditionalWarranties12Month,
  addedAdditionalWarranties24Month,
} = productListSlice.actions;

export default productListSlice.reducer;
