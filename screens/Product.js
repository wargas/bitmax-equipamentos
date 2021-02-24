import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Menu, Portal, TextInput } from 'react-native-paper';
import Select from '../componets/Select';
import VMasker from 'vanilla-masker';
import axios from 'axios';
import { useFormik } from 'formik';

const options = [
    { label: "ROTEADOR", value: "ROTEADOR" },
    { label: "ANTENA", value: "ANTENA" },
    { label: "ONU-BRIDGE", value: "ONU-BRIDGE" },
    { label: "SWITCH", value: "SWITCH" },
]

export default function Product({ navigation, route }) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            mac: "",
            tipo: "",
            marca: "",
            modelo: "",
        },
        onSubmit: values => {
            handlerSave(values)
        }
    })
    


    useEffect(() => {
        if (route.params) {
            const { data = "" } = route?.params;
            formik.setFieldValue("mac", VMasker.toPattern(data, "SS:SS:SS:SS:SS:SS"))
        }


    }, [route])

    const handlerSave = async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post("equipamentos/add", values);

            Alert.alert("Cadastrado com sucesso");

            formik.resetForm()

        } catch (error) {
            Alert.alert("ocorreu um erro")
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Select
                options={options}
                mode="outlined"
                onChangeText={formik.handleChange('tipo')}
                value={formik.values.tipo}
                style={{ marginBottom: 8 }}
                label="Tipo" />

            <TextInput
                mode="outlined"
                onChangeText={formik.handleChange('marca')}
                value={formik.values.marca}
                style={{ marginBottom: 8 }}
                label="Marca" />
            <TextInput
                mode="outlined"
                onChangeText={formik.handleChange('modelo')}
                value={formik.values.modelo}
                style={{ marginBottom: 8 }}
                label="Modelo" />
            <TextInput
                mode="outlined"
                style={{ marginBottom: 8 }}
                label="MAC"
                value={formik.values.mac}
                onChangeText={formik.handleChange('mac')}
                onTextInput={() => formik.setFieldValue("mac", VMasker.toPattern(formik.values.mac, "SS:SS:SS:SS:SS:SS")) }
                right={
                    <TextInput.Icon
                        onPress={() => navigation.push("Barcode")} name="barcode" />} />

            <Button
                loading={loading}
                onPress={formik.handleSubmit}
                mode="contained"
                labelStyle={{ color: "white", fontWeight: "bold" }}
                contentStyle={{ height: 55 }}
                style={styles.button}
            >SALVAR</Button>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    button: {
        marginTop: 20
    }
})