import { getUser, logIn, signUp } from "../../helper/user";

describe('Login', () => {
    let user; 
    beforeEach(() => {
    user = getUser("admin");
    });
    it('should sign up and login', async () => {
        try{
        // Sign up the user function
        const res = await signUp(user)
        expect(res.status).toBe(201)

        const loginRes = await logIn(user)
        expect(loginRes.status).toBe(200);
        console.log(loginRes.body);
        } catch (error) {
            console.error(error);
            throw error; // re-throw the error to fail the test
        }
    });

    it('should sign up and login', async () => {
    // Sign up the user function
    return signUp(user).then((res) => {
        console.log(res.body);
        expect(res.status).toBe(201);
        expect(res.body.data.user.email).toBe(user.email.toLowerCase());
        expect(res.body.status).toBe("success");
        return logIn(user);
    })
    .then(loginRes => {
        console.log(loginRes.body, "login");
        expect(loginRes.status).toBe(200);
        expect(loginRes.body.data.user.email).toBe(user.email.toLowerCase());
        expect(loginRes.body.status).toBe("success");
    });
});
    
    it('should signup, and login using .end()', (done) => {
        // Sign up the user function
        signUp(user).end((err, res) => {
            if (err) return done(err);
            expect(res.body.data.user.email).toBe(user.email.toLowerCase());
            expect(res.body.status).toBe("success");
            logIn(user).end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.user.email).toBe(user.email.toLowerCase());
                expect(res.body.status).toBe("success");
            });
            done();
        });     
    });
});    