import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import Text from './Text';

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
        flexShrink:  1,
        flexWrap :  'nowrap'
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
        flex: 1,
        flexWrap: 'nowrap'
    },
    flexItem2: {
        flex: 1,
        flexWrap: 'wrap',
        padding: 10,
    },
  });

const counters = (value) => {
    if(value > 1000){
       const k = value / 1000
       return (k.toFixed(1) +'k') 
    }
}

const RepositoryItem = ({fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl, id}) => {
    const navigate = useNavigate();

    const onPress = () => {
        const url = "/user/" + id;
        navigate(url);
    }
    
    return(
        <Pressable onPress={() => { onPress() }}>
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
        </View>
        </Pressable>
    )
}

export default RepositoryItem