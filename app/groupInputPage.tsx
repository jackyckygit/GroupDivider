import React, { useState, FC } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed'; 
import { RouteProp, useRoute } from '@react-navigation/native';
import MyTextInput from './components/myTextInput';
import GroupOverlay from './GroupOverlay';

type groups = { 
   [key: string]: string[] 
}

function assignUsersToGroups(usernames: string[], groupNames: string[]): Record<string, string[]> {
  // Function to shuffle the usernames array
  function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the usernames array
  const shuffledUsernames = shuffle([...usernames]);

  // Initialize an object to hold the groups
  const groups: Record<string, string[]> = {};
  groupNames.forEach(groupName => {
    groups[groupName] = [];
  });

  // Distribute the shuffled usernames to the groups
  for (let i = 0; i < shuffledUsernames.length; i++) {
    const groupName = groupNames[i % groupNames.length];
    groups[groupName].push(shuffledUsernames[i]);
  }

  return groups;
}

type ParamList = { groupInputPage: { usernames: string[] }; };

const groupInputPage: FC = () => {
  const route = useRoute<RouteProp<ParamList, 'groupInputPage'>>(); 
  const [ groups, setGroups ] = useState([''])
  const [ newGroup, setNewGroup] = useState<string>('');
  const [ disableGroup, setDisableGroup ] = useState(true);
  const [ displayGroup, setDisplayGroup ] = useState(false);
  const [ assignedGroups, setAssignedGroups ] = useState<groups>({});

  const { usernames } = route.params

  const handleCreateGroups = () => {
    // check any duplicate
    let groupsSet = new Set(groups);
    if (groupsSet.size != groups.length) {
      alert('There is duplicated group name')
    }
    else if (usernames.length<groups.length){
      alert('Number of groups is more than that of usernames')
    }
    else {
      const _assignedGroups = assignUsersToGroups(usernames, groups);
      setDisplayGroup(true);
      setAssignedGroups(_assignedGroups)
    }
  };

  const handleAddGroup = () => {
    setGroups([...groups, newGroup]);
    setNewGroup('');
    setDisableGroup(true)
  };

  const handleRemoveGroup = (index: number) => {
    const newArr = groups.filter((item, i) => i !== index); 
    setGroups(newArr); 
  };

  return (
    <ScrollView id="MyScrollView">
    <View style={styles.container} id="MyView">
      <Text style={styles.title}>Enter group name</Text>
      {
        groups.map((un, index)=>{
          return <MyTextInput 
            placeholder="Group name" 
            value={un}
            onValueChange={(v:string)=>{
              groups[index] = v;
              setGroups(groups);
              setDisableGroup(groups.some(n=>n.trim()==='')||groups.length==1)
            }} 
            key={index}
            onAdd={handleAddGroup}
            onRemove={()=>{handleRemoveGroup(index)}}
            displayAdd={index==groups.length-1}
            />
          }
        )
      }
      <View style={styles.buttonContainer}>
        <Button 
          title="Form Group!!" 
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
    { displayGroup &&
      <GroupOverlay onClose={()=>setDisplayGroup(false)} assignedGroups={assignedGroups} />
    }
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
    fontSize: 20
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default groupInputPage;