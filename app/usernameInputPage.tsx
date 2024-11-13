import React, { useState, FC } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';

import MyTextInput from './components/myTextInput';

type GroupParamList = {
  groupInputPage: { usernames: string[] };
};

type groupRouteProp = StackNavigationProp<GroupParamList>;

const usernameInputPage: FC = () => {
  const [usernames, setUsernames] = useState<string[]>(['']);
  const [newUsername, setNewUsername] = useState<string>('');
  const [disableGroup, setDisableGroup] = useState<boolean>(true);
  const navigation = useNavigation<groupRouteProp>();

  const handleAddUsername = () => {
    setUsernames([...usernames, newUsername]);
    setNewUsername('');
    setDisableGroup(true)
  };

  const handleRemoveUsername = (index: number) => {
    const newArr = usernames.filter((item, i) => i !== index); 
    setUsernames(newArr); 
  };

  const handleCreateGroups = () => {
    // check any duplicate
    let usernameSet = new Set(usernames);
    if (usernameSet.size != usernames.length) {
      alert('There is duplicated username')
    }
    else {
      navigation.navigate('groupInputPage', { usernames });
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Enter the username</Text>
      {
        usernames.map((un, index)=>
          <MyTextInput 
            placeholder="Username" 
            value={un}
            onValueChange={(v:string)=>{
              usernames[index] = v;
              setUsernames(usernames);
              setDisableGroup(usernames.some(n=>n.trim()==='')||usernames.length==1)
            }} 
            key={index}
            onAdd={handleAddUsername}
            onRemove={()=>{handleRemoveUsername(index)}}
            displayAdd={index==usernames.length-1}
            />
        )
      }
      <View style={styles.buttonContainer}>
        <Button 
          title="Group" 
          onPress={handleCreateGroups} 
          buttonStyle={{
            borderRadius: 25,
          }}
          containerStyle={{
            width: 150,
          }}
          disabled={disableGroup}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default usernameInputPage;