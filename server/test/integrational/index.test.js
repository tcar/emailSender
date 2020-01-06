/**
 * @jest-environment node
 */
const axios = require("axios");
const config = require("../config");
describe("test sending chuck noris jokes", () => {
  test("Error when no email sent", async () => {
    try {
      await axios({
        method: "post",
        url: `http://${config.host}:${config.port}/sendMail`
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data).toMatchObject({
        error: "Email adresses not sent"
      });
    }
  });

  test("Send joke to one email", async () => {
    let vote = await axios({
      method: "post",
      url: `http://${config.host}:${config.port}/sendMail`,
      data: ["validEmail@test.com"]
    });
    expect(vote.data).toMatchObject({
      status: "ok",
      data: "mail sent"
    });
  });

  test("Send joke to one email", async () => {
    let vote = await axios({
      method: "post",
      url: `http://${config.host}:${config.port}/sendMail`,
      data: ["validEmail@test.com", "validEmail2@test.com"]
    });
    expect(vote.data).toMatchObject({
      status: "ok",
      data: "mail sent"
    });
  });
});
