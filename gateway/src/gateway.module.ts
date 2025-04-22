// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloServer } from 'apollo-server-express'; // Apollo Server
// import { ApolloFederationDriver } from '@nestjs/apollo'; // Correct Federation Driver

// @Module({
//   imports: [
//     GraphQLModule.forRoot({
//       driver: ApolloFederationDriver,
//       gateway: {
//         serviceList: [
//           { name: 'users', url: 'http://localhost:4001/graphql' },
//           { name: 'posts', url: 'http://localhost:4002/graphql' },
//         ],
//         buildService({ name, url }) {
//           return {
//             // Customize the service to handle any special needs, like caching
//             async willSendRequest({ request, context }) {
//               // example of adding some context or headers
//               request.http.headers.set('authorization', 'Bearer some-token');
//             },
//           };
//         },
//       },
//       server: {
//         cors: true,
//       },
//     }),
//   ],
// })
// export class GatewayModule {}
// //

import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        // cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:4001/graphql ' },
            { name: 'posts', url: 'http://localhost:4002/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
