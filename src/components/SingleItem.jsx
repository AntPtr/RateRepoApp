import { View, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { SINGLE_REP } from '../graphql/queries';
import { format  } from 'date-fns'
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
      margin: 3,
      borderRadius: 10,
    },
    flexContainer: {
        display: 'flex',
        padding: 8,
        backgroundColor: 'white',
      },
    flexContainer2: {
        display: 'flex',
        flexDirection: 'row',
      },
    flexContainer3: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
      },
      flexContainer4: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 8,
      },
      flexContainer5: {
        display: 'flex',
        flexDirection: 'column',
      },
    flexContainer6: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 3
      },
    flexItem1: { 
        //flex: 1,
        flexWrap: 'nowrap'
    },
    flexItem2: {
        //flex: 1,
        flexWrap: 'wrap',
        padding: 10,
    },
    button: {
        backgroundColor : '#0366d6',
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 18,
    },
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
    }
  });

const ItemSeparator = () => <View style={styles.separator} />;

const counters = (value) => {
    if(value > 1000){
       const k = value / 1000
       return (k.toFixed(1) +'k') 
    }
}

const RepositoryInfo = ({ repository }) => {
    // Repository's information implemented in the previous exercise
    const  {fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl } = repository ;
    const onClick = () => {
        Linking.openURL(repository.url)
    }
    
    return(
        <View testID="repositoryItem" style = {styles.flexContainer}>
            <View  style = {styles.flexContainer2}>
                <View  >
                    <Image style={styles.tinyLogo} source={{ uri: ownerAvatarUrl, }}/>
                </View>
                <View  style = {styles.flexContainer3}>
                    <View  style={styles.flexItem1}>
                        <Text fontWeight="bold" fontSize="subheading"> {fullName}</Text>
                    </View>
                    <View  style={styles.flexItem1} >
                        <Text fontSize="subheading"> {description}</Text>
                    </View>
                    <View  style={styles.flexItem2}>
                        <Text borders="smooth" pad="active" fontSize="subheading"  color = 'textWhite' backLen = "lengBack">{language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.flexContainer4}>
            <View style={styles.flexContainer5}>
                <View style={styles.flexContainer6}><Text fontSize="subheading">Stars</Text></View>
                <View  style={styles.flexContainer6}><Text fontWeight="bold" fontSize="subheading">{counters(stargazersCount)}</Text></View>
            </View>
            <View style={styles.flexContainer5}>
                <View style={styles.flexContainer6}><Text fontSize="subheading">Forks</Text></View>
                <View  style={styles.flexContainer6}><Text fontWeight="bold" fontSize="subheading">{counters(forksCount)}</Text></View>
            </View>
            <View style={styles.flexContainer5}>
                <View style={styles.flexContainer6}><Text fontSize="subheading">Rating</Text></View>
                <View style={styles.flexContainer6}><Text fontWeight="bold" fontSize="subheading">{ratingAverage}</Text></View>
            </View>
            <View style={styles.flexContainer5}>
                <View style={styles.flexContainer6}><Text fontSize="subheading">Reviews</Text></View>
                <View style={styles.flexContainer6}><Text fontWeight="bold" fontSize="subheading">{reviewCount}</Text></View>
            </View>
            </View>
            <Pressable style={styles.button} onPress={()=>{ onClick() }}>
                    <Text fontWeight ='bold' fontSize ='subheading' color="textWhite">Open in GitHub</Text>
            </Pressable>
        </View>
    )
  };
  
  const ReviewItem = ({ review }) => {
    // Single review item
    const {text, rating, createdAt, user} = review.node;
    return(
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
    )
  };

const SingleItem = () => {
    let { userId } = useParams();
    console.log(userId);

    const { data, loading, fetchMore } = useQuery(SINGLE_REP, {
        variables: {repositoryId: userId },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) {
          return;
        }
        console.log("here");
        fetchMore({
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            first: 3,
          },
        });
    };
    
    const onEndReach = () => {
        handleFetchMore();
    };
    
    
    if (loading){
        return <View></View>
    }
    console.log(data)
    return(
        <FlatList
        data={data.repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent = {ItemSeparator}
        ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        // ...
    />
    )
   
    
}

export default SingleItem