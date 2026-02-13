const OpenAI = require("openai");
const logger = require("../utils/logger");

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN
});

exports.invokeLLM = async (payload) => {
  try {
    const { prompt, response_json_schema } = payload;

    logger.info("Invoking LLM");

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", // cheaper & good
      messages: [
        {
            role: "system",
            content: `
                        You are a professional REST API designer and JSON generator.

                        Your task is to generate realistic mock REST API endpoints based on the user's request.

                        Rules:
                        1. Always respond with strictly valid JSON.
                        2. Do not include explanations, markdown, or extra text.
                        3. Follow RESTful naming conventions.
                        4. Use realistic field names and sample data.
                        5. For list endpoints, return 3–5 items.
                        6. For single-resource endpoints, return a detailed object.
                        7. Ensure HTTP methods match the action (GET, POST, PUT, DELETE, PATCH).
                        8. Paths must be clean and RESTful (e.g., /users, /users/:id).
                        9. Status codes must be appropriate (200, 201, 204, etc.).
                        10. The output must match the provided JSON schema exactly.

                        If unsure, choose the most realistic and standard API structure.
            `
            },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4096
    });

    const content = response.choices[0].message.content;

    // Safely parse JSON
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      logger.error("Failed to parse LLM JSON", err);
      throw new Error("Invalid JSON response from AI");
    }

    logger.info("LLM response parsed successfully");

    return parsed;
  } catch (error) {
    logger.error("LLM invocation failed", error);
    throw error;
  }
};
