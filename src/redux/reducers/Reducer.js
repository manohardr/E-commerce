const INIT_STATE = {
  alldata: [],
  products: [],
  carts: [],
  errorMessage: [],
};


export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        alldata: action.payload,
      };

    case "SEARCH_PRODUCTS":
      const searchText =
        typeof action.payload === "string"
          ? action.payload.toLowerCase().trim()
          : "";
      if (searchText.length > 0) {
        const searchedProducts = state.alldata.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText) ||
            product.color.toLowerCase().includes(searchText) ||
            product.type.toLowerCase().includes(searchText)
        );
        return {
          ...state,
          products: searchedProducts,
        };
      } else {
        return {
          ...state,
          products: state.alldata
        };
      }

     // ... (previous code)

case "FILTER_PRODUCTS":
  const filters = action.payload;

  if (filters.all) {
    // If "all" category exists in filters, return the original data (allData)
    return {
      ...state,
      products: state.alldata,
    };
  }

  const filteredProducts = state.alldata.filter((product) => {
    let match = true;
    if (filters.gender && filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
      match = false;
    }
    if (filters.color && filters.color.length > 0 && !filters.color.includes(product.color)) {
      match = false;
    }
    if (filters.price && filters.price.length > 0) {
      // If price filter is set, check if product price is within any of the selected ranges
      const productPrice = parseInt(product.price);
      const priceRanges = filters.price.map(range => range.split("-").map(Number));
      const isInRange = priceRanges.some(([min, max]) => productPrice >= min && productPrice <= max);
      if (!isInRange) {
        match = false;
      }
    }
    if (filters.type && filters.type.length > 0 && !filters.type.includes(product.type)) {
      match = false;
    }
    return match;
  });

  return {
    ...state,
    products: filteredProducts,
  };

// ... (previous cases in cartreducer)

case "ADD_CART":
  const itemIndex = state.carts.findIndex(
    (item) => item.id === action.payload.id
  );

  if (itemIndex >= 0) {
    // Item already exists in the cart, check quantity
    const updatedCarts = [...state.carts];
    if (state.carts[itemIndex].quantity < action.payload.quantity) {
      updatedCarts[itemIndex].quantity += 1;
      return {
        ...state,
        carts: updatedCarts,
        
      };
    }
  } else {
    // Item doesn't exist in the cart, add it
    return {
      ...state,
      carts: [
        ...state.carts,
        { ...action.payload, quantity: 1, qnty: action.payload.quantity },
      ],
    };
  }

case "INCREMENT_CART":
  const itemIndex1 = state.carts.findIndex(
    (item) => item.id === action.payload.id
  );

  // Item already exists in the cart, check quantity
  if (state.carts[itemIndex1].qnty > action.payload.quantity) {
    state.carts[itemIndex1].quantity += 1;
    return {
      ...state,
      carts: [...state.carts],
    };
  }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

      case "RMV_ONE":
        const itemIndex2 = state.carts.findIndex(
          (item) => item.id === action.payload.id
        );
      
        if (itemIndex2 >= 0) {
          const updatedCarts = [...state.carts];
          if (state.carts[itemIndex2].quantity > 1) {
            updatedCarts[itemIndex2].quantity -= 1;
            return {
              ...state,
              carts: updatedCarts,
            };
          } else {
            const data = state.carts.filter((el) => el.id !== action.payload.id);
            return {
              ...state,
              carts: data,
            };
          }
        }


        break;

    case "ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: [...action.payload],
      };

    default:
      return state;
  }
};
