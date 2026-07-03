export const config = {
  app: {
    name: "Next.js Exercise 4 - Task Management",
    description: "Next.js task management built with Next.js Server Actions",
  },

  mongodb: {
    uri: process.env.MONGODB_URI ?? "", dbName: "todo_app",
  },
} as const;
