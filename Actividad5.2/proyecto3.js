// scripts.js

// Declaramos un arreglo vacío llamado 'lista'
let lista = [];

// Referencias a los elementos del DOM
const form = document.getElementById('form-agregar');
const inputElemento = document.getElementById('input-elemento');
const contenedorLista = document.getElementById('contenedor-lista');
const mensajeError = document.getElementById('mensaje-error');
const btnEliminarPrimero = document.getElementById('btn-eliminar-primero');
const btnEliminarUltimo = document.getElementById('btn-eliminar-ultimo');
const btnOrdenar = document.getElementById('btn-ordenar');

// Función para mostrar la lista actualizada
function mostrarLista() {
    // Limpiamos el contenedor antes de mostrar la lista
    contenedorLista.innerHTML = '';
    if (lista.length === 0) {
        contenedorLista.innerHTML = '<em>La lista está vacía.</em>';
        return;
    }
    // Creamos una lista ordenada en HTML
    const ul = document.createElement('ul');
    lista.forEach((elemento, idx) => {
        const li = document.createElement('li');
        li.textContent = elemento;
        ul.appendChild(li);
    });
    contenedorLista.appendChild(ul);
}

// Manejamos el evento del formulario para agregar elementos
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir recarga de página

    const nuevoElemento = inputElemento.value.trim();

    if (nuevoElemento === '') {
        mensajeError.textContent = 'No puedes agregar un texto vacío.';
        return;
    }

    lista.push(nuevoElemento); // Agrega el elemento al final (push)
    mensajeError.textContent = '';
    inputElemento.value = ''; // Limpiar input
    mostrarLista(); // Actualizar lista
});

// Botón para eliminar el primer elemento (shift)
btnEliminarPrimero.addEventListener('click', function () {
    if (lista.length > 0) {
        lista.shift();
        mensajeError.textContent = '';
        mostrarLista();
    } else {
        mensajeError.textContent = 'La lista ya está vacía.';
    }
});

// Botón para eliminar el último elemento (pop)
btnEliminarUltimo.addEventListener('click', function () {
    if (lista.length > 0) {
        lista.pop();
        mensajeError.textContent = '';
        mostrarLista();
    } else {
        mensajeError.textContent = 'La lista ya está vacía.';
    }
});

// Botón para ordenar la lista alfabéticamente (sort)
btnOrdenar.addEventListener('click', function () {
    if (lista.length > 0) {
        lista.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        mensajeError.textContent = '';
        mostrarLista();
    } else {
        mensajeError.textContent = 'No hay elementos para ordenar.';
    }
});

// Mostrar lista al inicio
mostrarLista();
