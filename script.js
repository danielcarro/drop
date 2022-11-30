// target seta o elemento em quem exatamente foi clicado
//currentTarget mostra o elemento que foi aplicado o evento
/*
document.querySelector('.neutralArea').addEventListener('click',(e) => {
    console.log('target', e.target);
    console.log('current target', e.currentTarget);
});
*/
let areas = {
    a: null,
    b: null,
    c: null
};

let correto = {
    a: '1',
    b: '2',
    c: '3'
}

// Events
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}


// function Area

function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');

}

function drop(e) {
    e.currentTarget.classList.remove('hover');


    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();

    }

}

//functions Neutral Area

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

// Logic Functions

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;

        } else {
            areas[name] = null;
        }
    });

    // minha solução resposta correta transformei em objeto e comparei os objetos transformando em json
    if (JSON.stringify(areas) === JSON.stringify(correto)) {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}