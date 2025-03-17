const path = require("path");
const swaggerDoc = require("swagger-jsdoc");
//config swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "mk api",
      version: "1.0.0",
      description: `only has user apis and will add more`,
    },
    components: {
      securitySchemes: {
        XSRFTokenScheme: {
          type: "apiKey",
          in: "header",
          name: "x-xsrf-token", 
          description: "Enter your XSRF token in the header"
        }
      },
    },
  },
  apis: [path.join(__dirname, "../router/*.js")],
};

const swaggerSpec = swaggerDoc(options);

module.exports = swaggerSpec;
