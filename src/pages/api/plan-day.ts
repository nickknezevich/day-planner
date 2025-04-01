import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tasks } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  type TaskItem = {
    taskName: string;
    startTime: string;
    endTime: string;
    rationales: string[];
  };
  const prompt = `Given the following tasks: ${tasks.join(
    ", "
  )}, create an optimal schedule for the day, explaining why tasks are ordered in this way. Return Return the response as a JSON array in the following format: type TaskItem = {
  taskName: string;
  startTime: string;
  endTime: string;
  rationales: string[];
};`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      text: {
        format: {
          type: "text",
        },
      },
      reasoning: {},
      tools: [],
      temperature: 1,
      max_output_tokens: 500,
      top_p: 1,
      store: true,
    });

    res
      .status(200)
      .json({ response: extractJsonArrayFromResponse(response.output_text) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate plan" });
  }

  function extractJsonArrayFromResponse(response: string): TaskItem[] {
    const jsonBlockMatch = response.match(/```json\s*([\s\S]+?)\s*```/);
    if (!jsonBlockMatch) {
      console.warn("No JSON block found in the response.");
      return [];
    }

    const jsonString = jsonBlockMatch[1];

    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  }
}
