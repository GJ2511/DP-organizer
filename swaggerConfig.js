import swaggerJSDoc from 'swagger-jsdoc';
// swagger definition
const swaggerDefinition = {
    info: {
      title: 'DP Organizer Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    }
  };
  
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/v1/*.js'],
  };
  
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  export default swaggerSpec;