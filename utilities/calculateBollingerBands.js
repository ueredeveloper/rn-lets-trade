var BB = require('technicalindicators').BollingerBands

const calculateBollingerBands = (period, values) => {

    var input = {
        period: period,
        values: values,
        stdDev: 2
    }
    return BB.calculate(input)
    

}

export { calculateBollingerBands }