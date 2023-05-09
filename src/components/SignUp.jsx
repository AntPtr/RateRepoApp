import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native'
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';

const validationSchema = yup.object().shape({  
    username: yup.string().min(1).max(30).required('Username is required'),  
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null]).required('Password confirm is required'),
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
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

const SignUp = () => {

  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const data = await createUser({ username, password });
    if(data){
        const resp = await signIn({ username, password });
        if(resp){
            navigate("/");
        }
    }   
  };

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        {({ handleSubmit }) => (
            <View style={styles.form}>
                    <FormikTextInput name="username" placeholder="Username" />           
                    <FormikTextInput secureTextEntry name="password" placeholder="Password" />           
                    <FormikTextInput secureTextEntry name="passwordConfirm" placeholder="Password confirm" />                      
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">Sign up</Text>
                    </Pressable>
            </View>
        )}
        </Formik>
    )

}

export default SignUp;