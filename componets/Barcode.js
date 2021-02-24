import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, TextInput } from 'react-native-paper';

export default function Barcode({ show = true, onScanned = () => { } }) {

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



    return (
        <Portal>
            <Dialog  visible={show} onDismiss={() => onScanned(null)}>
                <View style={styles.container}>
                    {loading && <ActivityIndicator color="black" />}
                    {!loading && hasPermission && (
                        <BarCodeScanner
                            onBarCodeScanned={onScanned}
                            style={{flex: 1, height: 100}} />
                    )}
                    {!loading && !hasPermission && (
                        <Text>Permissão negada</Text>
                    )}

                </View>
                {/* <Dialog.Actions>
                    <Button>CANCELAR</Button>
                </Dialog.Actions> */}
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        height: 100,
        width: 100,
    }
})