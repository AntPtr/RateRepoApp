import { View, StyleSheet} from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList'
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleItem from './SingleItem';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8'
  },
});


const Main = () => {
  return (
    <View  style ={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />  
        <Route path="/SignIn" element={<SignIn />} exact />
        <Route path="/SignUp" element={<SignUp />} exact />
        <Route path="/MyReviews" element={<MyReviews />} exact />
        <Route path="/CreateRewiev" element={<CreateReview />} exact />                          
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/user/:userId" element={<SingleItem />} exact/>
      </Routes>
    </View>
  );
};

export default Main;