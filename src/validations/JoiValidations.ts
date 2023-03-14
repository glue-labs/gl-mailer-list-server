import joi = require("joi");

export const contactsSchemaValidator = (
  req: { body: any },
  res: {
    send: (arg0: {
      success: boolean;
      message: string;
      error: { message: string };
    }) => any;
  },
  next: () => void
) => {
  const schema = joi
    .object()
    .keys({
      email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      }),
      category: joi.string(),
    })
    .unknown(false);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send({
      success: false,
      message: "Validation Error",
      error: {
        message: error.message,
      },
    });
  } else {
    next();
  }
};

export const contactUsSchemaValidator = (
  req: { body: any },
  res: {
    send: (arg0: {
      success: boolean;
      message: string;
      error: { message: string };
    }) => any;
  },
  next: () => void
) => {
  const schema = joi
    .object()
    .keys({
      name: joi.string(),
      email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      }),
      webLink: joi.string(),
      message: joi.string(),
    })
    .unknown(false);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send({
      success: false,
      message: "Validation Error",
      error: {
        message: error.message,
      },
    });
  } else {
    next();
  }
};
