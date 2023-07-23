export const FETCHPRODUCTS = (alldata) => {
    return {
        type : "FETCH_PRODUCTS",
        payload: alldata
    }
}

export const SEARCHPRODUCTS = (searchdata) => {
    return {
        type : "SEARCH_PRODUCTS",
        payload: searchdata
    }
}

export const FILTERPRODUCTS = (filterdata) => {
    return {
        type : "FILTER_PRODUCTS",
        payload: filterdata
    }
}


export const ADD = (item) => {
    return {
        type : "ADD_CART",
        payload: item
    }
}

export const DLT = (id) => {
    return {
        type : "RMV_CART",
        payload: id
    }
}

export const REMOVE = (iteam) => {
    return {
        type : "RMV_ONE",
        payload: iteam
    }
}

export const INCREMENT = (add) => {
return {
    type : "INCREMENT_CART",
    payload: add
}
}

export const ERRORMESSAGE = (error) => {
    return {
        type : "ERROR_MESSAGE",
        payload: error
    }
    }
