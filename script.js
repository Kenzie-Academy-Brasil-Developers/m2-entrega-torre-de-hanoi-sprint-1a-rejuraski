let level = 1;
let moves = 0;
let disks = [3, 2, 1];
let disk = null;

function mouseEvent(e) {
    const element = e.currentTarget.lastElementChild;
    if (disk === null && element === null) {
        return;
    } else if (disk === null) {
        element.classList.add('selected');
        disk = element;
    } else {
        addDisk(e);
    }
}

function addDisk(e) {
    const lastDisk = e.currentTarget.lastElementChild;
    if (lastDisk === null || disk.clientWidth < lastDisk.clientWidth) {
        disk.classList.remove('selected');
        e.currentTarget.appendChild(disk);
        updateMoves(++moves);
    } else {
        disk.classList.remove('selected');
        error = document.querySelector('#errorMsg');
        error.textContent = 'Movimento inválido.';
    }
    disk = null;

    endGame();
}

function endGame() {
    const tower2 = document.getElementById('tower2');
    const tower3 = document.getElementById('tower3');

    if (level === 1 && tower2.childElementCount !== 3 && tower3.childElementCount !== 3) {
        return;
    } else if (level === 2 && tower2.childElementCount !== 4 && tower3.childElementCount !== 4) {
        return;
    } else if (level === 3 && tower2.childElementCount !== 5 && tower3.childElementCount !== 5) {
        return;
    }

    victory = document.getElementById('victory');
    victory.textContent = 'Parabéns, você finalizou o jogo!';
}

function updateMoves(moves) {
    const p = document.getElementById('moves');
    p.innerText = `Movimentos: ${moves}`;

    error = document.querySelector('#errorMsg');
    error.textContent = '';
}

function changeLevel() {
    if (level < 3) {
        level++;
    } else {
        level = 1;
    }
    const p = document.getElementById('level');
    p.innerText = `Nivel ${level}`;

    updateDisks();
}

function updateDisks() {
    switch (level) {
        case 1:
            disks = [3, 2, 1];
            break;
        case 2:
            disks = [4, 3, 2, 1];
            break;
        case 3:
            disks = [5, 4, 3, 2, 1];
            break;
    }

    reset();
}

function reset() {
    disk = null;
    updateMoves(moves = 0);
    createDisks();

    victory = document.getElementById('victory');
    victory.textContent = '';
}

function createTowers() {
    const towers = document.getElementById('towers');
    for (let i = 1; i <= 3; i++) {
        let tower1 = document.createElement('div');
        tower1.id = `tower${i}`;
        tower1.addEventListener('click', mouseEvent, false)
        towers.appendChild(tower1);
    }
}

function createDisks() {
    tower1.textContent = '';
    tower2.textContent = '';
    tower3.textContent = '';

    disks.forEach(element => {
        let div = document.createElement('div');
        div.className = `disk${element}`;
        div.innerText = element;
        tower1.appendChild(div);
    });
}

createTowers();
createDisks();