import express = require("express");
import { applicationConfig } from "../../config";
import { dataSource } from "../database/dataSource";
import { Contacts } from "../entity/Contacts.entity";
import { ContactUsRequest } from "../entity/ContactUsRequest.entity";
import { AwsSesService } from "../services/aws_ses.service";
const router = express.Router();

const awsService = new AwsSesService();

router.post("/contacts", async (req, res) => {
  try {
    const { email, category } = req.body;
    const contact = await dataSource.getRepository(Contacts).findOne({
      where: {
        email,
        category,
      },
    });
    
    if (contact) {
      throw new Error(
        "You have already signed up to the newsletter with this email"
      );
    }

    const results = await dataSource
      .getRepository(Contacts)
      .save(req.body);

    return res.send(results);
  } catch (error) {
    return res.send({
      success: false,
      message: "Failed to perform action",
      error: {
        message: error.message,
      },
    });
  }
});

router.post("/contact-us", async (req, res) => {
  try {
    const { name, email, webLink, message } = req.body;
    const contactRequest = await dataSource
      .getRepository(ContactUsRequest)
      .findOne({
        where: {
          name,
          email,
          webLink,
          message,
        },
      });

    if (contactRequest) {
      throw new Error("Contact Request Already exists");
    }

    const results = await dataSource
      .getRepository(ContactUsRequest)
      .save(req.body);

    const body = `User with email ${email} and webLink ${webLink} says ${message}`;

    await awsService.sendSESEmail(
      applicationConfig.aws.senderEmail,
      applicationConfig.aws.recieverEmail,
      "New Contact Information",
      body,
      "Contact Information"
    );

    return res.send(results);
  } catch (error) {
    return res.send({
      success: false,
      message: "Failed to perform action",
      error: {
        message: error.message,
      },
    });
  }
});

export default router;
