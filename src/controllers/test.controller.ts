import { Request, Response } from 'express';
import { TestService } from "../services";

const testService = new TestService();

class TestController {
    test(req: Request, res: Response) {
        const data = testService.test();

        res.send(data);
    }
}

export default TestController;