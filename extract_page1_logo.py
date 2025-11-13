import fitz  # PyMuPDF
import os

# Ruta al PDF
pdf_path = r"c:\Users\jamar\delavalle\docs\Brochure De lavalle Asesorias noviembre 2025.pdf"
output_dir = r"c:\Users\jamar\delavalle\assets\img"

# Crear directorio de salida si no existe
os.makedirs(output_dir, exist_ok=True)

print(f"Extrayendo logo de la página 1 del PDF...")

# Abrir el PDF
doc = fitz.open(pdf_path)

# Procesar SOLO la página 1 (índice 0)
page = doc[0]
print(f"\nProcesando página 1...")

# Obtener todas las imágenes de la página
image_list = page.get_images(full=True)
print(f"  Encontradas {len(image_list)} imágenes en la página 1")

# Extraer cada imagen
for img_index, img in enumerate(image_list, start=1):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    image_size = len(image_bytes)
    
    # Guardar la imagen
    image_filename = f"page1_img_{img_index:02d}.{image_ext}"
    image_path = os.path.join(output_dir, image_filename)
    
    with open(image_path, "wb") as img_file:
        img_file.write(image_bytes)
    
    print(f"  Guardada: {image_filename} ({image_size} bytes)")

doc.close()
print(f"\n✓ Extracción completada de página 1")
print(f"  Las imágenes están en: {output_dir}")
