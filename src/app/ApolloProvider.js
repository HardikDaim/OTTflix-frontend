// src/app/ApolloProvider.js
'use client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const graphqlUri = process.env.NEXT_PUBLIC_GRAPHQL_URI;

const client = new ApolloClient({
  uri: graphqlUri,  
  cache: new InMemoryCache(),
});


const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloProviderWrapper;
