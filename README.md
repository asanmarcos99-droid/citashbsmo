# citas_publicas — Instrucciones rápidas

Pasos para probar localmente y resetear usuarios/datos.

Requisitos
- Python 3 (para servidor estático rápido).
- Navegador (Chrome/Edge/Firefox).

Iniciar servidor local (desde la carpeta del proyecto):

```bash
python -m http.server 8000 --directory "c:\Users\DANY\citas_publicas"
```

Abrir en el navegador:

http://localhost:8000/citas.html

Crear primer usuario (credencial inicial)
1. Ir a `⚙️ Configuración` → `Abrir Gestión de Usuarios`.
2. Click en "Crear / Editar Usuario" y completar `Usuario` y `Contraseña`.
3. Seleccionar rol `Administrador` y guardar. Tras guardar, el sistema hará login automático con ese usuario.

Resetear usuarios y datos (si necesitas empezar de nuevo)
- Abre la consola del navegador (F12) y pega las siguientes líneas, luego recarga la página:

```javascript
localStorage.removeItem('citas_publicas_users_v1');
localStorage.removeItem('citas_publicas_data_v1');
sessionStorage.removeItem('citas_current_user');
location.reload();
```

Probar la función de Receta Médica
1. En la barra superior, clicar `💊 Receta Médica`.
2. En la modal: escribir o seleccionar paciente (autocompleta por citas guardadas), seleccionar médico, añadir medicamentos con `+ Añadir` (nombre, dosis, frecuencia) y completar notas.
3. Click `Generar Receta` y luego `🖨️ Imprimir` para ver la vista imprimible.

Depuración
- Si algo no funciona, abre la consola del navegador (F12 → Console) y copia/pega aquí cualquier error. También puedes revisar `Application` → `Local Storage` para verificar las claves `citas_publicas_users_v1` y `citas_publicas_data_v1`.

Notas
- Usuarios y datos se guardan en `localStorage` (cliente); no hay backend por defecto.
- Si quieres que cree una función para exportar/importar recetas o guardarlas en una API, dime y lo implemento.
