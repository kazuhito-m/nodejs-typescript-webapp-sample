import Users from "./Users";

export default interface UserRepository {
    all(): Users;
}