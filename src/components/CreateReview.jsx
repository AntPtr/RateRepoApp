import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native'
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useCreateRewiev from '../hooks/useCreateRewiev'
import * as yup from 'yup';

const validationSchema = yup.object().shape({  
    ownerName: yup.string().required('Repository owner name is required'),  
    repositoryName: yup.string().required('Repository name is required'),
    rate: yup.number().min(0).max(100).positive().integer(),
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rate: null,
    text: '',
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

const CreateReview = () => {

  const [addRewiev] = useCreateRewiev();
  
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log('pressed');
    const { ownerName, repositoryName, rate, text } = values;
    const rating = Number(rate);
    const data = await addRewiev({ ownerName, repositoryName, rating, text });
    if(data){
      console.log(data);
      navigate("/user/" + data.id);
    }   
  };

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        {({ handleSubmit }) => (
            <View style={styles.form}>
                    <FormikTextInput name="ownerName" placeholder="Repository owner name" />           
                    <FormikTextInput name="repositoryName" placeholder="Repository name" />           
                    <FormikTextInput name="rate" placeholder="Rating between 0 and 100" />           
                    <FormikTextInput multiline name="text" placeholder="Review" />           
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text  fontWeight ='bold' fontSize ='subheading' color="textWhite">Create a rewiev</Text>
                    </Pressable>
            </View>
        )}
        </Formik>
    )

}

export default CreateReview;