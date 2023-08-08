import { Get, Route } from 'tsoa';

interface HelloResponse {
    message: string;
}

@Route('hello')
export default class PingController {
    @Get('/')
    public async getHello(): Promise<HelloResponse> {
        return {
            message: 'hello',
        };
    }
}
