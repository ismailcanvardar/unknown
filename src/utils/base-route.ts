import { Router } from "express";

class BaseRoute {
  private _basePath: string;
  private _router: Router;

  constructor(_basePath: string) {
    this._basePath = _basePath;
    this._router = Router();
  }

  get basePath() {
    return this._basePath;
  }

  get router() {
    return this._router;
  }
}

export default BaseRoute;
