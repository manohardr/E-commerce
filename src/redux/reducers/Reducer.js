const INIT_STATE = {
  allData: [],
  products: null,
  carts: [],
  errorMessage: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allData: action.payload,
      };

    case "SEARCH_PRODUCTS":
      const searchText =
        typeof action.payload === "string" // typeof action.payload should be string
          ? action.payload.toLowerCase().trim()
          : "";
      if (searchText.length > 0) {
        const searchedProducts = state.allData.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText) ||
            product.color.toLowerCase().includes(searchText) ||
            product.type.toLowerCase().includes(searchText)
        ); // Converting every word into small letter and checking that word is included in product or not
        return {
          ...state,
          products: searchedProducts,
        };
      } else {
        return {
          ...state,
          products: state.allData,
        };
      }

    case "FILTER_PRODUCTS":
      const filters = action.payload;
      if (filters.all) {
        // If "all" category is selected in filters, return the allData which is original data.
        return {
          ...state,
          products: state.allData,
        };
      }

      const filteredProducts = state.allData.filter((product) => {
        let match = true; // Assuming initially, the product matches the filter criteria.

        if (filters.gender && !filters.gender.includes(product.gender)) {
          match = false; // If it doesn't match, make match to false.
        }
        if (filters.color && !filters.color.includes(product.color)) {
          match = false; // If it doesn't match, make match to false.
        }
        if (filters.price) {
          // Check if the price filter is set.
          const productPrice = +product.price; // Convert the product's price from a string to a number.
          const priceRanges = filters.price.map((range) =>
            range.split("-").map(Number)
          ); // Convert the price ranges from strings to array of numbers.

          const isInRange = priceRanges.some(
            ([min, max]) => productPrice >= min && productPrice <= max
          ); // Check if the product's price is within any of the selected price ranges.

          if (!isInRange) {
            match = false; // If it doesn't match, make match to false.
          }
        }
        if (filters.type && !filters.type.includes(product.type)) {
          match = false; // If it doesn't match, make match to false.
        }

        return match; // Return the product which matches the filter criteria.
      });

      return {
        ...state,
        products: filteredProducts, // Set products to the filtered products.
      };

    case "ADD_CART":
      const errorMessageHandler =
        "You have reached the maximum available quantity for this item";
      // Find the index of item whose id matches with action.payload.id
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCarts = [...state.carts];
        if (updatedCarts[itemIndex].quantity >= action.payload.quantity) {
          return {
            ...state,
            errorMessage: [...errorMessageHandler],
          };
        } else {
          updatedCarts[itemIndex].quantity += 1; // Increment the quantity
          return {
            ...state,
            carts: updatedCarts,
          };
        }
      } else {
        // If item doesn't exist in the cart, set quantity to 1
        return {
          ...state,
          carts: [
            ...state.carts,
            { ...action.payload, quantity: 1, qnty: action.payload.quantity },
          ],
        };
      }

    case "INCREMENT_CART":
      const errorMessageHandler1 =
        "You have reached the maximum available quantity for this item";
      // Find the index of item whose id matches with action.payload.id
      const itemIndex1 = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedCarts = [...state.carts];
      if (updatedCarts[itemIndex1].quantity >= action.payload.qnty) {
        return {
          ...state,
          errorMessage: [...errorMessageHandler1],
        };
      } else {
        updatedCarts[itemIndex1].quantity += 1; // Increment the quantity
        return {
          ...state,
          carts: updatedCarts,
        };
      }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload); // Remove the card by using filter method
      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      // Find the index of item whose id matches with action.payload.id
      const itemIndex2 = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex2 >= 0) {
        const updatedCarts = [...state.carts];
        if (state.carts[itemIndex2].quantity > 1) {
          updatedCarts[itemIndex2].quantity -= 1; // decrement the quantity
          return {
            ...state,
            carts: updatedCarts,
          };
        } else {
          const data = state.carts.filter((el) => el.id !== action.payload.id); // Remove the card by using filter method
          return {
            ...state,
            carts: data,
          };
        }
      }

      break;

    default:
      return state;
  }
};
