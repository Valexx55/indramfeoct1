import { CommunicationService } from "@core-lib";
import { ProductoEvent } from "@models";
import { createReducer, on } from "@ngrx/store";
import * as CartActions from './cart.actions';

//definimos el estado inicial
export interface CartState {
    productos: ProductoEvent[]
}

export const initalState:CartState = {
    productos: CommunicationService.recuperarEstadoProductos()
}

export const cartReducer = createReducer(
    initalState,
    on(CartActions.agregarProducto, (state, {producto}) => 
    {
        let existe = state.productos.find(p=> p.id == producto.id);
        
        //calculo la nueva lista de productos
        let productosNuevos = existe ?
        state.productos.map(p=> p.id == producto.id ? {...p, cantidad: (p.cantidad ?? 1)+1}:p):
        [...state.productos, {...producto, cantidad:1}]

        return {...state, productosNuevos}
    }),
    on(CartActions.vaciarCarrito, ()=>({productos:[]})),
    on(CartActions.eliminarProducto, (state, {id}) => {
        let productosNuevos = state.productos.filter(p => p.id !== id);
        return {...state, productosNuevos}
    })
)