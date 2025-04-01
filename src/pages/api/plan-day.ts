import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  const prompt = `Given the following tasks: ${tasks.join(', ')}, create an optimal schedule for the day, explaining why tasks are ordered in this way. Return Return the response as a JSON array in the following format: type TaskItem = {
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
        "format": {
          "type": "text"
        }
      },
      reasoning: {},
      tools: [],
      temperature: 1,
      max_output_tokens: 500,
      top_p: 1,
      store: true
    });

    //const response = "Here's an optimal schedule for the day based on the tasks you've provided:\n\n### Schedule:\n\n1. **Go to the shooting range**: Morning (9:00 AM - 12:00 PM)\n2. **Lunch and relax**: (12:00 PM - 1:00 PM)\n3. **Free time / Explore options**: (1:00 PM - 4:00 PM)\n4. **Watch the sunset at the beach**: Evening (5:30 PM - 7:30 PM)\n\n### Explanation:\n\n1. **Go to the shooting range (9:00 AM - 12:00 PM)**: \n   - Morning is typically the best time for activities that require focus and alertness. Going early ensures that you complete this task first while your energy levels are high. The shooting range is often less crowded in the morning, allowing for a more enjoyable experience.\n\n2. **Lunch and relax (12:00 PM - 1:00 PM)**: \n   - After an engaging morning, it’s important to take a break. Lunch gives you a chance to recharge, enjoy some food, and reflect on your morning activities. It also provides mental space to think about what you might want to do in your free time.\n\n3. **Free time / Explore options (1:00 PM - 4:00 PM)**: \n   - Having a block of open time allows for flexibility. Since you're uncertain about what to do next, this period can be used to explore different activities. You might decide to visit a nearby café, go for a walk, or catch up on personal projects. You can also check local events or attractions that might interest you.\n\n4. **Watch the sunset at the beach (5:30 PM - 7:30 PM)**: \n   - This task is best placed in the evening because sunsets are naturally time-sensitive. By scheduling it after your free time, you ensure you have ample time to unwind and get to the beach. Arriving an hour before the sunset allows for a relaxed experience—finding a good spot, enjoying the ambiance, and preparing for the beautiful view.\n\nThis schedule provides a balanced approach, allowing for productivity, relaxation, and enjoyment of the sunset in a sensible order.";
    //const response = parseTextToScheduleArray(text);
    
   
    console.log("RES", response.output_text)
    //console.log("Response", response)
    res.status(200).json({ response: extractJsonArrayFromResponse(response.output_text) });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to generate plan' });
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