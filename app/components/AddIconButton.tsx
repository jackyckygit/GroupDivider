import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@rneui/themed'; 

// Define the props interface 
interface AddButtonProps { 
    onAdd: any,
    onRemove: any,
    isAdd: boolean
}

const styles = StyleSheet.create({
    button: { 
        borderRadius: 25,
        padding: 10
    },
});
  
const AddIconButton: FC<AddButtonProps> = ({ onAdd, onRemove, isAdd }) => { 
    return (
        <Button 
            icon={{
                name: (isAdd)?'plus':'minus',
                type: 'font-awesome',
                size: 15,
                color: 'black',
            }}            
            onPress={(isAdd)?onAdd:onRemove} 
            buttonStyle={styles.button} 
            type={"clear"}
        /> 
    )
}; 

export default AddIconButton;
  