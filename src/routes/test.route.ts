import BaseRoute from "../utils/base-route";

const { TestController } = require("../controllers");

const testController = new TestController();

class UserRoute extends BaseRoute {
  constructor() {
    super("/test");
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", testController.test);
  }
}

export default UserRoute;
