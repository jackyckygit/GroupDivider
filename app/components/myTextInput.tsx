import React, {FC} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import AddIconButton from './AddIconButton';

// Define the props interface 
interface MyTextInputProps { 
  placeholder: string,
  value: string,
  onValueChange: Function,
  onAdd: any,
  onRemove: any,
  displayAdd?: boolean,
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    flex: 0
  },
  button: { backgroundColor: 'blue', padding: 10, },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

const MyTextInput: FC<MyTextInputProps> = ({ placeholder, value, onValueChange, onAdd, onRemove, displayAdd=true }) => {
  const [text, setText] = React.useState('');
  const onChangeText = (v:string)=>{
    setText(v);
    onValueChange(v);
  }

  React.useEffect(()=>{
    setText(value)
  },[value])

  return (
    <View style={
      styles.container
    }>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
      />

      <AddIconButton onAdd={onAdd} onRemove={onRemove} isAdd={displayAdd} />
    </View>
  );
};


export default MyTextInput;