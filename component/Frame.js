import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import {Dimensions} from 'react-native';
import Comment from './Comment';
const win = Dimensions.get('window');

function Frame({image}) {
  //state for double tap
  const [doubleTap, setDoubleTap] = useState(false);
  //State to count the number of click
  const [clickCount, setClickCount] = useState(0);

  //for setting task is completed to default as false
  const [completed, setCompleted] = useState(false);

  //Function to count the click and using double click on
  //image to set it like
  const countClick = () => {
    if (clickCount === 0) {
      setClickCount(1);
      setTimeout(() => clearCount(), 500); //After 100ms, the count will reset automatically
    } else if (clickCount === 1) {
      setCompleted(!completed);
      setDoubleTap(true);
      setLike(true);
      setTimeout(() => clearDoubleTap(), 100);
      clearCount();
    }
  };

  //Clear the Click count
  const clearCount = () => {
    setClickCount(0);
  };

  //set state of double tap true
  const clearDoubleTap = () => {
    setDoubleTap(false);
  };

  //set like button
  const [like, setLike] = useState(false);

  //set bookmark
  const [bookmark, setBookmark] = useState(false);

  //state to contain all the comments
  const [comments, setComments] = useState([]);

  //state to hold current comment text
  const [commentText, setCommentText] = useState('');

  const onComment = () => {
    if (!commentText) {
      Alert.alert('Empty comment is not a comment :(');
    } else {
      setComments(prevText => [...prevText, commentText]);
    }
  };

  console.log(commentText);
  return (
    <View style={styles.main}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.frame}
        onPress={() => countClick()}>
        <ImageBackground style={styles.img} source={{uri: image.largeImageURL}}>
          <Icon
            activeOpacity={0.5}
            style={styles.icon}
            size={250}
            color="#8477f5"
            name={doubleTap ? 'favorite' : ''}
          />
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.reviewBar}>
        <Icon
          onPress={() => {
            setLike(!like);
          }}
          style={styles.icon}
          name={like || doubleTap ? 'favorite' : 'favorite-border'}
          size={32}
          color={like || doubleTap ? '#DDDDDD' : 'black'}
        />
        <TextInput
          value={commentText}
          onChangeText={val => setCommentText(val)}
          style={styles.comment}
          placeholder="Comment..."
        />
        <Icon
          onPress={() => {
            onComment();
            setCommentText('');
          }}
          style={styles.icon}
          name="send"
          size={32}
          color={'black'}
        />
        <Icon
          onPress={() => setBookmark(!bookmark)}
          style={styles.icon}
          name={bookmark ? 'bookmark' : 'bookmark-border'}
          size={32}
          color={'black'}
        />
      </View>
      <Comment comments={comments} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: win.width,
    height: (win.height * 2) / 3,
  },

  reviewBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: win.width,
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 5,
  },

  icon: {
    marginStart: 5,
    alignSelf: 'center',
  },

  likecomment: {
    flexDirection: 'row',
  },
  comment: {
    width: 280,
    height: 38,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 30,
    fontSize: 15,
    color: 'white',
    padding: 3,
    paddingStart: 20,
  },

  frame: {
    marginTop: 20,
  },
});

export default Frame;
