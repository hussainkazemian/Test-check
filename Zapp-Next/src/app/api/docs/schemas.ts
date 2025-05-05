export const schemas = {
    Car: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'integer' },
        status: { 
          type: 'string',
          enum: ['available', 'in_use', 'maintenance']
        },
        lastUpdate: { 
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string' },
            message: { type: 'string' },
            details: { type: 'object' }
          }
        }
      }
    }
  };
  
  export default schemas;