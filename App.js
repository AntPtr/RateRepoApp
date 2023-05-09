import Main from "./src/components/Main";
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import * as React from 'react'
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { authReducer } from "./src/contexts/AuthStorageContext";
import {Host} from 'react-native-portalize';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  const [state, dispatch] = React.useReducer(authReducer, {auth: false});
  const value = {authStorage, state, dispatch };
  return (
    <Host>
    <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value= {value}>
            < Main/>
          </AuthStorageContext.Provider>
        </ApolloProvider>
    </NativeRouter>
    </Host>
  );
};

export default App;