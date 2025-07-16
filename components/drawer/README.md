# BottomDrawer Component

A smooth, customizable bottom drawer component for React Native with drag-to-close functionality and programmatic controls.

## Features

- 🎯 Smooth drag-to-close gesture handling
- 🎨 Customizable appearance and behavior
- 🔧 Programmatic open/close controls
- 📱 Responsive design with configurable height
- 🎭 Backdrop with customizable opacity
- 🎪 Spring animations with configurable parameters
- 🎛️ Optional close button and drag handle
- 🔒 TypeScript support with proper type definitions

## Installation

The component uses React Native Reanimated and React Native Gesture Handler, which should already be installed in your project.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BottomDrawer } from './components/drawer';

export function MyComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button title="Open Drawer" onPress={() => setVisible(true)} />
      
      <BottomDrawer
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text>Drawer Content</Text>
        </View>
      </BottomDrawer>
    </View>
  );
}
```

## Advanced Usage

```tsx
import React, { useState, useRef } from 'react';
import { BottomDrawer, BottomDrawerRef } from './components/drawer';

export function AdvancedExample() {
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<BottomDrawerRef>(null);

  const closeDrawerProgrammatically = () => {
    drawerRef.current?.close();
  };

  return (
    <BottomDrawer
      ref={drawerRef}
      visible={visible}
      onClose={() => setVisible(false)}
      drawerHeight={400}
      closeThreshold={80}
      showCloseButton={true}
      showDragHandle={true}
      backdropOpacity={0.7}
      springConfig={{ damping: 25, stiffness: 120 }}
    >
      <View style={{ padding: 20 }}>
        <Text>Advanced Drawer Content</Text>
        <Button 
          title="Close Programmatically" 
          onPress={closeDrawerProgrammatically} 
        />
      </View>
    </BottomDrawer>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Content to display inside the drawer |
| `visible` | `boolean` | **Required** | Whether the drawer is visible |
| `onClose` | `() => void` | **Required** | Callback when drawer should close |
| `drawerHeight` | `number` | `400` | Height of the drawer in pixels |
| `closeThreshold` | `number` | `100` | Distance to drag before closing (px) |
| `showCloseButton` | `boolean` | `true` | Whether to show close button |
| `showDragHandle` | `boolean` | `true` | Whether to show drag handle |
| `backdropOpacity` | `number` | `0.5` | Opacity of the backdrop (0-1) |
| `springConfig` | `WithSpringConfig` | `{ damping: 20, stiffness: 100 }` | Spring animation configuration |

## Ref Methods

The component exposes these methods via ref:

| Method | Description |
|--------|-------------|
| `close()` | Programmatically close the drawer |
| `open()` | Programmatically open the drawer |

## Usage Examples

### Score Controls Integration

```tsx
import { BottomDrawer } from './components/drawer';

export function ScoreControls() {
  const { pointer, clearPointer } = useScoreStore();
  
  return (
    <BottomDrawer
      visible={!!pointer}
      onClose={clearPointer}
      drawerHeight={350}
      closeThreshold={80}
    >
      {/* Your score control content */}
    </BottomDrawer>
  );
}
```

### Settings Panel

```tsx
export function SettingsPanel() {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <BottomDrawer
      visible={showSettings}
      onClose={() => setShowSettings(false)}
      drawerHeight={500}
      showCloseButton={true}
      showDragHandle={false}
      backdropOpacity={0.8}
    >
      <SettingsContent />
    </BottomDrawer>
  );
}
```

## Gesture Behavior

- **Drag Down**: Drag the drawer down to close it
- **Velocity**: Fast downward swipe (>500px/s) will close regardless of distance
- **Threshold**: Drag beyond `closeThreshold` pixels to close
- **Backdrop Tap**: Tap the backdrop to close the drawer
- **Close Button**: Optional close button in the top-right corner

## Animation Configuration

The drawer uses React Native Reanimated's spring animation. You can customize the spring behavior:

```tsx
<BottomDrawer
  springConfig={{
    damping: 20,      // Higher = less bouncy
    stiffness: 100,   // Higher = faster animation
    mass: 1,          // Higher = more inertia
  }}
>
```

## Styling

The drawer uses React Native Paper's `Surface` component and follows Material Design principles. The drag handle and close button automatically adapt to your theme.

## Performance

- Uses React Native Reanimated for 60fps animations
- Efficient gesture handling with minimal re-renders
- Optimized for smooth performance on both iOS and Android

## Best Practices

1. **Always provide `onClose`**: Essential for proper state management
2. **Use reasonable heights**: Keep `drawerHeight` between 200-600px for best UX
3. **Adjust close threshold**: Lower values (50-80px) for sensitive closing
4. **Consider backdrop opacity**: 0.5-0.7 works well for most cases
5. **Test on devices**: Gesture behavior can vary between devices

## Troubleshooting

**Drawer not opening**: Ensure `visible` prop is `true` and component is inside a view with proper dimensions.

**Gestures not working**: Make sure React Native Gesture Handler is properly installed and configured.

**TypeScript errors**: Import `BottomDrawerRef` type for ref usage.

**Performance issues**: Avoid heavy components inside the drawer content and use `React.memo` if needed.