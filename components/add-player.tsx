import * as React from "react";
import { useState, useCallback } from "react";
import {
  Text,
  Button,
  TextInput,
  Dialog,
  Portal,
  ModalProps,
  ButtonProps,
  DialogProps,
} from "react-native-paper";
import {
  useScoreStore,
  // type Player,
} from "@/stores/scoreStore";
import { View } from "react-native";

export function AddPlayerButton({ children, ...props }: ButtonProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <AddPlayerDialog
      visible={visible}
      onDismiss={handleDismiss}
      dismissable={true}
    >
      <Button
        mode="contained"
        icon="account-plus"
        onPress={() => setVisible(true)}
        {...props}
      >
        {children}
      </Button>
    </AddPlayerDialog>
  );
}

export function AddPlayerDialog({
  children,
  visible,
  onDismiss,
  style,
  ...props
}: DialogProps) {
  const { addPlayer } = useScoreStore();
  const [playername, setPlayername] = useState("");

  const onDialogDismiss = useCallback(() => {
    console.log("onDialogDismiss ~ playername:", playername);
    if (playername.trim().length > 0) addPlayer(playername.trim());

    if (onDismiss) onDismiss();
  }, [addPlayer, playername, onDismiss]);

  return (
    <React.Fragment>
      {children}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onDialogDismiss}
          style={{
            position: "absolute",
            top: "10%",
            left: 0,
            right: 0,
          }}
          {...props}
        >
          <Dialog.Title>Add a player</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Player name"
              maxLength={6}
              onChangeText={(text) => setPlayername(text)}
              autoFocus={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View style={{ flexDirection: "row" }}>
              <Button mode="contained" onPress={onDialogDismiss}>
                Add
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button mode="text" onPress={onDismiss}>
                Cancel
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* <Portal>
        <Dialog
          visible={visible}
          {...props}
        >
          <Text variant="headlineMedium">Add a player</Text>
          <TextInput
            label="Player Name"
            mode="outlined"
            value={playername}
            onChangeText={setPlayername}
            inputMode="text"
            style={{ width: "100%", marginBottom: 16 }}
            autoFocus
          />
          <Button
            mode="contained"
            icon="account-plus"
            style={{ marginLeft: 8 }}
            onPress={() => handleSubmit()}
          >
            Add
          </Button>
        </Dialog>
      </Portal> */}
    </React.Fragment>
  );
}
