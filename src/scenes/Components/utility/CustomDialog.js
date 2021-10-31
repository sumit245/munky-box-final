import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { Actions } from "react-native-router-flux";
import { clearAll } from "../../../services/user/getuser";

const CustomDialog = ({ title, text, showDialog, okHandler }) => {
  const [show, setShow] = React.useState(showDialog);
  const hideDialog = () => setShow(false);
  const done = () => {
    setShow(false);
    const response = clearAll();
    response.then(() => Actions.jump("auth"));
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
            <Button onPress={() => setShow(false)}>No</Button>
            <Button onPress={done}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;
