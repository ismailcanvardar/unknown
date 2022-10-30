import ethers from "ethers";
import { NextFunction, Request, Response } from "express";

class PublicKeyAuth {
  public recover(req: Request, res: Response, next: NextFunction) : void {
    try {
      const digestHeader = req.headers["authorization"];

      if (digestHeader) {
        const digest = digestHeader.split(" ");
        req.recoveredAddress = this.recoverAddress(digest[1], digest[2]);
        next();
      } else {
        res.send(403);
      }
    } catch (err) {
      res.send(500);
    }
  }

  private recoverAddress(digest: string, signature: string) : string {
    return ethers.utils.getAddress(
      ethers.utils.recoverAddress(digest, signature)
    );
  }
}

export default PublicKeyAuth;
