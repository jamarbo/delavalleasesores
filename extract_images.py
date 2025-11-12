import fitz  # PyMuPDF
import os
from pathlib import Path

# Configuración
pdf_path = r"c:\Users\jamar\delavalle\docs\Brochure De lavalle Asesorias noviembre 2025.pdf"
output_dir = r"c:\Users\jamar\delavalle\assets\img\team"

# Crear directorio si no existe
Path(output_dir).mkdir(parents=True, exist_ok=True)

# Abrir el PDF
pdf_document = fitz.open(pdf_path)

print(f"Procesando PDF: {pdf_path}")
print(f"Total de páginas: {pdf_document.page_count}")

# Contador de imágenes
image_count = 0

# Iterar sobre cada página
for page_num in range(len(pdf_document)):
    page = pdf_document[page_num]
    print(f"\nProcesando página {page_num + 1}...")
    
    # Obtener lista de imágenes en la página
    image_list = page.get_images(full=True)
    
    if image_list:
        print(f"  Encontradas {len(image_list)} imágenes")
    
    # Extraer cada imagen
    for img_index, img in enumerate(image_list):
        xref = img[0]
        
        # Extraer la imagen
        base_image = pdf_document.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Guardar la imagen
        image_count += 1
        image_filename = f"team_{image_count:02d}.{image_ext}"
        image_path = os.path.join(output_dir, image_filename)
        
        with open(image_path, "wb") as image_file:
            image_file.write(image_bytes)
        
        print(f"  Guardada: {image_filename} ({len(image_bytes)} bytes)")

pdf_document.close()

print(f"\n✓ Extracción completada: {image_count} imágenes guardadas en {output_dir}")
