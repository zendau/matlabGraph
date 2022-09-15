/* eslint-disable no-unused-vars */
const {spawn} = require('child_process')
import * as path from 'path'
import fs from 'fs'

export default function (filePath) {
    return new Promise((res, rej) => {
        const dataToSend = []
        try {

            // eslint-disable-next-line no-undef
            let fileContents = path.join(__static, 'libs')
            const pythonProcess = spawn(`${fileContents}/sub.exe`, [filePath])

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
            // pythonProcess.stdout.on('data', function (data) {
            //     dataToSend.push(data.toString().replace("\n", "").replace("\r", ""))
            // })

            // pythonProcess.on('close', (code) => {
            //     if (code === 0) {
            //         res(dataToSend)
            //     } else {
            //         throw new Error(`Python error code - ${code}`)
            //     }
            // })
        } catch (e) {
            rej(e)
        }
    })
}




