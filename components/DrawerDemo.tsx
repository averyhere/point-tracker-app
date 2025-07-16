import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card, Switch } from "react-native-paper";
import { BottomDrawer, BottomDrawerRef } from "./drawer";

export function DrawerDemo() {
  const [showSimpleDrawer, setShowSimpleDrawer] = useState(false);
  const [showAdvancedDrawer, setShowAdvancedDrawer] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [showDragHandle, setShowDragHandle] = useState(true);

  const advancedDrawerRef = useRef<BottomDrawerRef>(null);

  const handleSimpleDrawerClose = () => {
    setShowSimpleDrawer(false);
  };

  const handleAdvancedDrawerClose = () => {
    setShowAdvancedDrawer(false);
  };

  const openAdvancedDrawer = () => {
    setShowAdvancedDrawer(true);
  };

  const closeAdvancedDrawerProgrammatically = () => {
    advancedDrawerRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Bottom Drawer Demo
      </Text>

      <Card style={styles.card}>
        <Card.Title title="Simple Drawer" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.description}>
            Basic drawer with default settings
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowSimpleDrawer(true)}
            style={styles.button}
          >
            Open Simple Drawer
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Advanced Drawer" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.description}>
            Customizable drawer with programmatic controls
          </Text>

          <View style={styles.switchContainer}>
            <Text>Show Close Button</Text>
            <Switch
              value={showCloseButton}
              onValueChange={setShowCloseButton}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text>Show Drag Handle</Text>
            <Switch value={showDragHandle} onValueChange={setShowDragHandle} />
          </View>

          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={openAdvancedDrawer}
              style={styles.button}
            >
              Open Advanced Drawer
            </Button>
            <Button
              mode="outlined"
              onPress={closeAdvancedDrawerProgrammatically}
              style={styles.button}
            >
              Close Programmatically
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Simple Drawer */}
      <BottomDrawer
        visible={showSimpleDrawer}
        onClose={handleSimpleDrawerClose}
        drawerHeight={300}
      >
        <View style={styles.drawerContent}>
          <Text variant="headlineSmall" style={styles.drawerTitle}>
            Simple Drawer
          </Text>
          <Text variant="bodyMedium" style={styles.drawerDescription}>
            This is a simple drawer with default settings. You can:
          </Text>
          <Text variant="bodyMedium">• Drag down to close</Text>
          <Text variant="bodyMedium">• Tap the close button</Text>
          <Text variant="bodyMedium">• Tap the backdrop</Text>

          <Button
            mode="contained"
            onPress={handleSimpleDrawerClose}
            style={styles.drawerButton}
          >
            Close Drawer
          </Button>
        </View>
      </BottomDrawer>

      {/* Advanced Drawer */}
      <BottomDrawer
        ref={advancedDrawerRef}
        visible={showAdvancedDrawer}
        onClose={handleAdvancedDrawerClose}
        drawerHeight={400}
        closeThreshold={60}
        showCloseButton={showCloseButton}
        showDragHandle={showDragHandle}
        backdropOpacity={0.7}
        springConfig={{ damping: 25, stiffness: 120 }}
      >
        <View style={styles.drawerContent}>
          <Text variant="headlineSmall" style={styles.drawerTitle}>
            Advanced Drawer
          </Text>
          <Text variant="bodyMedium" style={styles.drawerDescription}>
            This drawer has customizable options:
          </Text>
          <Text variant="bodyMedium">• Custom height (400px)</Text>
          <Text variant="bodyMedium">• Lower close threshold (60px)</Text>
          <Text variant="bodyMedium">• Higher backdrop opacity (0.7)</Text>
          <Text variant="bodyMedium">• Custom spring animation</Text>
          <Text variant="bodyMedium">• Configurable UI elements</Text>

          <View style={styles.drawerButtonRow}>
            <Button
              mode="contained"
              onPress={handleAdvancedDrawerClose}
              style={styles.drawerButton}
            >
              Close Drawer
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                // Demo of programmatic control
                advancedDrawerRef.current?.close();
              }}
              style={styles.drawerButton}
            >
              Close via Ref
            </Button>
          </View>
        </View>
      </BottomDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    marginTop: 8,
  },
  drawerContent: {
    padding: 16,
  },
  drawerTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  drawerDescription: {
    marginBottom: 12,
  },
  drawerButton: {
    marginTop: 16,
    flex: 1,
  },
  drawerButtonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
});
