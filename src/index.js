// console.log('hola desde index.js');
import './styles.css';

// import { Todo } from './classes/todo.class.js'; //aqui importo la clase Todo desde src/classes
// import { TodoList } from './classes/todo-list.class';
// import {saludar} from './js/componentes.js';

import {Todo, TodoList} from './classes'; //truco para traer clases en un solo renglon, el index.js en la
import { crearTodoHtml } from './js/componentes';
//carpeta clases es buscado por defecto

export const todoList = new TodoList();
// const tarea = new Todo('Aprender JavaScript hehe');
// const tarea2 = new Todo('crear un unicorno');
// console.log(tarea);

// todoList.nuevoTodo( tarea );
// todoList.nuevoTodo( tarea2 );

// console.log(todoList.todos);

todoList.todos.forEach( crearTodoHtml );/*
me enviara los todos al html gracias a la funcion crearTodoHtml() en el archivo componentes.js

todoList.todos.forEach( crearTodoHtml ); TAMBIEN PUEDE SER: 
todoList.todos.forEach( todo => crearTodoHtml( todo ) );
*/

// const newTodo = new Todo( 'Aprender JavaScript');
//todoList.nuevoTodo( newTodo );
todoList.todos[0].imprimirClase(); //error
// newTodo.imprimirClase();
console.log('todos: ', todoList.todos);

// tarea.completado = true;

// console.log(todoList);
// crearTodoHtml(tarea);

/*
Todo {tarea: 'Aprender JavaScript', id: 1646584675265, completado: false, 
creado: Sun Mar 06 2022 11:37:55 GMT-0500 (hora estándar de Colombia)}
*/

// localStorage.setItem('mi-key', 'ABC123'); //guarda en localstorage en la pestaña aplication de chrome
// sessionStorage.setItem('mi-key', 'XYZ');

/*
setTimeout(() => {
    localStorage.removeItem('mi-key');
}, 3000);
// esto borra en 3 segundos lo que haya en el localstorage de chrome
*/