import * as React from "react";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { Actions } from "react-native-router-flux";
const SuccessDialog = ({ title, text, showDialog, okHandler }) => {
  const [show, setShow] = React.useState(showDialog);
  const hideDialog = () => setShow(false);
  const done = () => {
    setShow(false);
    Actions.pop();
  };
  return (
    <Provider>
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={done}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default SuccessDialog;
