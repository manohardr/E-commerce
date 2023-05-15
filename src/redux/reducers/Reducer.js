
const INIT_STATE = {
  carts: [],
  errorMessage: '',
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_CART':
      
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        // Item already exists in the cart, check quantity
        const updatedCarts = [...state.carts];
        if (state.carts[itemIndex].quantity < action.payload.quantity) {
          updatedCarts[itemIndex].quantity += 1;
          return {
            ...state,
            carts: updatedCarts,
            errorMessage: '',
          };
        } else {
          return {
            ...state,
            errorMessage: 'You have reached the maximum available quantity for this item.',
          };
        }
      } else {
        // Item doesn't exist in the cart, add it
        return {
          ...state,
          carts: [...state.carts, { ...action.payload, quantity: 1, qnty : action.payload.quantity }],
          errorMessage: '',
        };
      }
           
          
      case "INCREMENT_CART":

          const itemIndex1 = state.carts.findIndex((item) => item.id === action.payload.id);
      
        // Item already exists in the cart, check quantity
        
        if (state.carts[itemIndex1].qnty > action.payload.quantity) {
          state.carts[itemIndex1].quantity += 1;
          return {
            ...state,
            carts: [...state.carts],
            errorMessage: '',
          };
        } else {
          return {
            ...state,
            errorMessage: 'You have reached the maximum available quantity for this item.',
          };
        }
     
        case "RMV_CART":
            const data = state.carts.filter((el)=>el.id !== action.payload)

            return {
                ...state,
                carts:data
            }

        case "RMV_ONE":
          const IteamIndex_dec = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
   
          if(state.carts[IteamIndex_dec].quantity >= 1 ){
              const dltiteams = state.carts[IteamIndex_dec].quantity -= 1
              console.log([...state.carts,dltiteams]);

              return {
                  ...state,
                  carts:[...state.carts],
                  errorMessage: ''
              }
          }else if(state.carts[IteamIndex_dec].quantity === 1 ){
              const data = state.carts.filter((el)=>el.id !== action.payload);

              return {
                  ...state,
                  carts:data
              }
          }

      default:
          return state;
    }
}
