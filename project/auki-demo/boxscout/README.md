# Boxscout

Boxscout is a simple Three.js game loaded in the browser. It serves as a reference application for the Auki SDK — a minimal 3D environment where players move through a scene, their poses are written to the SDK's Pose Log every frame, and other players' purchased pose data is rendered as markers in the scene.

Boxscout demonstrates the core SDK loop: generate poses, exchange them across domains via the protocol, and render the results.

## Planned features

- 3D room with colored boxes and flat floor
- WASD + mouse-look camera controls (pointer lock)
- Camera pose written to SDK Pose Log every frame
- Coordinate convention selection on landing screen
- Other players' converted poses rendered as colored markers
- Markers fade to signal staleness
