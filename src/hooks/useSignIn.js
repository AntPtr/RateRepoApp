import { useMutation } from '@apollo/client';
import { LOGIN, } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient  } from '@apollo/client';


const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN, {
      onCompleted: ()=>{console.log('done')}
    });
    
    const {dispatch, authStorage} = useAuthStorage();
    const apolloClient = useApolloClient();
  
    const signIn = async ({ username, password }) => {
      // call the mutate function here with the right arguments
      const { data } = await mutate({variables: {input: {username,password }}});
      console.log(data.authenticate.accessToken)
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      dispatch({type: 'login'});
      return(data)
    };

  
    return [signIn, result];
  };

  export default useSignIn;