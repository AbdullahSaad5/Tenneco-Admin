# 3D Coordinates Guide for Tenneco Viewer
**A Simple Guide to Understanding XYZ Coordinates**

---

## 📐 What Are XYZ Coordinates?

Imagine you're in a room:
- **X** = Left/Right (negative = left, positive = right)
- **Y** = Up/Down (negative = down, positive = up)
- **Z** = Forward/Backward (negative = away from you, positive = toward you)

**Example:** If something is at position `X: 2, Y: 1, Z: -3`, it means:
- 2 units to the right
- 1 unit up
- 3 units away from you

> **Tip:** Think of XYZ like giving directions: "Go 2 steps right, 1 step up, 3 steps back"

---

## 🚗 Vehicle Configuration Coordinates

Vehicle configurations control how vehicles appear and where the camera looks when viewing them.

### 1. **Scale** (How big is the vehicle?)
Controls the size of the vehicle model.

```
scale: { x: 1, y: 1, z: 1 }
```

- `1` = normal size
- `2` = twice as big
- `0.5` = half the size
- Usually all three values are the same (e.g., `1, 1, 1`)

**Use Case:** Make a large truck smaller or a small car bigger to fit nicely on screen.

---

### 2. **Rotation** (Which way is it facing?)
Controls which direction the vehicle is facing (in radians, not degrees).

```
rotation: { x: 0, y: 0, z: 0 }
```

- `0` = no rotation
- `1.57` = rotated 90 degrees (approximately)
- `3.14` = rotated 180 degrees (approximately)

**Common Values:**
- `x`: tilts forward/backward (like nodding yes)
- `y`: spins left/right (like shaking no)
- `z`: rolls side to side (like tilting your head)

**Use Case:** Rotate the vehicle so it faces the camera at a nice angle.

---

### 3. **Camera Start** (Where does the camera begin?)
The initial position of the camera when you first view the vehicle.

```
cameraStart: { x: 8, y: 4, z: 12 }
```

- Creates the "far away" view of the whole vehicle
- Higher Y value = camera is higher up
- Larger Z value = camera is farther back

**Example:**
- `x: 8` = camera is to the right
- `y: 4` = camera is looking down from above
- `z: 12` = camera is far back

**Use Case:** Set a nice angle to show the whole vehicle at first glance.

---

### 4. **Camera Zoom Target** (Where does the camera go when zooming?)
The camera position when zoomed in on the brake/wheel area.

```
cameraZoomTarget: { x: 0, y: 0.9, z: 3.5 }
```

- Camera moves closer to see the brake details
- Usually has smaller values than Camera Start (closer to vehicle)

**Use Case:** Position the camera at the perfect distance to see the brake system clearly.

---

### 7. **Zoom Configuration**

#### **Initial Look-At Target** (What does the camera look at initially?)
```
initialLookAtTarget: { x: 0, y: 0, z: 0 }
```

- The point in space the camera is aimed at when first loaded
- Usually points at the center of the vehicle

---

#### **Zoom Look-At Target** (What does the camera look at when zoomed?)
```
zoomLookAtTarget: { x: 1, y: 0, z: -4 }
```

- The point the camera aims at when zoomed in
- Usually points at the wheel/brake area

---

#### **Zoom Intensity** (How strong is the zoom?)
```
zoomIntensity: 1.0
```

- `1.0` = normal zoom
- `2.0` = zoom in more
- `0.5` = zoom in less

---

## 🛠️ Brake Configuration Coordinates

Brake configurations control how brake assemblies appear in the close-up view.

### 1. **Scale** (How big is the brake?)
```
scale: { x: 1, y: 1, z: 1 }
```

Same as vehicle scale. Usually `1, 1, 1` for actual size.

---

### 2. **Rotation** (Which way is it facing?)
```
rotation: { x: 0, y: 0, z: 0 }
```

Controls the angle of the brake assembly. Usually `0, 0, 0` unless you need to rotate it.

---

### 3. **Scale Config**

#### **Transition Scale** (How big during the zoom animation?)
```
transitionScale: 0.2
```

The size of the brake while the camera is moving from vehicle to brake view.
- `0.2` = 20% of actual size during transition
- Makes the animation look smooth

---

#### **Viewer Scale** (How big in the final view?)
```
viewerScale: 0.2
```

The final size of the brake when fully zoomed in.
- Usually the same as transition scale
- `0.2` works well for most brake models

---

### 4. **Explosion Hotspot Position** (Where is the "explode view" button?)
```
explosionHotspot.position: { x: 0, y: 0.5, z: 0 }
```

The location of the interactive hotspot that triggers the exploded view.
- Usually placed slightly above the brake (`y: 0.5`)
- Centered horizontally (`x: 0, z: 0`)

**Use Case:** A clickable spot that shows all brake parts separated.

---

## 📍 Hotspot Configuration Coordinates

Hotspots are interactive points on the brake that show information when clicked.

### **Position** (Where is this hotspot?)
```
position: { x: 1, y: 1.1, z: 0 }
```

