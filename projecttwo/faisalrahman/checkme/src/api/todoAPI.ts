import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

//const todoFile = path.join(os.homedir(), 'checkme', 'todos.json')
const todoPath = path.join(os.homedir(), 'todocli');
const todoFile = path.join(todoPath, 'todos.json'); 
if (!fs.existsSync(todoFile)) { fs.mkdirSync(todoPath); fs.writeFileSync(todoFile, '[]');}

interface Todo {
  done: boolean;
  todo: string;
}

class TodoAPI {
  private todos : Todo[] = []

  constructor () {
    this.todos = JSON.parse(fs.readFileSync(todoFile, { encoding: 'utf-8' }))
  }

  private saveTodos () {
    // make folder for the first run
    if (!fs.existsSync(path.dirname(todoFile))) {
      fs.mkdirSync(path.dirname(todoFile))
    }
    const data = JSON.stringify(this.todos)
    fs.writeFileSync(todoFile, data, { encoding: 'utf-8' })
  }

  add (todo : string, done?:  boolean) {
    const newTodo : Todo = { done: false, todo }
    this.todos.push(newTodo)
    this.saveTodos()
  }

  remove (index : number) {
    this.todos.splice(index, 1)
    this.saveTodos()
  }

  list () {
    return this.todos
  }

  get (index : number) : Todo {
    return this.todos[index]
  }

  done (index : number) {
    this.todos[index].done = true
    this.saveTodos()
  }

  undone (index : number) {
    this.todos[index].done = false
    this.saveTodos()
  }
}

const api = new TodoAPI
export default api