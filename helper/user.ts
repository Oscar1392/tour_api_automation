import { faker } from "@faker-js/faker";
import * as supertest from "supertest";
import { User } from "../helper/interface";

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

export function getUser(role:string, overrides: Partial<User> = {}): User {
    const randomUser = createRandomUser();
    const password = "Test12345";
    const baseUser: User = {
        name: randomUser.username,
        email: randomUser.email,
        password: password,
        passwordConfirm: password,
        role: role
    }
    return { ...baseUser, ...overrides };
}

export function createRandomUser() {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
};

export function deleteUser(cookie:string){
    return request.delete('/deleteMe').set('Cookie', cookie);
}

export async function updateUser(updateData: Partial<User>, token: string){
    const res = await request.patch('/updateMe')
    .set('Authorization', `Bearer ${token}`)
    .send(updateData)
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    return res.body.data.user;
}

export async function uploadUserPhoto(filePath: string, token: string) {
    const res = await request
    .patch('/updateMe')
    .set('Authorization', `Bearer ${token}`)
    .attach('photo', filePath);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    return res.body.data.user.photo;
}
