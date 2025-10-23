import http from "http"

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John doe",
      email: "johndoe@gmail.com",
    })

    return res.writeHead(201).end("Criação de um usuário")
  }

  return res.end("Hello World")
})

server.listen(3333)
