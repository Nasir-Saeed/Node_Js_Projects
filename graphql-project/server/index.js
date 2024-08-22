const express = require("express")
const { ApolloServer } = require("@apollo/server")
const bodyParser = require("body-parser")
const { expressMiddleware } = require("@apollo/server/express4")
const cors = require("cors")

const { USERS } = require("./user")
const { TODOS } = require("./todo")

const PORT = 8000

async function startServer() {
    const app = express()
    const server = new ApolloServer({
        typeDefs: `
            type User{
                id: ID!
                name: String!
                username: String!
                email: String!
                website: String!
                phone: String!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,
        resolvers: {
            Todo: {
                user: (todo) => USERS.find((e) => e.id === todo.id)
            },
            Query: {
                getTodos: () => TODOS,
                getAllUsers: () => USERS,
                getUser: (parent, { id }) => USERS.find((e) => e.id === id)
            }
        }
    });

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use('/graphql', expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server Running At PORT ${PORT}`)
    })

}

startServer()