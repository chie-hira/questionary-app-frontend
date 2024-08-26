export type Payload = {
    email: string;
    sub: number;
    iat: number; // token作成時間
    exp: number; // token有効期限
}
