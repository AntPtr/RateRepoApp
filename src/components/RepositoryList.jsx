import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({setKeywrd}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setKeywrd(value);
    },
    // delay in ms
    500
  );

  const onChangeSearch = query => {
    setSearchQuery(query);
    debounced(query);
  }

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
}


const MenuList = ({setDir, setOrder, sel, setSel}) => {

  const selection = (value) => {
    if(value === "recent"){
      setOrder("CREATED_AT");
      setDir("DESC");
    }
    if(value === "hrate"){
      setOrder("RATING_AVERAGE");
      setDir("DESC");
    }
    if(value === "lrate"){
      setOrder("RATING_AVERAGE");
      setDir("ASC");
    }
  }


  return(
    <Picker
      selectedValue={sel} onValueChange={(itemValue, itemIndex) => { setSel(itemValue); selection(itemValue);} }>
      <Picker.Item label="Lastest repositories" value="recent" />
      <Picker.Item label="Higest rated repositories" value="hrate" />
      <Picker.Item label="Lowest rated repositories" value="lrate" />
    </Picker>
  )
 
}

const RepositoryListHeader = ({setKeywrd , setOrder, setDir, sel, setSel }) => {
  return(
    <View>
      <SearchBar setKeywrd={setKeywrd}/>
      <MenuList setOrder={setOrder} setDir={setDir} sel={sel} setSel={setSel}/>
    </View>
  )
}


export const RepositoryListContainer = ({setKeywrd, repositories, setOrder, setDir, sel, setSel }) => {
  console.log(repositories)
  
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({item}) => <RepositoryItem {...item} />}
    ListHeaderComponent = {() => <RepositoryListHeader setKeywrd={setKeywrd} setOrder={setOrder} setDir={setDir} sel={sel} setSel={setSel}/>}
    // other props
      // ...
    />
  );
};


const RepositoryList = () => {
  const [ order, setOrder ] = React.useState("CREATED_AT");
  const [ dir, setDir ] = React.useState("DESC");
  const [ sel, setSel ] = React.useState("recent");
  const [ keywrd, setKeywrd ] = React.useState("")

  console.log(order,dir)
  const [ data , load ] = useRepositories(order, dir, keywrd);



  if(load){
    return(
      <View></View>
    )
  } 
  if(data){
  return (
    <View >
      <RepositoryListContainer setKeywrd={setKeywrd} setOrder={setOrder} setDir={setDir} repositories={data} sel={sel} setSel={setSel}/>
    </View>
  );
  }
};

export default RepositoryList;