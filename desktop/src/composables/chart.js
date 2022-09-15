export default class DrawChart {

    constructor(canvas, data) {
        console.log('data', data)
        this.canvas = canvas
        this.chartData = data

        this.padding = 50
        this.rows_count = 5
        this.smoot = 5

        this.width = 1110
        this.height = 600

        this.dpi_width = this.width * 2
        this.dpi_height = this.height * 2

        this.view_height = this.dpi_height - this.padding * 2
        this.view_width = this.dpi_width

        this.getRandomColors()
    }

    getRandomColors() {

        this.colors = []

        for (let i = 0; i < this.chartData.length - 1; i++) {
            const hue = Math.floor(Math.random() * 360);
            const saturation = Math.floor(Math.random() * (100 + 1)) + "%";
            const lightness = "50%";
            const rdmColor = `hsl(${hue},${saturation}, ${lightness})`;
            this.colors.push(rdmColor)
        }
    }

    set updateSmoot(value) {
        this.smoot = value
    }

    draw() {

        const ctx = this.canvas.getContext("2d")

        const xData = this.chartData[0]
        const yData = this.chartData.filter((_, i) => i !== 0)

        this.canvas.width = this.dpi_width
        this.canvas.height = this.dpi_height

        const [yMin, yMax] = this.getMinMax(yData)

  
        const yRatio = this.view_height / (yMax - yMin)
        const xRatio = this.view_width / (yData[0].length - 1)

        //console.log(yMin, yMax)


        this.yAxis(ctx, yMin, yMax)
        this.xAxis(ctx, xData, xRatio)


        yData.forEach((col, index) => {
            let coords = col.map((y, i) => {
                return [
                    Math.floor(i * xRatio),
                    Math.floor(this.dpi_height - this.padding - y * yRatio)
                ]
            })

            for (let i = 0; i < this.smoot; i++) {
                coords = this.roundData(coords)
            }

            this.drawLine(ctx, coords, this.colors[index])
        })

    }


    getMinMax(data) {

        let yMin = 0
        let yMax = 0

        data.forEach(item => {
            item.forEach(y => {
                if (yMin > y) yMin = y
                if (yMax < y) yMax = y
            })
        })

        return [yMin, yMax]

    }


    drawLine(ctx, coords, color) {

        ctx.lineWidth = 2

        ctx.strokeStyle = color;


        ctx.beginPath()

        for (const [x, y] of coords) {

            ctx.lineTo(x, y)
        }


        ctx.stroke()


        ctx.closePath()
    }

    yAxis(ctx, yMin, yMax) {

        const step = this.view_height / this.rows_count


        const textStep = (yMax - yMin) / this.rows_count


        ctx.beginPath()


        ctx.font = "normal 20px Helvetica, sanc-serif"
        ctx.fillStyle = "96a2aa"

        ctx.moveTo(0, this.padding)

        const text = yMax.toFixed(2).toString()


        ctx.fillText(text, 5, this.padding - 10)

        ctx.lineTo(this.dpi_width, this.padding - 10)

        for (let i = 1; i <= this.rows_count; i++) {
            const y = step * i


            ctx.moveTo(0, y + this.padding)

            const text = (yMax - textStep * i).toFixed(2).toString()

 
            ctx.fillText(text, 5, y + this.padding - 10)


            ctx.lineTo(this.dpi_width, y + this.padding)

        }


        ctx.stroke()


        ctx.closePath()
    }


    xAxis(ctx, data, xRatio) {


        const colsCount = 6
  
        const step = Math.round(data.length / colsCount)

        ctx.beginPath()

        for (let i = 0; i < data.length; i += step) {

            if (i === 0) continue


            const x = i * xRatio
            ctx.fillText(data[i], x, this.dpi_height - 5)
        }


        ctx.fillText(data[data.length - 1], this.view_width - 35, this.dpi_height - 5)
        ctx.closePath()
    }


    roundData(coords) {
        const newCoords = []

        for (let i = 1; i <= coords.length - 2; i += 2) {
            newCoords.push([
                coords[i][0],
                Math.floor((coords[i - 1][1] + coords[i][1] + coords[i + 1][1]) / 3)
            ])
        }

        newCoords.unshift([0, newCoords[0][1]])

        for (let i = 1; i <= 8; i++) {
            newCoords.splice(i, 0, [
                (newCoords[i - 1][0] + newCoords[i][0]) / 2,
                (newCoords[i - 1][1] + newCoords[i][1]) / 2
            ])
        }

        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])
        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])
        newCoords.push([newCoords[newCoords.length - 1][0], newCoords[newCoords.length - 1][1]])

        return newCoords
    }

}










