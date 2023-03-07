import * as AWS from "aws-sdk";
import { applicationConfig } from "../../config";

export class AwsSesService {
  constructor() {
    AWS.config.update({
      accessKeyId: applicationConfig.aws.accessKeyId,
      secretAccessKey: applicationConfig.aws.secretAccessKey,
      region: applicationConfig.aws.region,
    });
  }
  async sendSESEmail(
    senderEmail: string,
    recipientEmail: string,
    subject: string,
    body: string,
    sourcePrefix: string
  ) {
    const ses = new AWS.SES();

    const params = {
      Source: `${sourcePrefix} <${senderEmail}>`,
      Destination: {
        ToAddresses: [recipientEmail],
      },

      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: body,
            Charset: "UTF-8",
          },
        },
      },
    };
    ses.sendEmail(params, (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        console.log("Email sent successfully -->", data);
      }
    });

    console.log("EMAIL SENT");
  }
}
