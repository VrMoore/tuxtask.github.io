const listItems = document.getElementById('content_list');

function listAction(myList) {
    myList.forEach(item => {
        const crossX = item.querySelector("#cross");
        
        item.addEventListener('mouseenter', () => {
            crossX.style.color = "white";
            crossX.style.transform = 'rotate(90deg)';
            crossX.style.transition = '.5s all ease';
        });
    
        item.addEventListener('mouseleave', () => {
            crossX.style.color = "";
            crossX.style.transform = '';
            crossX.style.transition = '.5s all ease';
        });
    
    });
        
}

const addBtn = document.getElementById('input_button');
const inputBox = document.getElementById('input_task');

function addTask() {
    
    addBtn.addEventListener('click', () => {

        if (inputBox.value == "") {
            alert('please insert new task before proceed')
        } else {

            let li = document.createElement("li");
            li.classList.add('items_list');
            
            createListItem(inputBox, li);
    
            listItems.appendChild(li);
            inputBox.value = "";
            
            const listItemsElement = Array.from(listItems.children);
            listAction(listItemsElement);
            saveToLocal();

        }


    });

    loadData();

}

function createListItem(inputBox, li) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add('check');
    li.appendChild(checkbox);

    const paragraph = document.createElement("p");
    paragraph.classList.add('desc');
    paragraph.textContent = inputBox.value;
    li.appendChild(paragraph);
    
    const cross = document.createElement("i");
    cross.classList.add('fa-solid','fa-xmark');
    cross.id = 'cross';
    li.appendChild(cross);

    cross.addEventListener('click', () => {
        li.remove()
        saveToLocal();
    })

    li.addEventListener('click', (e) => {
        if (e.target != cross) {
            checkbox.checked = !checkbox.checked;
        }
        saveToLocal();
    })

};

function loadData() {
    const taskData = JSON.parse(localStorage.getItem('taskListData'))

    listItems.innerHTML = "";

    if (taskData.length > 0) {
        showTask()
    } else {
        saveToLocal()
    }
}

function saveToLocal() {
    let localData = [];
    const listItemsContent = document.querySelectorAll(".items_list")
    
    listItemsContent.forEach(item => {
        const desc = item.querySelector('.desc');
        const checkbox = item.querySelector('.check')

        localData.push({
            description : desc.textContent,
            status : checkbox.checked
        })
    })
    
    localStorage.setItem('taskListData', JSON.stringify(localData));

}

function showTask() {
    const savedTasks = JSON.parse(localStorage.getItem('taskListData')) || [];
    
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add('items_list');
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add('check');
        checkbox.checked = task.status
        li.appendChild(checkbox);

        const paragraph = document.createElement("p");
        paragraph.classList.add('desc');
        paragraph.textContent = task.description;
        li.appendChild(paragraph);
        
        const cross = document.createElement("i");
        cross.classList.add('fa-solid','fa-xmark');
        cross.id = 'cross';
        li.appendChild(cross);

        cross.addEventListener('click', () => {
            li.remove();
            saveToLocal();
        })

        li.addEventListener('click', (e) => {
            if (e.target != cross) {
                checkbox.checked = !checkbox.checked;
            }
            saveToLocal();
        })

        listItems.appendChild(li);
    });

    const listItemsElement = Array.from(listItems.children);
    listAction(listItemsElement);
}

document.addEventListener('DOMContentLoaded', loadData)
addTask();