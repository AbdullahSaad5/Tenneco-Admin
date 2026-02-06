# 3D Coordinates Quick Reference Card

## 📐 XYZ Basics
- **X** = Left(-) / Right(+)
- **Y** = Down(-) / Up(+)
- **Z** = Away(-) / Toward(+)

---

## 🚗 Vehicle Configurations

| Field | Purpose | Typical Values |
|-------|---------|----------------|
| `scale` | Model size | `{1, 1, 1}` normal |
| `rotation` | Model angle | `{0, 0, 0}` no rotation |
| `cameraStart` | Initial camera | `{8, 4, 12}` far view |
| `cameraZoomTarget` | Zoomed camera | `{0, 0.9, 3.5}` close-up |
| `initialLookAtTarget` | Camera aim (start) | `{0, 0, 0}` center |
| `zoomLookAtTarget` | Camera aim (zoom) | `{1, 0, -4}` wheel area |
| `zoomIntensity` | Zoom strength | `1.0` normal |

---

## 🛠️ Brake Configurations

| Field | Purpose | Typical Values |
|-------|---------|----------------|
| `scale` | Model size | `{1, 1, 1}` normal |
| `rotation` | Model angle | `{0, 0, 0}` no rotation |
| `transitionScale` | Size during zoom | `0.2` (20%) |
| `viewerScale` | Size when zoomed | `0.2` (20%) |
| `explosionHotspot.position` | Explode button | `{0, 0.5, 0}` above brake |

---

## 📍 Hotspot Configurations

| Field | Purpose | Example |
|-------|---------|---------|
| `position` | Info point location | `{1, 1.1, 0}` caliper |
| | | `{-1, 3, 1}` rotor |
| | | `{0, 0.5, 2}` pad |

---

## 🎯 Common Coordinates by Vehicle Type

### Light Vehicles
```
cameraStart: { x: 8, y: 4, z: 12 }
cameraZoomTarget: { x: 0, y: 0.9, z: 3.5 }
```

### Commercial Vehicles
```
cameraStart: { x: 10, y: 5, z: 15 }
cameraZoomTarget: { x: 0.5, y: 1.1, z: 4 }
```

### Rail
```
cameraStart: { x: 12, y: 6, z: 18 }
cameraZoomTarget: { x: 0, y: 1, z: 4 }
```

---

## 🔄 Rotation Values (Radians)

| Degrees | Radians | Use Case |
|---------|---------|----------|
| 45° | 0.785 | Slight angle |
| 90° | 1.57 | Quarter turn |
| 180° | 3.14 | Turn around |
| 270° | 4.71 | 3/4 turn |

**Formula:** `radians = degrees × (3.14159 / 180)`

---

## ⚡ Quick Tips

1. **Camera Position Rules:**
   - Start position > Zoom position (farther → closer)
   - Higher Y = camera looks down
   - Larger Z = camera farther back

2. **Finding Hotspot Positions:**
   - Start with `{0, 0, 0}`
   - Adjust one axis at a time
   - Use 0.1 increments for precision

3. **Scale Guidelines:**
   - `1.0` = actual size
   - `0.2` = good for brake close-ups
   - Keep X, Y, Z equal for uniform scaling

4. **Coordinate System:**
   - `{0, 0, 0}` = center of world
   - Models are automatically centered
   - Adjust camera positions for best view

---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Model not visible | Check scale (should be ~1.0) and position (near 0,0,0) |
| Model upside down | Set rotation.x to `3.14` (180°) |
| Camera inside model | Increase cameraStart.z value |
| Hotspot not clickable | Adjust Y coordinate (move up/down) |
| Weird zoom animation | Ensure cameraZoomTarget < cameraStart (closer to model) |

---

## 📝 Editing in CMS

1. Navigate to **Vehicle/Brake/Hotspot Configurations**
2. Select the vehicle type (light, commercial, rail)
3. Scroll to the coordinate section
4. Edit X, Y, Z values
5. Save and refresh the 3D viewer to test

---

**Pro Tip:** Keep a notepad with working values for each vehicle type. Copy/paste when creating new configurations!
