import { randomUUID } from "crypto"

import { Database } from "./database.js"

import { buildRouteParams } from "./utils/build-route-params.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRouteParams("/users"),
    handler: (req, res) => {
      const users = database.select("users")

      return res.end(JSON.stringify(users))
    },
  },
  {
    method: "POST",
    path: buildRouteParams("/users"),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = { id: randomUUID(), name, email }

      database.insert("users", user)

      return res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    path: buildRouteParams("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update("users", id, { name, email })

      return res.writeHead(204).end()
    },
  },
  {
    method: "DELETE",
    path: buildRouteParams("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params

      database.delete("users", id)

      return res.writeHead(204).end()
    },
  },
]
