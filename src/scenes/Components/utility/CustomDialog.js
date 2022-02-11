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

const CustomDialog = ({
  title,
  text,
  showDialog,
  doneHandler,
  cancelHandler,
}) => {
  const [show, setShow] = React.useState(showDialog);
  const done = () => {
    doneHandler();
  };
  const cancel = () => {
    cancelHandler();
  };
  return (
    <Portal>
      <Dialog visible={show} onDismiss={cancelHandler} style={{ width: "80%" }}>
        <Dialog.Title style={{ textAlign: "center" }}>{title}</Dialog.Title>
        <Dialog.Content
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
          <Button onPress={cancel}>No</Button>
          <Button onPress={done}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