The exact location of an information hotspot in 3D space on the brake model.

**Examples:**
- **Brake Caliper**: `x: 1, y: 1.1, z: 0` (right side, upper area)
- **Brake Rotor**: `x: -1, y: 3, z: 1` (left side, higher up, forward)
- **Brake Pad**: `x: 0, y: 0.5, z: 2` (center, slightly up, forward)

**How to Find These Values:**
1. Load the brake model in the 3D viewer
2. Identify where you want the hotspot
3. Use trial and error to adjust X, Y, Z until it's in the right spot

**Tips:**
- Start with all zeros: `x: 0, y: 0, z: 0`
- Adjust one coordinate at a time
- Small changes (0.1, 0.2) make small movements
- Large changes (1, 2) make big movements

---

## 🎯 Quick Reference Table

| Coordinate Type | What It Does | Example Values | Common Range |
|----------------|--------------|----------------|--------------|
| **Scale** | Makes model bigger/smaller | `1, 1, 1` (normal)<br>`0.5, 0.5, 0.5` (half size) | 0.1 - 3.0 |
| **Rotation** | Spins/tilts the model | `0, 0, 0` (no rotation)<br>`0, 1.57, 0` (90° turn) | 0 - 6.28 (0° - 360°) |
| **Position** | Moves the model | `0, 0, 0` (center)<br>`2, 1, -3` (right, up, back) | -10 to 10 |
| **Camera Start** | Where camera begins | `8, 4, 12` (far away view) | 5 - 20 |
| **Camera Zoom Target** | Where camera zooms to | `0, 0.9, 3.5` (close-up view) | 0 - 5 |
| **Tire Position** | Where the wheel is | `-1.5, 0.4, 1.5` (front left) | -5 to 5 |
| **Hotspot Position** | Where info point appears | `1, 1.1, 0` (on brake part) | -3 to 3 |

---

## 💡 Pro Tips

### For Vehicles:
1. **Camera Start should be far away** (large X, Y, Z values like `8, 4, 12`)
2. **Camera Zoom Target should be close** (small X, Y, Z values like `0, 1, 3`)
3. **Tire Position should match the actual wheel location** on the model

### For Brakes:
1. **Keep Position at `0, 0, 0`** and let the system center it automatically
2. **Use small Viewer Scale** (like `0.2`) to see details clearly
3. **Put Explosion Hotspot above the brake** (positive Y value)

### For Hotspots:
1. **Use trial and error** to find the perfect spot
2. **Adjust one coordinate at a time** (X, then Y, then Z)
3. **Keep values small** (usually between -3 and 3)
4. **Test each hotspot** to make sure it's visible and clickable

---

## 🔄 Rotation Cheat Sheet

Since rotation uses radians (not degrees), here's a conversion guide:

| Degrees | Radians | Description |
|---------|---------|-------------|
| 0° | 0 | No rotation |
| 45° | 0.785 | Slight turn |
| 90° | 1.57 | Quarter turn |
| 180° | 3.14 | Half turn |
| 270° | 4.71 | Three-quarter turn |
| 360° | 6.28 | Full turn |

**Formula:** Radians = Degrees × (π / 180)

---

## 📝 Example Configuration

Here's a complete example for a Light Vehicle:

```typescript
{
  // Vehicle is normal size
  scale: { x: 1, y: 1, z: 1 },

  // Vehicle faces forward (no rotation)
  rotation: { x: 0, y: 0, z: 0 },

  // Vehicle is centered in the world
  position: { x: 0, y: 0, z: 0 },

  // Wheel is on the front-left
  tirePosition: { x: -1.5, y: 0.4, z: 1.5 },

  // Camera starts far away, up and to the right
  cameraStart: { x: 8, y: 4, z: 12 },

  // Camera zooms to see the brake clearly
  cameraZoomTarget: { x: 0, y: 0.9, z: 3.5 },

  // Camera looks at center initially, then at the wheel
  zoomConfig: {
    initialLookAtTarget: { x: 0, y: 0, z: 0 },
    zoomLookAtTarget: { x: 1, y: 0, z: -4 },
    zoomIntensity: 1.0
  }
}
```

---

## ❓ Troubleshooting

### Problem: Can't see the model
**Solution:** Check if the scale is too small (`0.001`) or position is too far away (`100, 100, 100`)

### Problem: Model is upside down
**Solution:** Rotate on X-axis by `3.14` (180 degrees)

### Problem: Camera is inside the model
**Solution:** Increase Camera Start Z value (move camera farther back)

### Problem: Hotspot is not visible
**Solution:** Adjust the Y coordinate (move it up/down)

### Problem: Zoom animation looks weird
**Solution:** Make sure Camera Zoom Target is closer than Camera Start

---

## 📚 Additional Resources

- **Payload CMS Admin Panel**: Edit these values in the CMS interface
- **3D Viewer**: Test changes in real-time
- **Browser Console**: Check for error messages if something doesn't load

---

**Last Updated:** February 2026
**Version:** 1.0
