import * as React from 'react'
 const AuthStorageContext = React.createContext();

 export const authReducer = (state, action) => {
    switch (action.type) {
      case 'login': {
        return {auth: !state.auth}
      }
      case 'logout': {
        return {auth: !state.auth}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

  export default AuthStorageContext;

