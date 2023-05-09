import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';



const useRepositories = (order, dir, keywrd) => {

    const { data, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        // Other options
        variables: {
            orderBy : order,
            orderDirection: dir,
            searchKeyword: keywrd,
        },
    });
   

    return[data, loading];
};

export default useRepositories;