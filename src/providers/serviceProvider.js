import React, { useContext, useReducer } from "react";

export const MY_REQUEST_REFRESH = "MY_REQUEST_REFRESH";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const UPDATE_STATUS = "UPDATE_STATUS";

const initialState = {
  isLoading: false,
  requests: []
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_REQUEST_REFRESH:
      return {
        ...state,
        isLoading: true
      };

    case REFRESH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload
      };
    case UPDATE_STATUS:
      let ps = [...state.requests];
      for (let index = 0; index < ps.length; index++) {
        const element = ps[index];
        if (element.id === action.payload.id)
          ps[index].status = action.payload.status;
      }
      return {
        ...state,
        requests: [...ps]
      };
    default:
      return state;
  }
};

const context = React.createContext();

const ServiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};

const useServiceReducer = () => useContext(context);

export { ServiceProvider, useServiceReducer };
