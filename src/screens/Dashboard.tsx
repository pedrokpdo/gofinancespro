import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function Dashboard () {
    return (
        <View style={styles.container}>
            <Text>Ola</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
})