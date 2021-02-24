import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, TextInput } from 'react-native-paper';

export default function Barcode({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        requestPermissoin()
    }, [])

    const requestPermissoin = async () => {
        setLoading(true)
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        setHasPermission(status === 'granted')
        setLoading(false)
    }

    const onScanned = ({data}) => {
        navigation.navigate("Product", {data})
    }


    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="black" />}
            {!loading && hasPermission && (
                <BarCodeScanner
                    onBarCodeScanned={onScanned}
                    style={StyleSheet.absoluteFillObject} />
            )}
            {!loading && !hasPermission && (
                <Text>Permissão negada</Text>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16
    }, 
    button: {
        marginTop: "auto"
    }
})