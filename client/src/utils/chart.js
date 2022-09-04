export default class DrawChart {

    // Размеры элемента
    WIDTH
    HEIGHT
    // Внутренний отступ
    PADDING
    // Размеры холста

    DPI_WIDTH
    DPI_HEIGHT
    // Доступная область рисования с учетом внутреннего отступа
    VIEW_HEIGHT
    VIEW_WIDTH
    // Кол-во колонок
    ROWS_COUNT

    COLORS

    CANVAS

    chartData

    SMOOT

    constructor(canvas, data) {

        this.CANVAS = canvas
        this.chartData = data

        this.PADDING = 50
        this.ROWS_COUNT = 5
        this.SMOOT = 5

        this.getRandomColors()
    }

    getRandomColors() {

        this.COLORS = []

        for (let i = 0; i < this.chartData.length - 1; i++) {
            const hue = Math.floor(Math.random() * 360);
            const saturation = Math.floor(Math.random() * (100 + 1)) + "%";
            const lightness = "50%";
            const rdmColor = `hsl(${hue},${saturation}, ${lightness})`;
            this.COLORS.push(rdmColor)
        }
    }

    getCanvasDimensions() {
        this.WIDTH = this.CANVAS.clientWidth
        this.HEIGHT = this.CANVAS.clientHeight
        this.recalculateValues()
    }

    recalculateValues() {
        this.DPI_WIDTH = this.WIDTH * 2
        this.DPI_HEIGHT = this.HEIGHT * 2

        this.VIEW_HEIGHT = this.DPI_HEIGHT - this.PADDING * 2
        this.VIEW_WIDTH = this.DPI_WIDTH
    }

    set updateSmoot(value) {
        this.SMOOT = value
    }

    draw() {
        this.getCanvasDimensions()

        // Создание холста
        const ctx = this.CANVAS.getContext("2d")


        // Получение данных для построения
        const xData = this.chartData[0]
        // Получение всех колонок 'y', кроме первой 'x'
        const yData = this.chartData.filter((_, i) => i !== 0)


        // Определяем размеры холста
        this.CANVAS.width = this.DPI_WIDTH
        this.CANVAS.height = this.DPI_HEIGHT
        console.log(this.DPI_HEIGHT, this.DPI_WIDTH)

        // Находим минимальные и максимальные значения
        const [yMin, yMax] = this.getMinMax(yData)

        // Пропорция по y
        const yRatio = this.VIEW_HEIGHT / (yMax - yMin)
        // Пропорция по x
        const xRatio = this.VIEW_WIDTH / (yData[0].length - 1)

        //console.log(yMin, yMax)


        // Линии "y" axis
        this.yAxis(ctx, yMin, yMax)
        // Линии "x" axis
        this.xAxis(ctx, xData, xRatio)


        // Перебор колонок с данными для построения
        yData.forEach((col, index) => {
            // Определение "x" и "y"
            let coords = col.map((y, i) => {
                return [
                    Math.floor(i * xRatio),
                    Math.floor(this.DPI_HEIGHT - this.PADDING - y * yRatio)
                ]
            })


            // Сглаживание графика
            for (let i = 0; i < this.SMOOT; i++) {
                coords = this.roundData(coords)
            }



            // Отрисовывание линии
            this.drawLine(ctx, coords, this.COLORS[index])
        })

    }


    // Функция для определения максимального и минимального числа
    getMinMax(data) {

        let yMin = 0
        let yMax = 0

        // Перебор по колонкам
        data.forEach(item => {
            // Перебор колонки
            item.forEach(y => {
                if (yMin > y) yMin = y
                if (yMax < y) yMax = y
            })
        })

        //console.log("minMax",yMin, yMax)

        return [yMin, yMax]

    }


    // Функция для рисования линий на графике
    drawLine(ctx, coords, color) {
        // Стилизация кисти
        ///////////////////
        // Ширина кисти
        ctx.lineWidth = 2
        // Цвет кисти
        ctx.strokeStyle = color;

        // Начало рисования
        ctx.beginPath()

        for (const [x, y] of coords) {
            // Рисуем точку
            // DPI_HEIGHT для того что бы начало графика было слева снизу
            //ctx.lineTo(x, DPI_HEIGHT - y * yRatio - PADDING)
            ctx.lineTo(x, y)
        }

        // Соединение точек
        ctx.stroke()

        // Закрытие кисти
        ctx.closePath()
    }

    // Функция для рисования "Y axis"
    yAxis(ctx, yMin, yMax) {
        // определяем шаг
        const step = this.VIEW_HEIGHT / this.ROWS_COUNT

        // определяем шаг текстовой надписи
        const textStep = (yMax - yMin) / this.ROWS_COUNT

        // Начало рисования
        ctx.beginPath()

        // Стилизация текста
        ctx.font = "normal 20px Helvetica, sanc-serif"
        ctx.fillStyle = "96a2aa"

        // Перемещение кисти
        ctx.moveTo(0, this.PADDING)

        const text = yMax.toFixed(2).toString()

        // Текст на линии
        ctx.fillText(text, 5, this.PADDING - 10)

        // Рисуем точку, от начала y до конца
        ctx.lineTo(this.DPI_WIDTH, this.PADDING - 10)

        for (let i = 1; i <= this.ROWS_COUNT; i++) {
            const y = step * i

            // Перемещение кисти
            ctx.moveTo(0, y + this.PADDING)

            const text = (yMax - textStep * i).toFixed(2).toString()

            // Текст на линии
            ctx.fillText(text, 5, y + this.PADDING - 10)

            // Рисуем точку, от начала y до конца
            ctx.lineTo(this.DPI_WIDTH, y + this.PADDING)

        }

        // Соединение точек
        ctx.stroke()

        // Закрытие кисти
        ctx.closePath()
    }


    // Функция для рисования "X axis"
    xAxis(ctx, data, xRatio) {

        // Кол-во колонок
        const colsCount = 6
        // Шаг построения
        const step = Math.round(data.length / colsCount)

        // Начало рисования
        ctx.beginPath()

        // Построение "X axis"
        for (let i = 0; i < data.length; i += step) {

            // если первая итерация то пропустить, так как значение 0 уже отрисовано по оси Y
            if (i === 0) continue

            // Нахождение координаты x с учетом пропорции
            const x = i * xRatio
            //console.log("x", x)
            // Отрисовка текста
            ctx.fillText(data[i], x, this.DPI_HEIGHT - 5)
        }

        //console.log("x1", data.length * xRatio)
        //console.log("data", data[data.length-1])

        // Отрисовка текста для последней позиции массива
        ctx.fillText(data[data.length - 1], this.VIEW_WIDTH - 35, this.DPI_HEIGHT - 5)

        // Конец рисования
        ctx.closePath()
    }

    // Метод для сглаживания линий на графике
    roundData(coords) {
        // Массив хранящий новые координаты
        const newCoords = []

        // Определение новых координат с помощью алгоритма "Скользящая средняя"
        for (let i = 1; i <= coords.length - 2; i += 2) {
            newCoords.push([
                coords[i][0],
                Math.floor((coords[i - 1][1] + coords[i][1] + coords[i + 1][1]) / 3)
            ])
        }

        // Компенсация размера графика, так как кол-во точек было уменьшино

        // Дублирование первого элемента
        newCoords.unshift([0, newCoords[0][1]])

        // Добавление средних арифметических в начале графика
        for (let i = 1; i <= 8; i++) {
            newCoords.splice(i, 0, [
                (newCoords[i - 1][0] + newCoords[i][0]) / 2,
                (newCoords[i - 1][1] + newCoords[i][1]) / 2
            ])
        }

        // Дублирование элементов в конце графика
        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])
        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])
        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])

        return newCoords
    }

}










