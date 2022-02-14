import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Button } from "react-native";
import { useState } from "react";
import { Input, Icon, FAB } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NoteLists = (props) => {
    const { notes, currentDate, setNotes, markedDates } = props;
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [viewCurrentNote, setViewCurrentNote] = useState({})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [updateNote, setUpdateNote] = useState({});

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date.toString().split(" ")[4]);
        setCurrentNote({
            ...currentNote,
            time: date.toString().split(" ")[4]
        })
        hideDatePicker();
    };
    return <>
        <ScrollView style={styles.taskWrapper}>
            {
                notes.map(i => {
                    if (i.date == currentDate) {
                        return <Pressable key={Date.now() * Math.random() * Math.random()} onPress={(e) => {
                            // console.log(i)
                            setViewCurrentNote(i)
                            setModalIsVisible(true)
                        }}>
                            <View style={styles.taskItem} >
                                <View style={styles.taskItemColor}></View>
                                <View style={styles.taskTextDelete}>
                                    <View style={styles.taskItemText}>
                                        <Text>
                                            {i.date}
                                        </Text>
                                        <Text>
                                            {i.header}
                                        </Text>
                                        <Text>
                                            {i.note}
                                        </Text>
                                        <Text>
                                            {i.time}
                                        </Text>
                                    </View>
                                    <Pressable onPress={() => {
                                        setNotes(notes.filter((note) => note.id !== i.id))
                                        // console.log(markedDates)
                                    }}>
                                        <Icon name="delete"
                                            color="red"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    }
                })

            }
        </ScrollView>
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
                        placeholder='Add Header'
                        style={styles.modalInput}
                        defaultValue={viewCurrentNote.header}
                        onChangeText={(e) => {
                            // console.log(e)

                            setUpdateNote({
                                ...updateNote,
                                header: e
                            })
                        }}
                    />
                    <Input
                        placeholder='Add Note'
                        style={styles.modalInput}
                        defaultValue={viewCurrentNote.note}
                        onChangeText={(e) => {
                            // console.log(e)
                            setUpdateNote({
                                ...updateNote,
                                note: e
                            })

                            // setCurrentNote({
                            //     ...currentNote,
                            //     date: currentDate,
                            //     note: e
                            // })
                        }}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {

                            setModalIsVisible(!modalIsVisible)
                        }}
                    >
                        <Text style={styles.textStyle}>Update</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setNotes(notes.filter((note) => note.id !== viewCurrentNote.id))
                            setModalIsVisible(!modalIsVisible)

                        }}
                    >
                        <Text style={styles.textStyle}>Delete</Text>
                    </Pressable>
                    <Button title="Show Date Picker"
                        onPress={showDatePicker}
                    />
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
    </>
}
const styles = StyleSheet.create({
    taskWrapper: {
        display: "flex",
        // backgroundColor: "red",
        // flexDirection: "column",
        // overflow: "scroll"

        // width: 300
    },
    taskItem: {
        display: "flex",
        // padding: 10,
        backgroundColor: "#E1DFEE",
        margin: 10,
        minHeight: 80,
        color: "white",
        borderRadius: 10,
        flexDirection: "row",
        shadowColor: "#000",
        // alignItems: "baseline",
        // justifyContent: "space-around",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        // width: 100
    },
    taskTextDelete: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 3,
        alignItems: "center",
        width: "100%"
    },
    taskItemColor: {
        display: "flex",
        backgroundColor: "green",
        minHeight: 80,
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 7
    },
    taskItemText: {
        paddingLeft: 10,
        paddingTop: 10
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
})

export default NoteLists;