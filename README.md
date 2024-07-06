# React + TypeScript + Vite



# Api_react

Este proyecto es una aplicación de React que muestra una tabla de usuarios obtenidos de una API. Los usuarios se pueden filtrar, editar y eliminar, y se puede personalizar la vista de la tabla seleccionando las columnas a mostrar.

## Características

- **Cargar Usuarios**: Los usuarios se cargan desde la API `https://randomuser.me/api/?results=10`.
- **Filtrar Usuarios**: Filtrar usuarios por país, correo electrónico y nombre.
- **Editar Usuarios**: Editar la información de los usuarios.
- **Eliminar Usuarios**: Eliminar usuarios con confirmación.
- **Seleccionar Columnas**: Personalizar las columnas visibles en la tabla.
- **Vista Compacta y Expandida**: Alternar entre una vista compacta y una expandida de la tabla.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/api-react.git
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd api-react
   ```
3. Instala Vite y las dependencias del proyecto:
   ```sh
   npm install
   ```

4. Instala las dependencias adicionales:
   ```sh
   npm install axios @mui/material @emotion/react @emotion/styled sweetalert2 formik
   ```

## Uso

1. Inicia la aplicación:
   ```sh
   npm run dev
   ```
2. Abre tu navegador y visita `http://localhost:5173`.

## Componentes

### UserTable

El componente principal que maneja la lógica y la representación de la tabla de usuarios.

#### Estados

- `users`: Lista de todos los usuarios.
- `filteredUsers`: Lista de usuarios filtrados.
- `compactView`: Booleano para alternar entre vista compacta y expandida.
- `selectedColumns`: Columnas seleccionadas para mostrar en la vista compacta.
- `filterModalOpen`: Booleano para controlar la visibilidad del modal de filtros.
- `editModalOpen`: Booleano para controlar la visibilidad del modal de edición.
- `columnModalOpen`: Booleano para controlar la visibilidad del modal de selección de columnas.
- `currentUser`: Usuario actualmente seleccionado para editar.
- `loading`: Booleano para indicar si los datos están siendo cargados.
- `error`: Mensaje de error en caso de que la carga de datos falle.

#### Funciones

- `handleDelete`: Elimina un usuario después de confirmar la acción.
- `handleEdit`: Abre el modal de edición para el usuario seleccionado.
- `handleSave`: Guarda los cambios realizados a un usuario.
- `handleFilter`: Filtra la lista de usuarios según los criterios proporcionados.
- `handleColumnChange`: Actualiza las columnas seleccionadas para mostrar en la vista compacta.

### Componentes Auxiliares

- `UserRow`: Representa una fila de usuario en la tabla.
- `EditUserModal`: Modal para editar la información de un usuario.
- `ColumnSelectorModal`: Modal para seleccionar las columnas a mostrar en la tabla.
- `FilterModal`: Modal para filtrar usuarios.

## Dependencias

- `axios`: Para realizar solicitudes HTTP a la API.
- `@mui/material`: Para componentes de la interfaz de usuario.
- `@emotion/react`: Necesario para el funcionamiento de MUI.
- `@emotion/styled`: Necesario para el funcionamiento de MUI.
- `sweetalert2`: Para mostrar alertas y confirmaciones.
- `formik`: Para la gestión de formularios.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un fork del repositorio y envía un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---
