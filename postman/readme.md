## Postman

Testea la API directamente sin necesidad del frontend.

**Importar la colección:**
1. Abrir Postman
2. Click en **Import** → seleccionar `postman/chatbot.collection.json`

**Crear el entorno:**
1. Ir a **Environments** → **+**
2. Nombrarlo `fitnessapp local`
3. Agregar la variable:

| Variable   | Value                    |
|------------|--------------------------|
| `base_url` | `http://localhost:4000`  |