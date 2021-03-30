import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTO_EXITO,
  DESCARGA_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELINIADO_EXITO,
  // OBTENER_PRODUCTO_ELIMINAR,
  // PRODUCTO_ELINIADO_EXITO,
  // PRODUCTO_ELINIADO_ERROR

} from "../../types/index";

//Cada reducer tiene su propio State
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoeliminar:null
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };
    case PRODUCTO_ELINIADO_EXITO:  
    case DESCARGA_PRODUCTO_ERROR:  
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state.productos,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_PRODUCTO_EXITO:
      return{
        ...state,
        loading: false,
        error: false,
        productos: action.payload
      }  
    case OBTENER_PRODUCTO_ELIMINAR:
      return{
        ...state,
        productoeliminar: action.payload
      }
    case PRODUCTO_ELINIADO_EXITO:
      return{
        ...state,
        productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
        productoeliminar: null
      }  
    default:
      return state;
  }
}
