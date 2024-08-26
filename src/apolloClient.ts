import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// GraphQLサーバーに認証機能を使用してアクセスするために、
// リンクをつなぎ合わせてApollo Clientのデータフローをカスタマイズする

// GraphQLサーバーの宛先を指定するリンク
// apolloサーバー(graphqlのエンドポイント)のリンク
const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
    /*
    * "https://localhost:3000/graphql"だとエラー
    * POST https://localhost:3000/graphql net::ERR_SSL_PROTOCOL_ERROR
    * サーバーが適切にSSL/TLS（HTTPS）をサポートしていないことを示す
    */
});

// トークンをヘッダーに追加するリンク
const authLink = setContext((_, prevContext) => {
    const token = localStorage.getItem("token");
    return {
        // トークンがあるときはリクエストヘッダーにセット
        headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
