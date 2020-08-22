import React from 'react';
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';

function Todo({ id, title, complete }) {
  const toggleComplete = async () => {
    await firestore().collection('todos').doc(id).update({
      complete: !complete,
    });
  };

  const deleteTodo = async () => {
    await firestore().collection('todos').doc(id).delete();
  };

  const leftIcon = (props) => (
    <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
  );

  const rightIcon = (props) => (
    <TouchableOpacity onPress={deleteTodo}>
      <List.Icon {...props} icon="trash-can-outline" />
    </TouchableOpacity>
  );

  return (
    <List.Item
      title={title}
      onPress={toggleComplete}
      left={leftIcon}
      right={rightIcon}
    />
  );
}

export default React.memo(Todo);
