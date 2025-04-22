# NestJS Microservices with Apollo Federation Gateway

A comprehensive guide for building a modern microservices architecture using NestJS, GraphQL, and Apollo Federation.

## Architecture Overview

Our system consists of three components:

| Service | Port | Description |
|---------|------|-------------|
| **Users Service** | 4001 | Federated GraphQL service for user-related functionality |
| **Posts Service** | 4002 | Federated GraphQL service for post-related functionality |
| **Gateway** | 4000 | Apollo Federation Gateway that unifies the services |

## Prerequisites

- Node.js (v14+)
- NPM or Yarn
- Basic knowledge of NestJS and GraphQL

## Getting Started

### Start the services

Open three separate terminal windows and run:

#### Users Service
```bash
cd users
npm install
npm run start
```

#### Posts Service
```bash
cd posts
npm install
npm run start
```

#### Gateway
```bash
cd gateway
npm install
npm run start
```

The services will be available at:
- Users Service: http://localhost:4001/graphql
- Posts Service: http://localhost:4002/graphql
- Gateway: http://localhost:4000/graphql

## How Apollo Federation Works

Apollo Federation allows you to build a unified graph from multiple services:

1. **Federated Services**: Each service defines its own GraphQL schema with federation directives
2. **Gateway Composition**: The Gateway dynamically composes the schemas into a unified graph
3. **Request Flow**: The Gateway routes query parts to appropriate services and assembles responses

## Example Schema Definitions

### Users Service Schema
```graphql
type User @key(fields: "id") {
  id: ID!
  firstName: String
  lastName: String
  fullName: String
}
```

### Posts Service Schema
```graphql
type Post {
  id: ID!
  title: String
  authorId: ID!
}

```

## Testing the API

To test the federation setup:

1. Ensure all three services are running
2. Navigate to `http://localhost:4000/graphql`
3. Execute this query:

```graphql
query Allposts {
    allposts {
        id
        title
        authorId
    }
    users {
        id
        firstName
        lastName
        fullName
    }
}

```

You should receive a unified response like:

```json
{
    "data": {
        "allposts": [
            {
                "id": "1",
                "title": "Hello World",
                "authorId": "1"
            },
            {
                "id": "2",
                "title": "GraphQL Rocks",
                "authorId": "2"
            }
        ],
        "users": [
            {
                "id": "1",
                "firstName": "John",
                "lastName": "Doe",
                "fullName": "John Doe"
            },
            {
                "id": "2",
                "firstName": "Jane",
                "lastName": "Smith",
                "fullName": "Jane Smith"
            }
        ]
    }
}
```

## Troubleshooting

- **Gateway doesn't start**: Ensure all federated services are reachable
- **Schema not loaded**: Confirm services are properly registered in the gateway configuration
- **Version compatibility**: Check compatibility between `@nestjs/graphql`, `@apollo/server`, and `@apollo/subgraph`
- **GraphQL introspection issues**: Enable playground and introspection in the gateway config

## Learn More

For more information about NestJS with Apollo Federation, visit the [NestJS documentation](https://docs.nestjs.com/graphql/federation).

## License

MIT
