import { useState, Text } from 'react';
import { Button, Checkbox, Modal, PaperProvider, Portal } from 'react-native-paper';

export default function ModalDescription() {
    const [visible, setVisible] = useState(false);


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
        </Portal>
    )
}