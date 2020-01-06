const HttpError = require("../errors/http");

const axios = require("axios");
const mailer = require("../lib/mailer");
module.exports = {
  sendMail: async (req, res, next) => {
    try {
      let mails = req.body;

      console.log(mails);
      if (!mails || !mails.length)
        throw new HttpError(400, "Email adresses not sent");

      if (mails.length > 1) {
        let response = await axios.get(
          "https://api.icndb.com/jokes/random/" + mails.length
        );
        for (let i = 0, len = response.data.value.length; i < len; i++) {
          let joke = response.data.value[i].joke;
          mailer(mails[i], joke);
        }
      } else {
        let response = await axios.get("https://api.icndb.com/jokes/random/");
        mailer(mails, response.data.value.joke);
      }

      res.send({
        status: "ok",
        data: "mail sent"
      });
    } catch (err) {
      next(err);
    }
  }
};
