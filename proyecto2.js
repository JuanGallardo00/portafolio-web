class Producto {
    #nombre;
    #precio;
    #categoria;

    constructor(nombre, precio, categoria) {
        this.#nombre = nombre;
        this.#precio = precio;
        this.#categoria = categoria;
    }

    get nombre() {
        return this.#nombre;
    }

    get precio() {
        return this.#precio;
    }

    get categoria() {
        return this.#categoria;
    }

    calcularImpuesto() {
        // Impuesto general del 10%
        return +(this.#precio * 0.10).toFixed(2);
    }

    mostrarInfo() {
        return `
            <strong>${this.nombre}</strong><br>
            Precio: $${this.precio.toFixed(2)}<br>
            <em>Categoría: ${this.categoria}</em><br>
            <span style="color:firebrick;">Impuesto (10%): $${this.calcularImpuesto()}</span><br>
            Precio Final: $${(this.precio + this.calcularImpuesto()).toFixed(2)}<br>
        `;
    }
}

class Electronicos extends Producto {
    constructor(nombre, precio, marca, modelo) {
        super(nombre, precio, "Electrónicos");
        this.marca = marca;
        this.modelo = modelo;
    }

    mostrarInfo() {
        return super.mostrarInfo() + `
            Marca: ${this.marca}<br>
            Modelo: ${this.modelo}
        `;
    }
}

class Ropa extends Producto {
    constructor(nombre, precio, talla, material) {
        super(nombre, precio, "Ropa");
        this.talla = talla;
        this.material = material;
    }

    mostrarInfo() {
        return super.mostrarInfo() + `
            Talla: ${this.talla}<br>
            Material: ${this.material}
        `;
    }
}

class Alimentos extends Producto {
    constructor(nombre, precio, caducidad, organico) {
        super(nombre, precio, "Alimentos");
        this.caducidad = caducidad;
        this.organico = organico;
    }

    calcularImpuesto() {
        // Sin impuesto si es orgánico
        return this.organico ? 0 : +(this.precio * 0.05).toFixed(2);
    }

    mostrarInfo() {
        return super.mostrarInfo() + `
            Fecha de Caducidad: ${this.caducidad}<br>
            Orgánico: ${this.organico ? 'Sí' : 'No'}
        `;
    }
}
