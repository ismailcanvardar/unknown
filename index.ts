require("dotenv").config();

import { TestRoute } from "./src/routes";

import App from "./src/utils/app";

const app = App.getInstance([new TestRoute()]);

app.listen();
