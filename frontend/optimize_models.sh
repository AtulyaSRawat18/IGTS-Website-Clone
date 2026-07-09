#!/usr/bin/env bash
# IGTS GLB optimization pass
# Run this from your `frontend/` directory, with Node + npm installed and
# real network access (I can't run this in my sandbox — no network there).
set -euo pipefail

MODELS_DIR="public/models"
OUT_DIR="public/models/optimized"
mkdir -p "$OUT_DIR"

echo "Installing gltf-transform CLI (one-time)..."
npm install --global @gltf-transform/cli

echo ""
echo "=== Before ==="
ls -lh "$MODELS_DIR"/*.glb

# --- environment.glb: 79MB, 41 textures, 213K tris ---------------------
# Problem here is mostly texture count/size, not geometry.
# resample: dedupe animation frames (harmless if none exist)
# prune: remove unused nodes/materials/accessors
# dedup: merge duplicate textures/materials (big win with 41 separate images)
# textureCompress: re-encode all textures as WebP at reasonable quality
# draco: compress geometry
# simplify: gentle geometry reduction as a safety net (spec wants <100K tris scene-wide)
echo ""
echo "=== Optimizing environment.glb ==="
gltf-transform optimize "$MODELS_DIR/environment.glb" "$OUT_DIR/environment.glb" \
  --compress draco \
  --texture-compress webp \
  --texture-size 1024x1024 \
  --simplify true \
  --simplify-error 0.001

# --- piece.glb: 13MB, 296K tris on ONE piece -----------------------------
# Problem here is almost entirely geometry. Simplify hard — a chess piece
# has no fine detail that needs 300K triangles; 15-20K is plenty even in
# close-up hero shots.
echo ""
echo "=== Optimizing piece.glb ==="
gltf-transform optimize "$MODELS_DIR/piece.glb" "$OUT_DIR/piece.glb" \
  --compress draco \
  --texture-compress webp \
  --texture-size 1024x1024 \
  --simplify true \
  --simplify-error 0.005 \
  --simplify-ratio 0.05

# --- knight.glb: already small, light pass only --------------------------
echo ""
echo "=== Optimizing knight.glb ==="
gltf-transform optimize "$MODELS_DIR/knight.glb" "$OUT_DIR/knight.glb" \
  --compress draco \
  --texture-compress webp

echo ""
echo "=== After ==="
ls -lh "$OUT_DIR"/*.glb

echo ""
echo "Inspect each file to sanity-check tri counts / texture sizes:"
echo "  gltf-transform inspect $OUT_DIR/environment.glb"
echo "  gltf-transform inspect $OUT_DIR/piece.glb"
echo ""
echo "If they look good, replace the originals in $MODELS_DIR and update"
echo "next.config.ts / drei's useGLTF calls if paths changed."
