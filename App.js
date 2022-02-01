import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TextInput} from 'react-native';
import Frame from './component/Frame';
import Header from './component/Header';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Dimensions} from 'react-native';

const win = Dimensions.get('window');

function App() {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState('home');
  const [searchBtn, setsearchBtn] = useState(false);

  const api = `https://pixabay.com/api/?key=25490204-5d452c72dc2a0f46674dafcb3&q=${topic}&image_type=photo&orientation=vertical`;
  const fetchImage = async () => {
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });

      const getData = await response.json();
      setData(getData);
    } catch (error) {
      console.log(error);
    }
  };

  //to fetch for particular topic

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <View style={styles.main}>
      <Header />
      <View style={styles.search}>
        <TextInput
          value={topic}
          onChangeText={val => setTopic(val)}
          style={styles.searchBar}
          placeholder="Search Topic..."
        />
        <Icon
          onPress={() => {
            fetchImage();
            setTopic('');
          }}
          style={styles.icon}
          name="search"
          size={32}
          color={'black'}
        />
      </View>

      <FlatList
        nestedScrollEnabled={true}
        data={data['hits']}
        renderItem={({item}) => <Frame image={item} inverted={true} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#8477f5',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 10,
    marginEnd: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  searchBar: {
    fontSize: 20,
    width: win.width - 50,
  },
});

export default App;
