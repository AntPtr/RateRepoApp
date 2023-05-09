import { useMutation } from '@apollo/client';
import { CREATE_REWIEV } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';




const useCreateRewiev = () => {
    const [mutate, result] = useMutation(CREATE_REWIEV, {
      onCompleted: ()=>{console.log('done')}
    });
    const { authStorage } = useAuthStorage();

  
    const addRewiev = async ( { ownerName, repositoryName, rating, text }) => {
      // call the mutate function here with the right arguments
      console.log('review mutate');
      const { data } = await mutate({variables: {input: { ownerName, repositoryName, rating, text }}});
      const token = await authStorage.getAccessToken();
      console.log(token);
      return(data)
    };
  
    return [addRewiev, result];
};

export default useCreateRewiev;