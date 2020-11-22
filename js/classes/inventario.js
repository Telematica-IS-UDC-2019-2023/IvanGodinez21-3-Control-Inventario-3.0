import Producto from './producto.js';
export default class Inventario {
    /**
     * @param {object} lista
     */
    constructor() {
        this.inicio = null;
    }
    agregarProducto(producto, productoNuevo) {
        if (this.inicio == null) {
            this.inicio = producto;
        } else {
            let aux = this.inicio;
            while (aux.siguiente != null) {
                aux = aux.siguiente;
            }
            aux.siguiente = productoNuevo;
            aux.siguiente.anterior = aux;
        }
    }
    eliminarProducto(producto) {
        let aux = this.inicio;
        if (this.inicio != null) {
            if (this.inicio.codigo == producto.codigo) {
                this.inicio = this.inicio.siguiente;
                if (this.inicio != null) {
                    this.inicio.anterior = null;
                }
                return new Producto(aux.codigo, aux.nombre, aux.descripcion, aux.costo, aux.total, aux.siguiente, aux.anterior);
            } else {
                try {
                    while (aux.siguiente.codigo != producto.codigo) {
                        aux = aux.siguiente;
                    }
                    if (aux.siguiente.codigo == producto.codigo) {
                        var found = new Producto(aux.siguiente.codigo, aux.siguiente.nombre, aux.siguiente.descripcion, aux.siguiente.cantidad, aux.siguiente.costo, aux.siguiente.total, aux.siguiente.siguiente, aux.siguiente.anterior);
                        try {
                            aux.siguiente = aux.siguiente.siguiente;
                            aux.siguiente.anterior = aux;
                        } catch (error) {
                            return found;
                        }
                        return found;
                    }
                } catch (error) {}
            }
        }
    }
    buscarProducto(producto) {
        let aux = this.inicio;
        if (aux) {
            try {
                while (aux.codigo != producto.codigo) {
                    aux = aux.siguiente;
                }
                if (aux.codigo == producto.codigo) {
                    return aux;
                }
            } catch (error) {}
        }
    }
    listarProductos(interfaz) {
        let aux = this.inicio;
        interfaz.mostrarLista(aux);
    }
    listarProductosInverso(interfaz) {
        let aux = this.inicio;
        interfaz.mostrarListaInversa(aux);
    }
    insertarProducto(producto, casilla) {
        let aux = this.inicio;
        if (casilla == 1) {
            this.inicio = producto;
            this.inicio.siguiente = aux;
            this.inicio.siguiente.anterior = this.inicio;
        } else {
            let i = 2;
            while (i != casilla) {
                if (aux.siguiente != null) {
                    aux = aux.siguiente;
                    i++;
                } else {
                    break;
                }
            }
            if (i == casilla) {
                producto.siguiente = aux.siguiente;
                producto.anterior = aux;
                producto.siguiente.anterior = producto;
                aux.siguiente = producto;
            }
        }
    }
    agregarProductoInicio(producto) {
        if (this.inicio == null) {
            this.inicio = producto;
        } else {
            let aux = this.inicio;
            this.inicio = producto;
            this.inicio.siguiente = aux;
            this.inicio.siguiente.anterior = this.inicio;
        }
    }
    eliminarProductoInicio() {
        if (this.inicio != null) {
            let producto = new Producto(this.inicio.codigo, this.inicio.nombre, this.inicio.descripcion, this.inicio.cantidad, this.inicio.costo);
            this.inicio = this.inicio.siguiente;
            try {
                this.inicio.anterior = null;
            } catch (error) {}
            return producto;
        }
    }
}