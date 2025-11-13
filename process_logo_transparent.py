from PIL import Image
import numpy as np

# Cargar la imagen
img = Image.open('assets/img/page1_img_01.png')

# Convertir a RGBA si no lo está
img = img.convert('RGBA')

# Obtener los datos de la imagen
data = np.array(img)

# Definir el rango de colores naranjas (en RGB)
# Naranja típicamente tiene: R alto, G medio-alto, B bajo
orange_lower = np.array([180, 80, 0, 0])  # R, G, B, A mínimos
orange_upper = np.array([255, 180, 100, 255])  # R, G, B, A máximos

# Crear máscara para colores naranjas
mask = (data[:, :, 0] >= orange_lower[0]) & (data[:, :, 0] <= orange_upper[0]) & \
       (data[:, :, 1] >= orange_lower[1]) & (data[:, :, 1] <= orange_upper[1]) & \
       (data[:, :, 2] >= orange_lower[2]) & (data[:, :, 2] <= orange_upper[2])

# Crear nueva imagen con fondo transparente
new_data = data.copy()

# Hacer transparente todo lo que NO es naranja
new_data[~mask, 3] = 0

# También hacer transparentes los píxeles blancos y muy claros
white_mask = (data[:, :, 0] > 200) & (data[:, :, 1] > 200) & (data[:, :, 2] > 200)
new_data[white_mask, 3] = 0

# Crear la nueva imagen
result = Image.fromarray(new_data, 'RGBA')

# Guardar
result.save('assets/img/logo-banner.png')
result.save('assets/img/logo-delavalle.png')

print("Logo procesado con fondo transparente y solo contorno naranja")
print(f"Tamaño: {result.size}")
