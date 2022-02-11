// import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from "react-native";
import { useState } from "react";
import { Input, Icon, FAB } from 'react-native-elements';
import NoteLists from './src/Components/NoteLists';
import DateTimePickerModal from "react-native-modal-datetime-picker";


LocaleConfig.locales['fr'] = {
  monthNames: [
    '	January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  dayNamesShort: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  today: "Today"
};
LocaleConfig.defaultLocale = 'fr';
export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  let [currentNote, seteCurrentNote] = useState({})
  let [markedDates, setMarkedDates] = useState({})
  let [allNotes, setAllNotes] = useState([])
  const [currentDate, setCurrentDate] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date.toString().split(" ")[4]);
    seteCurrentNote({
      ...currentNote,
      time: date.toString().split(" ")[4]
    })
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        // theme={{
        //   backgroundColor: '#ffffff',
        //   calendarBackground: '#ffffff',
        //   textSectionTitleColor: '#b6c1cd',
        //   textSectionTitleDisabledColor: '#d9e1e8',
        //   selectedDayBackgroundColor: '#00adf5',
        //   selectedDayTextColor: '#ffffff',
        //   todayTextColor: '#00adf5',
        //   dayTextColor: '#2d4150',
        //   textDisabledColor: '#d9e1e8',
        //   dotColor: '#00adf5',
        //   selectedDotColor: '#ffffff',
        //   arrowColor: 'orange',
        //   disabledArrowColor: '#d9e1e8',
        //   monthTextColor: 'blue',
        //   indicatorColor: 'blue',
        //   textDayFontFamily: 'monospace',
        //   textMonthFontFamily: 'monospace',
        //   textDayHeaderFontFamily: 'monospace',
        //   textDayFontWeight: '300',
        //   textMonthFontWeight: 'bold',
        //   textDayHeaderFontWeight: '300',
        //   textDayFontSize: 16,
        //   textMonthFontSize: 16,
        //   textDayHeaderFontSize: 16
        // }}
        onDayPress={day => {
          setCurrentDate(day.dateString)
          // setMarkedDates({
          //   ...markedDates,

          // })
        }}

        onDayLongPress={day => {
          setCurrentDate(day.dateString)
          setModalIsVisible(true)
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalIsVisible(!modalIsVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currentDate}</Text>
            <Input
              placeholder='Add Note'
              style={styles.modalInput}
              onChangeText={(e) => {
                // console.log(e)

                seteCurrentNote({
                  ...currentNote,
                  date: currentDate,
                  note: e
                })
              }}
            />
            <Input
              placeholder='Add Header'
              style={styles.modalInput}
            // onChangeText={(e) => {
            //   // console.log(e)

            //   seteCurrentNote({
            //     ...currentNote,
            //     date: currentDate,
            //     note: e
            //   })
            // }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setAllNotes([...allNotes, currentNote])
                setMarkedDates({
                  ...markedDates,
                  [currentDate]: { selected: false, marked: true }
                })
                setModalIsVisible(!modalIsVisible)
                seteCurrentNote({})
              }}
            >
              <Text style={styles.textStyle}>Add Note</Text>
            </Pressable>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              mode="time"
              date={new Date()}
              isDarkModeEnabled
            />
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          console.log(markedDates)
        }}
      >
        <Text style={styles.textStyle}>Console</Text>
      </Pressable> */}
      <NoteLists currentDate={currentDate} notes={allNotes} />
      <View style={styles.addBtnView}>
        <FAB
          // visible={visible}
          icon={{ name: 'add', color: 'white' }}
          color="blue"
          onPress={() => {
            setModalIsVisible(true)
          }

          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10
    // paddingTop: "2rem"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  addBtnText: {
    color: "white",
    fontSize: 30,
    fontWeight: "800"
  },
  addBtnView: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10
  },
  modalView: {
    margin: 20,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 50,
    // padding: 10,
    paddingTop: 4,
    fontSize: 15,
    color: "white",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    // textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalInput: {
    width: 50
  }
});
