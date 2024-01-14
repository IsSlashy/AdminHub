import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions,  split,  InMemoryCache,  ApolloLink,} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

const uri = environment.api_url; // <-- add the URL of the GraphQL server here
//const uri = 'http://localhost:5678/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem("access-token");

    if (token === null) {
      console.log('le token est null');
      return {};
    } else {
      const decoded: any = token === '' ? null :  jwt_decode(token)
      if ((Date.now()/1000 >= decoded.exp)) {
        localStorage.removeItem('access-token');
        return {}
      } else {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    }
  });
  const http = httpLink.create({ uri });

  // Create a WebSocket link:
  const token = localStorage.getItem('access-token');
  const ws = new WebSocketLink({
  uri: environment.ws_url,
  //uri: `ws://localhost:5678/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const transport = split(
    // split based on operation type
    ({ query }) => {
      interface Definintion {
        kind: string;
        operation?: string;
      }
      const { kind, operation }: Definintion = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );
  const cache = new InMemoryCache();
  const link = ApolloLink.from([basic, auth, transport]);

  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
