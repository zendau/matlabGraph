const {spawn} = require('child_process')
const path = require('path')


module.exports = function(filePath) {
    return new Promise((res, rej) => {
        const  dataToSend = []
        try {
            const file = path.join(__dirname, '../..', filePath)
            console.log(file, `${__dirname}\\sub.py`)
            const pythonProcess = spawn('python3', [`${__dirname}/sub.py`, file])

            pythonProcess.stdout.on('data', function (data) {
                dataToSend.push(data.toString().replace("\n", "").replace("\r", ""))
            })
        
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    res(dataToSend)
                } else {
                    throw new Error(`Python error code - ${code}`)
                }
            })
        } catch (e) {
            rej(e)
        }
    })
}




