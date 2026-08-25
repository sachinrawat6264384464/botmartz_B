import os
from PIL import Image

src_dir = r"d:\botmartz3.0\botmartz_B\gallery"
out_dir = r"d:\botmartz3.0\botmartz_B\public\gallery"

os.makedirs(out_dir, exist_ok=True)

files = sorted([f for f in os.listdir(src_dir) if f.endswith(".png") or f.endswith(".jpg")])

print(f"Found {len(files)} files to compress in {src_dir}")

for idx, fname in enumerate(files, 1):
    src_path = os.path.join(src_dir, fname)
    out_name = f"gallery-{idx}.jpg"
    out_path = os.path.join(out_dir, out_name)
    
    with Image.open(src_path) as img:
        img = img.convert("RGB")
        # Resize to max 1280px width/height while maintaining aspect ratio
        img.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        
        # Binary search or quality iteration to get between 100KB and 200KB
        quality = 82
        img.save(out_path, "JPEG", quality=quality, optimize=True)
        size_kb = os.path.getsize(out_path) / 1024
        
        # Fine-tune quality if needed
        if size_kb > 220 and quality > 50:
            quality = 70
            img.save(out_path, "JPEG", quality=quality, optimize=True)
            size_kb = os.path.getsize(out_path) / 1024
        elif size_kb < 90 and quality < 95:
            # Scale slightly up in dimensions if too small
            w, h = img.size
            img_larger = img.resize((int(w * 1.25), int(h * 1.25)), Image.Resampling.LANCZOS)
            quality = 88
            img_larger.save(out_path, "JPEG", quality=quality, optimize=True)
            size_kb = os.path.getsize(out_path) / 1024
            
        print(f"[{idx}/12] {fname} -> {out_name}: {size_kb:.1f} KB ({img.size[0]}x{img.size[1]}px)")

print("All gallery images compressed successfully into public/gallery!")
