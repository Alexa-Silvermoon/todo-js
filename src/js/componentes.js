import { Todo } from "../classes";
import { todoList } from "../index"; //index.js desde carpeta js

//Referencias en el HTML:
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro'); //All para que lo regrese como un arreglo

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id=" ${ todo.id } ">
 		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div'); //crear un div que tambien llamaremos div
    div.innerHTML = htmlTodo; //lo que hay en htmlTodo lo inserta en el div anteriormente creado

    divTodoList.append(div.firstElementChild); //solo me interesa que se envie el primer elemento

    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup', (event) => { //'keyup' siginifica que al soltar la tecla enter se dispara esa accion

    // console.log(event);

    if( event.keyCode === 13 && txtInput.value.length > 0 ) { //la tecla enter es 13 en keyCode de google chrome, lo de length es para que no me metan strings vacios

        console.log(txtInput.value); //value es lo que el usuario ingreso en ese txtinput
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        // console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {

    // console.log('click');
    // console.log(event.target.localName); //target o target.localName me ayudan a identificar en el html las cosas
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento   = event.target.parentElement.parentElement; //identifica el elmento del html
    const todoId         = todoElemento.getAttribute('data-id'); //este es el id en el html

    // console.log(todoElemento);
    // console.log(todoId);
    // console.log(nombreElemento);

    if (nombreElemento.includes( 'input' )){ //el checkbox es un input

        todoList.marcarCompletado( todoId ); //esto marcara completado = true
        todoElemento.classList.toggle( 'completed' ); //esto tachara la tarea cuando este completada

    } else if (nombreElemento.includes('button')){ //borra el todo

        todoList.eliminarTodo( todoId ); //borra del arreglo
        divTodoList.removeChild( todoElemento ); //borra del html
    }

    // console.log(todoList);
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length-1 ; i >= 0; i-- ){ //este for es inverso y elimina de abajo hacia arriba

        const elemento = divTodoList.children[i];
        // console.log(elemento);

        if (elemento.classList.contains('completed')){

            divTodoList.removeChild(elemento);
            
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    // console.log(event.target.text);
    const filtro = event.target.text;

    if (!filtro){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected')); //anchortag <a
    // console.log(event.target);
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ){

        // console.log(elemento);
        elemento.classList.remove('hidden'); //clase desde styles.css
        const completado = elemento.classList.contains('completed');

        switch ( filtro ){ //si no es pendiente ni competado, no hace nada

            case 'Pendientes': //todos los elementos completados le agrego la clase hidden para ocultar
                if ( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados': //igualmente si no esta completado le agrego la clase hidden para ocultar
                if ( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});