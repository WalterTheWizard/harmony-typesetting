import express from "express"
import fs from "fs"
import { execFileSync } from "child_process"
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("Harmony Typesetting backend is running")
})

app.get("/compile", (req, res) => {
    const message = `\\version "2.24.3" 
    { c4 d4 e4 f4 }`
    execFileSync("lilypond", ["--svg", "temp.ly"])
    const svg = fs.readFileSync("temp.svg", "utf8")
    fs.writeFileSync("temp.ly", message)
    res.type("image/svg+xml")
    res.send(svg)
})

app.listen(port, () => {
    console.log(`Harmony Typesetting backend running on port ${port}`)
})

