//vamos a definir las funciones de osuscripción para actualizar la UI/Componentes

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";


//Al funcionar con ngrx, puedo lamcner el estqado de distitnos procesos
//negocios, slice/feature

export const selectCartState = createFeatureSelector<CartState>('carrito')//este carrito hace de id
//export const seguroState = createFeatureSelector<CartState>('seguro')//este carrito hace de id

export const selectProductos = createSelector(
    selectCartState,//el slice/dominio de nuestro interés
    (state) => state.productos //los datos que extraigo con este selector
)



//by Dani Cruzado
//1 total de artículos
export const selectTotalProducts = createSelector(selectCartState, (state) =>
  state.productos.reduce((acc, currVal) => acc + (currVal.cantidad || 1), 0),
);
//2 total del importe del carrito
export const selectTotalPrice = createSelector(selectCartState, (state) =>
  state.productos.reduce(
    (acc, currVal) => acc + currVal.precio * (currVal.cantidad || 1),
    0,
  ),
);