document.write("<p>Способ №1: Вывод через document.write начался.</p>");

let userAge = 65;
let currentDiscount = checkDiscount(userAge);

if (currentDiscount === 0.20) {
    document.write("<p>Применена максимальная пенсионная скидка.</p>");
} else {
    document.write("<p>Применена стандартная скидка.</p>");
}

let dayNumber = 3;
switch (dayNumber) {
    case 1:
        document.write("<p>Понедельник</p>");
        break;
    case 3:
        document.write("<p>Среда (Выбрано по switch)</p>");
        break;
    default:
        document.write("<p>Другой день недели</p>");
}

document.write("<p>Старт цикла for с break и continue:</p>");
for (let i = 1; i <= 5; i++) {
    if (i === 2) {
        continue; // Пропустит итерацию со значением 2
    }
    if (i === 4) {
        break; // Полностью остановит цикл на значении 4
    }
    document.write(`Элемент цикла for: ${i}<br>`);
}

document.write("<p>Старт цикла while:</p>");
let whileCounter = 0;
while (whileCounter < 2) {
    document.write(`Итерация цикла while: ${whileCounter}<br>`);
    whileCounter++;
}

document.write("<p>Старт цикла do...while:</p>");
let doCounter = 10;
do {
    document.write("Этот блок do...while выполнится ровно 1 раз<br>");
} while (doCounter < 5);

// Функция оставлена внизу, так как благодаря hoisting (всплытию) её можно вызывать до объявления
function checkDiscount(age) {
    if (age >= 60) {
        return 0.20; // Прекращает выполнение функции и возвращает 20%
    }
    return 0.05; // Возвращает 5%
}