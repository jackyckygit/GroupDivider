import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the props interface 
interface AddButtonProps { 
    onAdd: any,
    onRemove: any,
    isAdd: boolean
}

const styles = StyleSheet.create({
    myButton: { 
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'transparent'
    },
});
  
const AddIconButton: FC<AddButtonProps> = ({ onAdd, onRemove, isAdd }) => { 
    return (
        <Icon.Button
            name={(isAdd)?'plus':'minus'}
            backgroundColor="transparent"
            style={styles.myButton} 
            color= {'black'}
            onPress={(isAdd)?onAdd:onRemove} 
        />
    )
}; 

export default AddIconButton;
  