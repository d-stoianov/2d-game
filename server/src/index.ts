import { createServer } from "http"

const PORT = 8080

const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("Server is live")
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
