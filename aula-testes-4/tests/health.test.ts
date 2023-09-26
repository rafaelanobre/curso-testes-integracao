import app from "../src/index";
import supertest from 'supertest';

describe("Health GET", () => {
    it("health is okay shoud return 200", async () =>{
        const result = await supertest(app).get("/health");
        const status = result.status;
        
        expect(status).toEqual(200);
    })
})