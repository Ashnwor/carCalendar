import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Button, FAB, List as ListItem } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

function OpenList(navigation, day) {
  console.log(day);
  navigation.navigate('List', day);
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar} onDayPress={(day) => { OpenList(navigation, day); }} minDate={Date()}
      />
    </View>
  )
}

function List({ route, navigation }) {
  const day = route.params;
  navigation.setOptions({
    headerTitle: day.dateString
  });

  return (
    <View style={styles.container}>
      <ListItem.Item
        title="First Item"
        description="Item description"
        left={props => <ListItem.Icon {...props} icon="folder" />}
      />
      <ListItem.Item
        title="First Item"
        description="Item description"
        left={props => <ListItem.Icon {...props} icon="folder" />}
      />
      <ListItem.Item
        title="First Item"
        description="Item description"
        left={props => <ListItem.Icon {...props} icon="folder" />}
      />
      <ListItem.Item
        title="First Item"
        description="Item description"
        left={props => <ListItem.Icon {...props} icon="folder" />}
      />
      <ListItem.Item
        title="First Item"
        description="Item description"
        left={props => <ListItem.Icon {...props} icon="folder" />}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

function Details({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <TextInput label='Plaka' />
      <TextInput label='Marka' />
      <TextInput label='Model' />

      <ListItem.Item title="Alım tarihi"
        description={Date()}
        left={props => <ListItem.Icon {...props} icon="clock" />} onPress={() => showDatepicker()} >Alım Tarihi</ListItem.Item>

      <Button mode='contained' onPress={() => navigation.navigate('Details')} style={styles.saveBtn}>KAYDET</Button>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
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
          <Stack.Screen name="List" component={List} />
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
  },

  calendar: {
    width: '100%',
    height: '100%',
  },

  saveBtn: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 50
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

});
