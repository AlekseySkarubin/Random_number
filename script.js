// Функция для преобразования числовых значений в текстовый формат на русском языке
function numberToText(n) {
    const units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемьнадцать", "девятнадцать"];
    const tens = ["", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

    if (n === 0) return "ноль";

    let result = "";
    if (n < 0) {
        result += "минус ";
        n = -n;
    }

    let hundred = Math.floor(n / 100);
    let ten = Math.floor((n % 100) / 10);
    let unit = n % 10;

    result += hundreds[hundred] ? hundreds[hundred] + " " : "";
    if (ten === 1) {
        result += (result ? " " : "") + teens[unit];
    } else {
        result += (result ? " " : "") + tens[ten];
        result += (result ? " " : "") + units[unit];
    }

    return result.trim();
}

let minValue, maxValue, answerNumber, orderNumber, gameRun;

// Функция для начала новой игры и инициализации всех начальных параметров
function startNewGame() {
    // Получаем значения диапазона от пользователя
    minValue = parseInt(document.getElementById('minValueInput').value, 10);
    maxValue = parseInt(document.getElementById('maxValueInput').value, 10);

    // Проверяем, на корректность ввода диапазона
    if (isNaN(minValue) || isNaN(maxValue)) {
        alert("Пожалуйста, введите корректные значения для диапазона.");
        gameRun = false;
        return;
    }

    // Проверка на допустимые границы диапазона
    if (minValue < -999 || minValue > 999) {
        alert("Диапазон числа должен быть от -999 до 999");
        gameRun = false;
        return;
    }

    if (maxValue < -999 || maxValue > 999) {
        alert("Диапазон числа должен быть от -999 до 999");
        gameRun = false;
        return;
    }

    // Проверка на логичность диапазона, если minValue больше maxValue
    if (minValue > maxValue) {
        alert("Кажется, диапазон задан не совсем логично...");
        [minValue, maxValue] = [maxValue, minValue];
    }

    // Инициализируем начальные параметры игры
    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    document.getElementById('orderNumberField').innerText = orderNumber;
    updateQuestion();
}

// Функция для обновления вопроса, задаваемого пользователю
function updateQuestion() {
    if (!gameRun) return; // Проверяем, активна ли игра

    const questionPhrases = [
        "Вы загадали число",
        "Мне кажется, это число",
        "Позвольте предположить, это число"
    ];
    const randomPhrase = questionPhrases[Math.floor(Math.random() * questionPhrases.length)];

    const answerText = numberToText(answerNumber);
    const questionText = `${randomPhrase} ${answerText}?`;

    // Проверка длины текстового представления числа
    if (questionText.length < 20) {
        document.getElementById('answerField').innerText = questionText;
    } else {
        document.getElementById('answerField').innerText = `${randomPhrase} ${answerNumber}?`;
    }
}

// Событие, которое запускает новую игру при загрузке страницы
document.addEventListener('DOMContentLoaded', startNewGame);

// Событие для кнопки "Начать игру"
document.getElementById('btnStart').addEventListener('click', startNewGame);

// Событие для кнопки "Заново"
document.getElementById('btnRetry').addEventListener('click', startNewGame);

// Событие для кнопки "Больше"
document.getElementById('btnOver').addEventListener('click', function () {
    if (!gameRun) return; // Проверяем, активна ли игра

    // Проверка на выход значений за пределы диапазона
    if (minValue >= maxValue) {
        document.getElementById('answerField').innerText = "Это выходит за рамки договора!";
        gameRun = false;
    } else {
        minValue = answerNumber + 1;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        orderNumber++;
        document.getElementById('orderNumberField').innerText = orderNumber;
        updateQuestion();
    }
});

// Событие для кнопки "Меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (!gameRun) return; // Проверяем, активна ли игра

    // Проверка на выход значений за пределы диапазона
    if (minValue >= maxValue) {
        document.getElementById('answerField').innerText = "Это выходит за рамки договора!";
        gameRun = false;
    } else {
        maxValue = answerNumber - 1;
        answerNumber = Math.floor((minValue + maxValue) / 2);
        orderNumber++;
        document.getElementById('orderNumberField').innerText = orderNumber;
        updateQuestion();
    }
});

// Событие для кнопки "Верно!"
document.getElementById('btnEqual').addEventListener('click', function () {
    if (!gameRun) return; // Проверяем, активна ли игра

    const successPhrases = [
        `Я всегда угадываю\n\u{1F60E}`,
        `Это было легко!\n\u{1F60E}`,
        `Бинго!\n\u{1F60E}`
    ];
    document.getElementById('answerField').innerText = successPhrases[Math.floor(Math.random() * successPhrases.length)];
    gameRun = false;
});
