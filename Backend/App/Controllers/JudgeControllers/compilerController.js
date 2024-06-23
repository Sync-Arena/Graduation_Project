import axios from 'axios'
import fs from 'fs'
import { escape } from 'querystring'
import zipper from 'zip-local'
// to copmile code an object must be sent with important fields , with names
// id: the id of the compiler you want to use, as provided most important ones are 54 for cpp, 71 for python and 62 for java
// code: the code to be compiled
// input: the input if exist
// answer: the right answer for the input
// checker : the code of the checker from polygon
// time_limit: if it is not send it will be 2 sec
// memory_limit: if it is not send it will be 128000 kilobytes
//note to make it work go to rapidapi then judge0 api their and subiscribe for free plan the put the the url and key to the env file
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//return : object with one of the following status
// {
//   "id": 2,
//   "description": "Processing"
// },
// {
//   "id": 3,
//   "description": "Accepted"
// },
// {
//   "id": 4,
//   "description": "Wrong Answer"
// },
// {
//   "id": 5,
//   "description": "Time Limit Exceeded"
// },
// {
//   "id": 6,
//   "description": "Compilation Error"
// },
// {
//   "id": 7,
//   "description": "Runtime Error (SIGSEGV)"
// },
// {
//   "id": 8,
//   "description": "Runtime Error (SIGXFSZ)"
// },
// {
//   "id": 9,
//   "description": "Runtime Error (SIGFPE)"
// },
// {
//   "id": 10,
//   "description": "Runtime Error (SIGABRT)"
// },
// {
//   "id": 11,
//   "description": "Runtime Error (NZEC)"
// },
// {
//   "id": 12,
//   "description": "Runtime Error (Other)"
// },
// {
//   "id": 13,
//   "description": "Internal Error"
// },
// and will have other status.pr string which is the final value to be printed returned from the checker
let folderName = './temp'

function stringToBase64(str) {
    // Encode the string to a Uint8Array using TextEncoder
    const utf8Encoder = new TextEncoder()
    const uint8Array = utf8Encoder.encode(str)

    // Convert the Uint8Array to a binary string
    let binaryString = ''
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i])
    }

    // Encode the binary string to Base64 using btoa
    return btoa(binaryString)
}

function decode(base64) {
    // Decode base64 to binary string
    const binaryString = atob(base64)

    // Convert binary string to Uint8Array
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }

    // Decode Uint8Array to string using TextDecoder
    const utf8Decoder = new TextDecoder('utf-8')
    return utf8Decoder.decode(bytes)
}
export const compile = async function (req) {
    let options = {
        method: 'POST',
        url: process.env.CompilerApiUrlK,
        params: {
            base64_encoded: 'true',
            wait: 'true',
            fields: '*',
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.CompilerApikeyK,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data: {
            language_id: req.id,
            source_code: stringToBase64(req.code),
            stdin: stringToBase64(req.input),
            expected_output: null,
            cpu_time_limit: 2,
            cpu_extra_time: 1,
            wall_time_limit: 20,
            stack_limit: 128000,
            memory_limit: 256000,
        },
    }
    // console.log(req)
    if (req.time_limit) options.data.cpu_time_limit = req.time_limit / 1000
    if (req.memory_limit) options.data.memory_limit = Math.min(options.data.memory_limit, req.memory_limit * 1000)

    try {
        // console.log(options)
        const rs = await axios.request(options)
        options.params.base64_encoded = 'false'
        // options.params.base64_encoded = 'true'
        // console.log(rs.data.message)
        rs.data.message = decode(rs.data.message)
        // console.log(rs.data)
        let ret = rs.data
        if (ret.status.id == 3) {
            options.data.language_id = 89
            options.data.source_code = ''
            options.data.stdin = ''
            ret.stdin = decode(ret.stdin)
            ret.stdout = decode(ret.stdout)
            // options.data.additional_files = data;
            options.data.cpu_time_limit = 15
            options.data.memory_limit = 256000
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName)
            }
            var folder2 = 't1-'
            folderName = folderName + '/' + folder2
            const cur = fs.mkdtempSync(folderName, (err, folder) => {
                if (err) throw err
            })
            //   console.log(cur);
            fs.copyFileSync('./util/testlib.h', cur + '/testlib.h')
            fs.copyFileSync('./util/compile', cur + '/compile')
            fs.copyFileSync('./util/run', cur + '/run')
            fs.writeFileSync(cur + '/input.txt', req.input)
            fs.writeFileSync(cur + '/answer.txt', req.answer)
            fs.writeFileSync(cur + '/output.txt', ret.stdout)
            fs.writeFileSync(cur + '/code.cpp', req.checker)
            zipper.sync
                .zip(cur)
                .compress()
                .save(cur + '/addfiles.zip')
            const dat = fs.readFileSync(cur + '/addfiles.zip', {
                encoding: 'base64',
            })
            options.data.additional_files = dat
            // console.log("eh");
            // console.log(ret);
            // console.log(options);
            let response2 = await axios.request(options)
            delete response2.data.additional_files
            // response2.data.message = atob(response2.data.message);
            // response2.data.stderr = atob(response2.data.stderr);
            ret.checker = response2.data
            // console.log(response2.data)
            if (response2.data.status.id != 3) {
                ret.status.id = 4
                ret.status.description = 'Wrong answer'
            }
            ret.status.pr = response2.data.stderr
            fs.rmSync(cur, { recursive: true })
            return ret
        } else return ret
    } catch (error) {
        console.log('err')
        console.error(error)
        throw error
    }
}
