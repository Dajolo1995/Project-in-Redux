import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTO_EXITO,
  DESCARGA_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELINIADO_EXITO,
  PRODUCTO_ELINIADO_ERROR 
} from "../types/index";
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//Crear nuevo productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar la api
      await clienteAxios.post('/productos', producto);

      //Si todo sale bien, Actualiza el state
      dispatch(agregarProductoExito(producto));

      //alert
      Swal.fire(
        'Correcto',
        'El producto se agrego correctamente',
        'success'
        )
    } catch (error) {
      console.log(error)
      //Si hay un error camniar el state
      dispatch(agregarProductoError(true));

      //Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Hobo un error',
        text:'Hubo un error, intenta de nuevo'
      })
      
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//Si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
})


//Función que descarga los productos de la base de datos
// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
      dispatch( descargarProductos() );

      try {
          const respuesta = await clienteAxios.get('/productos');
          dispatch(descargaProductoExitosa(respuesta.data))
      } catch (error) {
          console.log(error);
          dispatch(descargaProductoError())
          
      }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductoExitosa = productos => ({
  type: DESCARGA_PRODUCTO_EXITO,
  payload: productos
})

const descargaProductoError = () => ({
  type: DESCARGA_PRODUCTO_ERROR,
  payload: true
})

//Selecciona y elimina el producto
export function borrarProductosAction(id){
  return async (dispatch) =>{
    dispatch(obtenerProductosEliminar(id))
    
    try {
      clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito())

      //Si se elimina, mostrar alerta
      Swal.fire("Eliminado", "El producto se elimino correctamente.", "success");
    } catch (error) {
      console.log(error)
      dispatch(eliminarProductoError())
    }

  }
}

const obtenerProductosEliminar = id =>({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELINIADO_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELINIADO_ERROR,
  payload: true
})