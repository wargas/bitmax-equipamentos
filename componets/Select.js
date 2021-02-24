import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';



export default function Select({ options = [], ...rest }) {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [value, setValue] = useState(options.value || "");

    const handlerSelect = () => {
        setVisible(false);
        rest.onChangeText(value)
        setSelected(options.find(option => option.value === value))
    }

    return (
        <View>
            <TextInput value={selected?.label} onFocus={() => setVisible(true)} {...rest} right={<TextInput.Icon onPress={() => setVisible(true)} name="chevron-down" />} />
            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Title>Selecione</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={setValue} value={value}>
                            {options.map(option => (
                                <TouchableOpacity onPress={() => setValue(option.value)} key={option.value}>
                                    <View style={{ paddingVertical: 6, flexDirection: "row", alignItems: "center" }} >
                                        <RadioButton value={option.value} />
                                        <Text>{option.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handlerSelect}>Ok</Button>
                        <Button onPress={() => setVisible(false)}>Cancelar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}