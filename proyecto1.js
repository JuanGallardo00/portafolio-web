document.getElementById('formProducto').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    const mensajeDiv = document.getElementById('mensaje');

    try {
        // Validaciones
        if (!nombre || !cantidad || !precio) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if (isNaN(cantidad) || isNaN(precio) || cantidad <= 0 || precio <= 0) {
            throw new Error("Cantidad y precio deben ser números mayores a 0.");
        }

        // Si todo está bien, preparar datos
        const linea = `${nombre},${cantidad},${precio}\n`;

        // Descargar como archivo .txt
        const blob = new Blob([linea], { type: 'text/plain' });
        const link = document.createElement('a');
        link.download = "productos.txt";
        link.href = URL.createObjectURL(blob);
        link.click();

        mensajeDiv.innerHTML = "<span class='success'>Producto guardado (descargado) correctamente.</span>";
        document.getElementById('formProducto').reset();
    } catch (err) {
        mensajeDiv.innerHTML = `<span class='error'>${err.message}</span>`;
    }
});

// Leer archivo .txt (input file)
function leerProductos() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';

    input.onchange = e => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = function (ev) {
            mostrarTabla(ev.target.result);
        };
        lector.readAsText(archivo);
    };

    input.click();
}

function mostrarTabla(texto) {
    const tbody = document.getElementById('tablaProductos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    const lineas = texto.split('\n').filter(l => l.trim() !== '');
    for (const linea of lineas) {
        const [nombre, cantidad, precio] = linea.split(',');
        if (nombre && cantidad && precio) {
            const fila = `<tr>
                <td>${nombre}</td>
                <td>${cantidad}</td>
                <td>${precio}</td>
            </tr>`;
            tbody.innerHTML += fila;
        }
    }
}
