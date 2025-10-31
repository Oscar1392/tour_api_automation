import { faker } from "@faker-js/faker";
import * as supertest from "supertest";

const request = supertest('http://localhost:8002/api/v1/users');

export function signUp(user:string | object | undefined){
    return request.post("/signup").send(user);
}

export function logIn(user:{
    email:string,
    password:string
}){
    return request.post("/login").send({
        email: user.email,
        password: user.password
    });
}

export function getUser(role:string) {
    const randomUser = createRandomUser();
    const password = "Test12345";
    return {
        name: randomUser.username,
        email: randomUser.email,
        password: password,
        passwordConfirm: password,
        role: role
    }
}

export function createRandomUser() {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
};

