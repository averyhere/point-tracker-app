import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet } from "react-native";
import { Portal, Surface, IconButton, useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
  WithSpringConfig,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface BottomDrawerProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  drawerHeight?: number;
  closeThreshold?: number;
  showCloseButton?: boolean;
  showDragHandle?: boolean;
  backdropOpacity?: number;
  springConfig?: WithSpringConfig;
}

export interface BottomDrawerRef {
  close: () => void;
  open: () => void;
}

const BottomDrawer = forwardRef<BottomDrawerRef, BottomDrawerProps>(
  (
    {
      children,
      visible,
      onClose,
      drawerHeight = 400,
      closeThreshold = 100,
      showCloseButton = true,
      showDragHandle = true,
      backdropOpacity = 0.5,
      springConfig = { damping: 20, stiffness: 100 },
    },
    ref,
  ) => {
    const theme = useTheme();
    const translateY = useSharedValue(drawerHeight);

    const close = useCallback(() => {
      translateY.value = withSpring(drawerHeight, springConfig, () => {
        runOnJS(onClose)();
      });
    }, [drawerHeight, onClose, springConfig, translateY]);

    const open = useCallback(() => {
      translateY.value = withSpring(0, springConfig);
    }, [springConfig, translateY]);

    useImperativeHandle(ref, () => ({
      close,
      open,
    }));

    useEffect(() => {
      if (visible) {
        open();
      } else {
        translateY.value = drawerHeight;
      }
    }, [visible, open, drawerHeight, translateY]);

    const gestureHandler =
      useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: (_, context) => {
          (context as any).startY = translateY.value;
        },
        onActive: (event, context) => {
          const newTranslateY = (context as any).startY + event.translationY;
          translateY.value = Math.max(0, newTranslateY);
        },
        onFinish: (event, context) => {
          const newTranslateY = (context as any).startY + event.translationY;
          translateY.value = Math.max(0, newTranslateY);

          const shouldClose =
            event.translationY > closeThreshold || event.velocityY > 500;

          if (shouldClose) {
            runOnJS(close)();
          } else {
            translateY.value = withSpring(0, springConfig);
          }
        },
        onEnd: (event) => {
          const shouldClose =
            event.translationY > closeThreshold || event.velocityY > 500;

          if (shouldClose) {
            runOnJS(close)();
          } else {
            translateY.value = withSpring(0, springConfig);
          }
        },
      });

    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateY.value,
        [0, drawerHeight],
        [1, 0],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{ translateY: translateY.value }],
        opacity,
      };
    });

    const backdropStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateY.value,
        [0, drawerHeight],
        [backdropOpacity, 0],
        Extrapolate.CLAMP,
      );

      return {
        opacity,
      };
    });

    const handleBackdropPress = useCallback(() => {
      close();
    }, [close]);

    if (!visible) return null;

    return (
      <Portal>
        <View style={styles.container}>
          {/* Backdrop */}
          <Animated.View
            style={[styles.backdrop, backdropStyle]}
            onTouchStart={handleBackdropPress}
          />

          {/* Drawer */}
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.drawer, animatedStyle]}>
              <Surface style={styles.surface} elevation={3}>
                {/* Header with drag handle and close button */}
                <View style={styles.header}>
                  {showDragHandle && (
                    <View
                      style={[
                        styles.dragHandle,
                        { backgroundColor: theme.colors.outline },
                      ]}
                    />
                  )}
                  {showCloseButton && (
                    <IconButton
                      icon="close"
                      size={24}
                      onPress={close}
                      style={styles.closeButton}
                    />
                  )}
                </View>

                {/* Content */}
                <View style={styles.content}>{children}</View>
              </Surface>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  drawer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 16,
  },
  surface: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginInline: "auto",
    opacity: 0.5,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 8,
  },
  content: {
    flex: 1,
  },
});

BottomDrawer.displayName = "BottomDrawer";

export default BottomDrawer;
