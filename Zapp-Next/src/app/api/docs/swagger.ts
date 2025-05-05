import { createSwaggerSpec } from 'next-swagger-doc';

const apiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Zapp API Documentation',
    version: '1.0.0',
    description: 'API documentation for Zapp application',
    contact: {
      name: 'hussainkazemian',
      email: 'hussainkazemian@example.com'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Development server'
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/auth/login': {
      post: {
        summary: 'Authenticate user and receive access token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  password: {
                    type: 'string',
                    format: 'password'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successfully authenticated'
          }
        }
      }
    }
  }
} as const;

export function getApiDocs() {
  return createSwaggerSpec({
    definition: apiConfig,
    apiFolder: 'src/app/api'
  });
}

export default apiConfig;