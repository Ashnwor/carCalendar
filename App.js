import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar} onDayPress={(day) => { console.log('selected day', day); }} minDate={Date()}
      />

      <Button mode='contained' onPress={() => navigation.navigate('Details')} style={{width: '30%', alignSelf: 'center'}} >TEST</Button>
    </View>
  )
}

function Details({ navigation }) {
  const [value, onChangeText] = React.useState('Placeholder');

  return (
    <View style={styles.container}>
      <TextInput label='Plaka'/>
      <TextInput label='Plaka'/>
      <TextInput label='Plaka'/>
      <TextInput label='Plaka'/>
      <Button mode='contained' onPress={() => navigation.navigate('Details')} style={styles.saveBtn}>KAYDET</Button>
    </View>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Calendar" component={HomeScreen} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  calendar: {
    width: '100%',
    height: '80%',
  },

  saveBtn: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 50
  }
});
