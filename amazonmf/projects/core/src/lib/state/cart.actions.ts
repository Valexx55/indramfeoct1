//identificamos cada una de las acciones que provocan
//cambios en el estado de nuestro negocio "carrito-productos"

import { ProductoEvent } from "@models"
import { createAction, props } from "@ngrx/store"


export const agregarProducto = createAction(
    '[Carrito] AgregarProducto',//descripción
    props<{producto:ProductoEvent}>() //los datos que acompañan a la acci´pon: el prodcuto añadido
)

export const eliminarProducto = createAction(
    '[Carrito] EliminarProducto',//descripción
    props<{id:number}>() //los datos que acompañan a la acci´pon: el prodcuto añadido
)

export const vaciarCarrito = createAction(
    '[Carrito] VaciarCarrito'
)
