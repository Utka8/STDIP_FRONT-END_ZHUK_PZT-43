function calculateMath(x, a) {
    try {
        let y;

        // Ветка 1: x >= 2
        if (x >= 2) {
            let denominator = Math.pow(x, 2) - 1.5;
            if (denominator === 0) throw "Ошибка: Деление на ноль (x^2 - 1.5 = 0)";
            
            let underRoot = a + x;
            if (underRoot < 0) throw "Ошибка: Корень из отрицательного числа (a + x < 0)";
            
            y = (a / denominator) + Math.sqrt(underRoot);
        } 
        // Ветка 2: 0 <= x < 2
        else if (x >= 0 && x < 2) {
            if (a < 0) throw "Ошибка: Корень из отрицательного числа (a < 0)";
            y = 2 * Math.sqrt(a) - (x / 4);
        } 
        // Ветка 3: x < 0
        else {
            y = 0.3 * x;
        }

        return y;
    } catch (e) {
        alert(e); // Вывод ошибки в диалоговое окно, как требуется
        return "Ошибка"; // Возвращаем строку для вывода в HTML
    }
}