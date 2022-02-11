import { useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView } from "react-native";

// const generateColor = () => {
//     const randomColor = Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, '0');
//     return `#${randomColor}`;
// };
const NoteLists = (props) => {
    const { notes, currentDate } = props
    // console.log(notes)
    // useEffect(() => {
    //     generateColor()
    // }, [props])
    return <>
        <ScrollView style={styles.taskWrapper}>
            {
                notes.map(i => {
                    if (i.date == currentDate) {
                        return <View style={styles.taskItem} key={Date.now() * Math.random() * Math.random()}>
                            <View style={styles.taskItemColor}></View>
                            <View style={styles.taskItemText}>
                                <Text>
                                    {i.date}
                                </Text>
                                <Text>
                                    {i.note}
                                </Text>
                                <Text>
                                    {i.time}
                                </Text>
                            </View>
                        </View>
                    }
                })

            }
        </ScrollView>
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
        height: 80,
        color: "white",
        borderRadius: 10,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        // width: 100
    },
    taskItemColor: {
        display: "flex",
        backgroundColor: "green",
        height: 80,
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 7
    },
    taskItemText: {
        paddingLeft: 10,
        paddingTop: 10
    }
})

export default NoteLists;