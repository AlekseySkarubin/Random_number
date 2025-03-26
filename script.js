function numberToText(n) {
    const units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
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

    result += hundreds[hundred];
    if (ten === 1) {
        result += (result ? " " : "") + teens[unit];
    } else {
        result += (result ? " " : "") + tens[ten];
        result += (result ? " " : "") + units[unit];
    }

    return result.trim();
}

let minValue, maxValue, answerNumber, orderNumber, gameRun;

function startNewGame() {
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    gameRun = true;

    answerNumber = Math.floor((minValue + maxValue) / 2);
    document.getElementById('orderNumberField').innerText = orderNumber;
    updateQuestion();
}

function startGame() {
    minValue = parseInt(document.getElementById('minValueInput').value) || 0;
    maxValue = parseInt(document.getElementById('maxValueInput').value) || 100;

    // Тернарный оператор для ограничения диапазона
    minValue = (minValue < -999) ? -999 : (minValue > 999 ? 999 : minValue);
    maxValue = (maxValue < -999) ? -999 : (maxValue > 999 ? 999 : maxValue);

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue];
    }

    orderNumber = 1;
    gameRun = true;

    answerNumber = Math.floor((minValue + maxValue) / 2);
    document.getElementById('orderNumberField').innerText = orderNumber;
    updateQuestion();
}

function updateQuestion() {
    const questionPhrases = [
        "Вы загадали число",
        "Мне кажется, это число",
        "Позвольте предположить, это число"
    ];
    const randomPhrase = questionPhrases[Math.floor(Math.random() * questionPhrases.length)];
    const answerText = numberToText(answerNumber);
    if (answerText.length < 20) {
        document.getElementById('answerField').innerText = `${randomPhrase} ${answerText}?`;
    } else {
        document.getElementById('answerField').innerText = `${randomPhrase} ${answerNumber}?`;
    }
}

document.addEventListener('DOMContentLoaded', startNewGame);

document.getElementById('btnStart').addEventListener('click', startGame);

document.getElementById('btnRetry').addEventListener('click', startNewGame);

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            document.getElementById('answerField').innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            document.getElementById('orderNumberField').innerText = orderNumber;
            updateQuestion();
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            document.getElementById('answerField').innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            document.getElementById('orderNumberField').innerText = orderNumber;
            updateQuestion();
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const successPhrases = [
            `Я всегда угадываю\n\u{1F60E}`,
            `Это было легко!\n\u{1F60E}`,
            `Бинго!\n\u{1F60E}`
        ];
        document.getElementById('answerField').innerText = successPhrases[Math.floor(Math.random() * successPhrases.length)];
        gameRun = false;
    }
});
