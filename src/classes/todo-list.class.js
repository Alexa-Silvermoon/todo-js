import { Todo } from "./todo.class";

export class TodoList {

    constructor(){

        // this.todos = [];
        this.cargarLocalStorage(); //esto inicializa el arreglo ya sea que existan o no
    }

    nuevoTodo( todo ){

        this.todos.push(todo);
        this.guardarLocalStorage(); //guarda los todo nuevos
    
    }

    eliminarTodo(id){

        this.todos = this.todos.filter( todo => todo.id != id ) //!= filtrara los que tengan id diferentes al que esta entrando
        this.guardarLocalStorage(); //cuando elimino algo se me guardan los cambios
    }

    marcarCompletado(id){

        for (const todo of this.todos){

            // console.log(id, todo.id);

            if ( todo.id == id ){

                todo.completado = !todo.completado;
                this.guardarLocalStorage(); //cuando marco algo se me guardan los cambios
                break;
            }
        }

    }

    eliminarCompletados(){

        this.todos = this.todos.filter( todo => !todo.completado ); //retorna todos los todo que no estan completados
        this.guardarLocalStorage(); //eliminar los completados y guardar los cambios
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ) );
        //se guarda todo en el localStorage y JSON.stringify() convierte los arreglos a un string
        // de esta forma ya podre ver el todo claramente en google chrome en la pestala aplication

    }

    cargarLocalStorage(){

        /*
        if ( localStorage.getItem('todo') ) {

            this.todos = JSON.parse( localStorage.getItem('todo') ); //JSON.parse() convierte de string a objeto
            console.log( 'cargar localStorage: ', this.todos);
            console.log(typeof this.todos); //todos en un arerglo de tipo string

        }else{

            this.todos = []; //si no existe nada en el localStorage, que me devuelva este arreglo vacio
        }
        */

        //ternario del if anterior:
        this.todos = ( localStorage.getItem('todo') )
                        ? this.todos = JSON.parse( localStorage.getItem('todo') ) 
                        : []; //this.todos = [];

        
        this.todos = this.todos.map( Todo.fromJson);
        // tambien puede ser: this.todos = this.todos.map( obj => Todo.fromJson( obj ));

    }
}
