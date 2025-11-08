import { deleteUser, getUser, logIn, signUp } from "../../helper/user";
import { User } from "../../helper/interface";



describe('Login', () => {
    // let user; 
    // beforeEach(() => {
    // user = getUser("admin");
    // });
    const user: User = getUser("admin");
    let cookie: string;
    it('should sign up and login', async () => {
        try{
        // Sign up the user function
        const res = await signUp(user)
        expect(res.status).toBe(201)

        const loginRes = await logIn(user)
        expect(loginRes.status).toBe(200);
        console.log(loginRes.body);
        cookie = loginRes.headers['set-cookie'][0].split(',')[0];
        const deleteRes = await deleteUser(cookie);
        expect(deleteRes.status).toBe(200);
        const loginResAfterDelete = await logIn(user);
        expect(loginResAfterDelete.status).toBe(401);
        } catch (error) {
            console.error(error);
            throw error; // re-throw the error to fail the test
        }
    });

    it("should sign up and login using .then()", () => {
    // Sign up the user function
    return signUp(user).then((res) => {
        console.log(res.body);
        expect(res.status).toBe(201);
        expect(res.body.data.user.email).toBe(user.email.toLowerCase());
        expect(res.body.status).toBe("success");
        return logIn(user);
    })
    .then((loginRes) => {
        console.log(loginRes.body, "login");
        expect(loginRes.status).toBe(200);
        expect(loginRes.body.data.user.email).toBe(user.email.toLowerCase());
        expect(loginRes.body.status).toBe("success");
        cookie = loginRes.headers['set-cookie'][0].split(',')[0];
        return deleteUser(cookie);
    })
    .then((deleteRes) => {
        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.message).toBe("User deleted successfully");
        return logIn(user);
    })
    .then((loginResAfterDelete) => {
        expect(loginResAfterDelete.status).toBe(401);
        expect(loginResAfterDelete.body.message).toBe("Incorrect email or password");
    })
});
    
    it.only('should signup, and login using .end()', (done) => {
        // Sign up the user function
        signUp(user).end((err, res) => {
            if (err) return done(err);
            expect(res.body.data.user.email).toBe(user.email.toLowerCase());
            expect(res.body.status).toBe("success");
            logIn(user).end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.user.email).toBe(user.email.toLowerCase());
                expect(res.body.status).toBe("success");
                cookie = res.headers['set-cookie'][0].split(',')[0];
                return deleteUser(cookie).end((err, deleteRes) => {
                    if (err) return done(err);
                    expect(deleteRes.body.message).toBe("User deleted successfully");
                    expect(deleteRes.statusCode).toBe(200);
                    return logIn(user).end((err, loginResAfterDelete) => {
                        if (err) return done(err);
                        expect(loginResAfterDelete.status).toBe(401);
                        expect(loginResAfterDelete.body.message).toBe("Incorrect email or password");
                        done();
                    });
            });
        });
        });     
    });
});    