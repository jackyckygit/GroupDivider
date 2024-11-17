import { FC } from 'react';
import { Button, Overlay } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type groups = { 
    [key: string]: string[] 
 }

interface groupProps {
    groups: groups
}
  
type OverlayComponentProps = {
    onClose: ()=>void;
    assignedGroups: groups
};

const GroupView: FC<groupProps> = ({ groups }) => {

    const renderTable = () => {
        return Object.keys(groups).map((key, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{key}</Text>
            <View style={styles.cell}>
              {groups[key].map((value, idx) => (
                <Text key={idx} style={styles.value}>{value}</Text>
              ))}
            </View>
          </View>
        ));
      };

      return (
        <View>
          <Text style={styles.header}>Group Members</Text>
          <View style={styles.table}>
            {renderTable()}
          </View>
        </View>
      );
};


const GroupOverlay: FC<OverlayComponentProps> = ({ onClose, assignedGroups }) => {
    return (
    <View style={styles.container}>
        <Overlay isVisible={true} onBackdropPress={onClose}>
            <GroupView groups={ assignedGroups }/>
            <Button
                title="Close"
                onPress={onClose}
            />
        </Overlay>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    cell: {
        flex: 1,
        padding: 10
    },
    value: {
        paddingVertical: 2
      },
    button: {
        margin: 10,
    },
});

export default GroupOverlay;