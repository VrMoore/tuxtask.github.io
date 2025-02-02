const dragItems = document.querySelectorAll(".board_task");
const dropItems = document.querySelectorAll(".boards");

dragItems.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
})

dropItems.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask)
        } else {
            zone.insertBefore(curTask, bottomTask)
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll("board_task:not(.is-dragging)");

    let closestTask = null;
    let closestOffSet = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const {top} = task.getBoundingClientRect();

        const offSet = mouseY - top;

        if (offSet < 0 && offSet > closestOffSet ) {
            closestOffSet = offSet;
            closestTask = task;
        };
    });

    return closestTask;
};

function createKanban() {
    const addKanbanBtn = document.getElementById('input_button');
    const inputBox = document.getElementById('input_task');
    const boardContainer = document.querySelector('.board_container')
    // alert(inputBox.value)

    addKanbanBtn.addEventListener('click', () => {

        if (inputBox.value !== '') {

            let kanbanBoards = document.createElement('div')
            kanbanBoards.classList.add('boards');
    
            addItems(inputBox, kanbanBoards);
            boardContainer.appendChild(kanbanBoards)

            inputBox.value = '';
            saveToLocal(inputBox.value)
        } else {
            alert('please insert a name')
        }
    })
}

// function createTask() {
//     const boardHead = document.getElementById("board_container")

//     boardHead.addEventListener().forEach((e) => {
        
//     })
// }

function addItems(input_box, kanban_boards) {
    // MAX_HEADING = 20;
    const kanban_heads = document.createElement('h3');
    kanban_heads.classList.add('board_heading')
    kanban_heads.textContent = input_box.value;
    kanban_boards.appendChild(kanban_heads)
}



// function saveToLocal(inputBoxValue){
//     let kanbanApps = []

    
// }

createKanban();