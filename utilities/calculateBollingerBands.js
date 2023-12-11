var BB = require('technicalindicators').BollingerBands

const calculateBollingerBands = (period, candles) => {

    let closedCandles = candles.map((item) => parseFloat(item.close));

    var input = {
        period: period,
        values: closedCandles,
        stdDev: 2
    }
    let bb = BB.calculate(input)

    let bollingerBands = {
        upper: bb.map((item) => item.upper),
        middle: bb.map(item => item.middle),
        lower: bb.map(item => item.lower)
    }

    return bollingerBands;

}

export { calculateBollingerBands }