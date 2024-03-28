import Dexie, { Table } from "dexie";
import { BehaviorSubject } from "rxjs";
import { addButton } from "../helper/button";

interface Todo {
  id?: number;
  name?: string | null;
  data?: string | null;
}

class TodoDatabase extends Dexie {
  public readonly todos!: Table<Todo, number>;

  public constructor(name: string) {
    super(name);
    this.version(1).stores({
      todos: "++id,name,data",
    });
  }
}

export class TodoList extends HTMLElement {
  private _db: TodoDatabase;

  private get db(): TodoDatabase {
    return this._db;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.initStorage();
    this.render();
  }

  private initStorage() {
    const xPrefix = this.getAttribute("x-prefix")!;
    this._db = new TodoDatabase(xPrefix);
  }

  private async render() {
    const subject = new BehaviorSubject<Array<Todo>>([]);

    const shadow = this.attachShadow({ mode: "open" });

    const all = await this._db.todos.toArray();
    subject.next(all);

    const list = document.createElement("div");
    list.classList.add("list");
    shadow.appendChild(list);

    const onAdd = async () => {
      const id = await this.db.todos.add({
        data: "Some wrong text",
        name: "Some title",
      });
      const data = await this.db.todos.get(id);
      subject.next([...subject.value, data]);
    };

    const menu = document.createElement("div");
    menu.classList.add("menu");
    const addTodo = await addButton("Add todo", onAdd);
    menu.appendChild(addTodo);
    shadow.appendChild(menu);

    subject.asObservable().subscribe({
      next: (data) => {
        list.innerHTML = "";
        data.forEach(async (obj) => {
          list.appendChild(
            await this.getListItem(obj, () => {
              this._db.todos.delete(obj.id!);
              subject.next(subject.value.filter((i) => i !== obj));
            })
          );
        });
      },
    });
  }

  private async getListItem(
    obj: Todo,
    onRemove$: () => void
  ): Promise<HTMLElement> {
    const div = document.createElement("div");

    const title = document.createElement("h3");
    title.innerText = obj.name;
    div.appendChild(title);

    const body = document.createElement("p");
    body.innerText = obj.data;
    div.appendChild(body);

    const onRemove = () => {
      div.remove();
      onRemove$();
    };

    const addTodo = await addButton("Remove todo", onRemove);
    div.appendChild(addTodo);

    return div;
  }

  attributeChangedCallback(name: string) {
    console.log(`Attribute ${name} has changed.`);
    if (name === "x-prefix") {
      this.initStorage();
    }
  }
}

window.customElements.define("todo-list", TodoList);
