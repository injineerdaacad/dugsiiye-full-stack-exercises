import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for a personal finance tracker backend",
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        SignUpInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Eng. Honest" },
            email: { type: "string", example: "honest@example.com" },
            password: { type: "string", example: "123456" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "honest@example.com" },
            password: { type: "string", example: "123456" },
          },
        },
        UpdateUserInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Eng. Honest" },
            email: { type: "string", example: "honest@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            isActive: { type: "boolean", example: true },
            profilePicture: {
              type: "string",
              nullable: true,
              example: "https://res.cloudinary.com/demo/image/upload/profile_pictures/avatar.jpg",
            },
          },
        },
        TransactionInput: {
          type: "object",
          required: ["title", "amount", "type", "category", "date"],
          properties: {
            title: { type: "string", example: "Monthly Salary" },
            amount: { type: "number", example: 2500 },
            type: { type: "string", enum: ["income", "expense"], example: "income" },
            category: { type: "string", example: "Work" },
            date: { type: "string", format: "date", example: "2026-03-23" },
          },
        },
        UpdateTransactionInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Salary" },
            amount: { type: "number", example: 2000 },
            type: { type: "string", enum: ["income", "expense"], example: "income" },
            category: { type: "string", example: "Work" },
            date: { type: "string", format: "date", example: "2026-03-23" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "6601bcf26f1f3a0012345678" },
            name: { type: "string", example: "Eng. Honest" },
            email: { type: "string", example: "honest@example.com" },
            role: { type: "string", example: "user" },
            isActive: { type: "boolean", example: true },
            profilePicture: {
              type: "string",
              nullable: true,
              example: "https://res.cloudinary.com/demo/image/upload/profile_pictures/avatar.jpg",
            },
          },
        },
        Transaction: {
          type: "object",
          properties: {
            _id: { type: "string", example: "6601bcf26f1f3a0012345678" },
            title: { type: "string", example: "Monthly Salary" },
            amount: { type: "number", example: 2500 },
            type: { type: "string", example: "income" },
            category: { type: "string", example: "Work" },
            date: { type: "string", format: "date-time" },
            createdBy: { type: "string", example: "6601bcf26f1f3a0012345678" },
            updatedBy: { type: "string", example: "6601bcf26f1f3a0012345678" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Category: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["income", "expense"], example: "expense" },
            name: { type: "string", example: "Food" },
          },
        },
        MonthlySummaryItem: {
          type: "object",
          properties: {
            category: { type: "string", example: "Work" },
            type: { type: "string", example: "income" },
            totalAmount: { type: "number", example: 2500 },
            transactionCount: { type: "integer", example: 1 },
          },
        },
        MonthlySummaryTotals: {
          type: "object",
          properties: {
            totalIncome: { type: "number", example: 2500 },
            totalExpense: { type: "number", example: 50 },
            netIncome: { type: "number", example: 2450 },
            profitOrLoss: { type: "string", example: "profit" },
          },
        },
        AdminOverview: {
          type: "object",
          properties: {
            totalUsers: { type: "integer", example: 12 },
            activeUsers: { type: "integer", example: 10 },
            adminUsers: { type: "integer", example: 1 },
            totalTransactions: { type: "integer", example: 54 },
            totalIncome: { type: "number", example: 12500 },
            totalExpense: { type: "number", example: 3200 },
            netIncome: { type: "number", example: 9300 },
            profitOrLoss: { type: "string", example: "profit" },
            topSpendingCategories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string", example: "Food" },
                  totalAmount: { type: "number", example: 500 },
                  transactionCount: { type: "integer", example: 8 },
                },
              },
            },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
            status: { type: "integer", example: 400 },
          },
        },
      },
    },
  },
  apis: ["./app.js", "./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
