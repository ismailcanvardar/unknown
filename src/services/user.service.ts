import { prisma } from "../utils/prisma";
import { Prisma } from "@prisma/client";

interface IUserService {
  login(args: ILoginArgs): Promise<any>;
  getUser(args: IGetUserArgs): Promise<any>;
  saveUser(args: ISaveUserArgs): Promise<any>;
}

interface ILoginArgs {
  username: string;
  password: string;
}

interface IGetUserArgs {
  idOrUsername: string;
}

interface ISaveUserArgs {
  email: string;
  username: string;
  password: string;
}

class UserService implements IUserService {
  async login(): Promise<any> {
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getUser(args: IGetUserArgs): Promise<any> {
    try {
      return await prisma.user.findFirst({
        where: {
          OR: [{ id: args.idOrUsername }, { username: args.idOrUsername }],
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async saveUser(args: ISaveUserArgs): Promise<any> {
    try {
      return await prisma.user.create({
        data: {
          username: args.username,
          email: args.email,
          password: args.password,
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default UserService;
