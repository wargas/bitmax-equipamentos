import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Button, FAB } from 'react-native-paper';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={{fontWeight: "bold", fontSize: 30}}>Bem-vindo!</Text>

            <FAB
                color="white"
                
                onPress={() => navigation.push("Product")}
                style={styles.fab} icon="plus" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "orange"
    }
})