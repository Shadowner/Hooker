import { UserModel } from "../models/UserModel";
import BaseService from "./BaseService";

class UserService extends BaseService<UserModel> {
    constructor() {
        super(UserModel);
    }
}

export default new UserService();