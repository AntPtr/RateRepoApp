import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';



const useCreateUser = () => {
    const [mutate, result] = useMutation(CREATE_USER, {
      onCompleted: ()=>{console.log('done')}
    });

  
    const createUser = async ( { username, password }) => {
      // call the mutate function here with the right arguments
      const { data } = await mutate({variables: {input: { username, password }}});
      return(data)
    };
  
    return [createUser, result];
};

export default useCreateUser;