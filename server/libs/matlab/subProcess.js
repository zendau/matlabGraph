const {spawn} = require('child_process')



module.exports = function(fileName) {
    return new Promise((res, rej) => {
        const  dataToSend = []
        try {
            const pythonProcess = spawn('python', [__dirname +'\\sub.py', fileName])

            pythonProcess.stdout.on('data', function (data) {
                dataToSend.push(data.toString())
            })
        
            pythonProcess.on('close', (code) => {
                // Закрытие с кодом 0
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




