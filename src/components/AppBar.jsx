import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import { GET_ME } from '../graphql/queries';
import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native'
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';

import Text from './Text';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 40,
    backgroundColor:'#24292e',
    display: 'flex',
    flexDirection: 'row',
    // ...
  },
  container2: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  container3: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  // ...
});

const AppBar = () => {
  const {state, dispatch, authStorage} = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });
  
  const apolloClient = useApolloClient();



  const signOut = async () => {
    navigate("/");
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    dispatch({type:'logout'});
  }
  console.log(state.auth);
  if (!data){
    return(
      <View>
            <Text color="textWhite" fontWeight="bold" fontSize="subheading">Loading</Text>
      </View>
    )
  }
  console.log(state.auth)
  return ( 
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.container2}>
      <Link to = "/">
        <Text color="textWhite" fontWeight="bold" fontSize="subheading">Repositories</Text>
      </Link>
      { state.auth ? 
          <View style={styles.container3}>
            <Pressable onPress={signOut}>
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">Sign Out</Text>
            </Pressable>
            <Link to = "/CreateRewiev">
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">Create a review</Text>
            </Link>
            <Link to = "/MyReviews">
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">My Reviews</Text>
            </Link>
          </View>
        :
        <View style={styles.container3}>
          <View>
            <Link to = "/SignIn">
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">Sign in</Text>
            </Link>
          </View>
          <View>
            <Link to = "/SignUp">
              <Text color="textWhite" fontWeight="bold" fontSize="subheading">Sign up</Text>
            </Link>
          </View>
        </View> 
      }
    </ScrollView>
  </View>
  );
};

export default AppBar;