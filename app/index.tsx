import { Link } from 'expo-router';
import { Text, View, StyleSheet } from "react-native";
import { Button } from '@rneui/themed'
import { useNavigation } from 'expo-router';
// import type { StaticScreenProps } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ParamList = {
  usernameInputPage: undefined;
};

type usernameRouteProp = StackNavigationProp<ParamList>;

export default function Index() {
  const navigation = useNavigation<usernameRouteProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Divider</Text>
      <Text style={styles.text}>Sometimes, you need to split a group of people into smaller, random groups. This app simplifies the process, making it easy to divide them into different groups effortlessly.</Text>
      {/* <Link href="/usernameInputPage">Start */}
        <Button 
          title="Start" type='outline' 
          onPress={()=>{navigation.navigate('usernameInputPage')}}
        />
      {/* </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30
  },
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  }
});