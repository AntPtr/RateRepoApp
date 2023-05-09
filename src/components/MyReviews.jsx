import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { format  } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

import Text from './Text';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    review: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    rating:{
        width: 55,
        height: 55,
        padding: 1,
        borderRadius: 55/2,
        borderColor: '#0366d6',
        borderStyle: 'solid',
        borderWidth: 3,
        margin: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRe: {
        flexShrink:  1,
        flexWrap :  'nowrap'
    },
    buttons:{
        padding: 4,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        flex:1,
        backgroundColor : '#0366d6',
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 18,
    },
    button_2: {
        flex:1,
        backgroundColor : '#f5424b',
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 18,
      } 
  });


const Review = ({ review, refetch }) => {
    const {text, rating, createdAt, user, repositoryId, id} = review.node;
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const goRep = () => {
        const url = "/user/" + repositoryId;
        console.log(url);
        navigate(url);
    }

    const deleteR = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Delete', onPress: async () => {
            const data = await deleteReview(id);
            if(data){
                refetch();
            }
          } 
        },
        ]);
    }
    return(
        <View >
            <View style={styles.review}>
                <View style= {styles.rating}>
                    <Text fontWeight ='bold' fontSize ='subheading' rating='on'>{rating}</Text>
                </View>
                <View style = {styles.textRe}>
                    <Text fontWeight="bold" fontSize="subheading">{user.username}</Text>
                    <Text>{format(new Date(createdAt),'MM.dd.yyyy')}</Text>
                    <Text fontSize="subheading">{text}</Text>
                </View> 
            </View>
            <View style= {styles.buttons}>
                <Pressable style={styles.button} onPress={ goRep }>
                    <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">View repository</Text>
                </Pressable>
                <Pressable style={styles.button_2} onPress={ deleteR }>
                    <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">Delete</Text>
                </Pressable>
            </View>   
        </View>
        
    )
  };

  const ItemSeparator = () => <View style={styles.separator} />;


  const MyReviews = () => {

    const { data, loading, refetch } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables:{
          includeReviews: true
        },
      });
    
    
    if (loading){
        return <View></View>
    }
    console.log(data)
    return(
        <FlatList
        data={data.me.reviews.edges}
        renderItem={({ item }) => <Review review={item} refetch={refetch}/>}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent = {ItemSeparator}
        // ...
    />
    )
   
    
}

export default MyReviews;