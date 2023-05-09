import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native'
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'



const validationSchema = yup.object().shape({  
  username: yup.string().required('Username is required'),  
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  form: {
    display:'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 3,
  },
  button: {
    backgroundColor : '#0366d6',
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 18,
  } 
})
export const SignInContainer = ({onSubmit}) => {


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({ handleSubmit }) => (
        <View style={styles.form}>
        <FormikTextInput name="username" placeholder="Username" />           
        <FormikTextInput secureTextEntry name="password" placeholder="Password" />    
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">Sign in</Text>
        </Pressable>
      </View>
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const data = await signIn({ username, password });
    if(data){
      console.log(data);
      navigate("/");
    }   
  };

  

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({ handleSubmit }) => (
        <View style={styles.form}>
        <FormikTextInput name="username" placeholder="Username" />           
        <FormikTextInput secureTextEntry name="password" placeholder="Password" />    
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">Sign in</Text>
        </Pressable>
      </View>
      )}
    </Formik>

  )

};
export default SignIn;