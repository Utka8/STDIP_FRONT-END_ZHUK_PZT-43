//1. Свойства объекта document и коллекции
function showDocumentInfo() {
    let info = `
title: ${document.title}
URL: ${document.URL}
Количество ссылок (links): ${document.links.length}
Количество изображений (images): ${document.images.length}
readyState: ${document.readyState}
    `.trim();
    document.getElementById('doc-info-output').textContent = info;
}

// 2. Поиск элементов 
function changeTextById() {
    const inputVal = document.getElementById('custom-text-input').value;
    const target = document.getElementById('target-text');
    if (inputVal.trim() !== '') {
        target.textContent = inputVal;
        target.style.color = '#27ae60';
    } else {
        alert('Поле ввода не должно быть пустым!');
    }
}

function highlightByQuerySelector() {
    const items = document.querySelectorAll('.highlight-target');
    items.forEach(item => {
        item.classList.toggle('highlighted');
    });
}

// 3. Навигация по DOM (Node)
function navigateDOM() {
    const middleItem = document.getElementById('middle-item');
    const parentNode = middleItem.parentNode;
    const prevSibling = middleItem.previousElementSibling;
    const nextSibling = middleItem.nextElementSibling;

    // Используем <br> для разделения строк и innerHTML вместо textContent
    let result = `
        <strong>Родительский элемент (parentNode):</strong> &lt;${parentNode.tagName.toLowerCase()}&gt;<br>
        <strong>Предыдущий брат (previousElementSibling):</strong> ${prevSibling.textContent}<br>
        <strong>Следующий брат (nextElementSibling):</strong> ${nextSibling.textContent}
    `.trim();
    
    document.getElementById('nav-output').innerHTML = result;
}

//4. Создание, добавление и удаление элементов
function addNewElement() {
    const textInput = document.getElementById('task-input');
    const container = document.getElementById('elements-container');
    
    if (textInput.value.trim() === '') {
        alert('Введите текст для нового блока');
        return;
    }

    // Создание нового узла-элемента
    const newCard = document.createElement('div');
    newCard.className = 'dynamic-card';
    newCard.textContent = textInput.value;

    // Добавление в дерево (appendChild)
    container.appendChild(newCard);
    textInput.value = '';
}

function removeLastElement() {
    const container = document.getElementById('elements-container');
    if (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    } else {
        alert('Удалять больше нечего!');
    }
}

// 5. Управление стилями и атрибутами (объект Style)
function changeBoxColor(color) {
    const box = document.getElementById('styled-box');
    // Изменение CSS-свойств через объект style
    box.style.backgroundColor = color;
}

function toggleBoxBorder() {
    const box = document.getElementById('styled-box');
    // Управление классами
    box.classList.toggle('active-border');
}