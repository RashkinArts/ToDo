(function () {
    function createAppTitle (title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };

    }

    function createTodoList () {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem (name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    const updateLS = (title, arr) => {
        localStorage.setItem(title, JSON.stringify(arr));
    }

    function createTodoApp(container, title = 'Список дел') {
      const todoArr = JSON.parse(localStorage.getItem(title) || '[]');

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.input.addEventListener('input', () => {
          todoItemForm.button.disabled = !todoItemForm.input.value.trim()
        })

        const renerTodoItem = (todoObj) => {
            if (!todoObj.text) {
                return;
            }

           let todoItem = createTodoItem(todoObj.text);

           todoList.append(todoItem.item);

           if (todoObj.done) {
            todoItem.item.classList.add('list-group-item-success')
           }

           todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                todoObj.done = !todoObj.done;
                updateLS(title, todoArr);
           })

           todoItem.deleteButton.addEventListener('click', function() {
                if (confirm ('Вы уверены?')) {
                    todoItem.item.remove();
                    let index = todoArr.findIndex(item => item.id === todoObj.id);

                     if (index !== -1) {
                      todoArr.splice(index, 1);
                     }
                updateLS(title, todoArr);
                }
           })
        }

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            const todoObj = {
                text: todoItemForm.input.value,
                id: Date.now().toString(10).substring(9),
                done: false,
             }

            renerTodoItem(todoObj);
            todoArr.push(todoObj);
           todoItemForm.input.value = '';
           updateLS(title, todoArr);
        });

        todoArr.forEach((item) => {
            renerTodoItem(item);
        })
    }

    window.createTodoApp = createTodoApp;
  })();
