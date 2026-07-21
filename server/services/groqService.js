const Groq = require("groq-sdk");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const generateAIResponse = async (prompt) => {

  try {

    const completion = await groq.chat.completions.create({

      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content:
          "You are ExpenseHub AI, a helpful financial assistant. Give short and practical money advice.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

    });


    return completion.choices[0].message.content;


  } catch(error){

    console.log("Groq Error:");
    console.log(error.message);

    throw error;

  }

};


module.exports = generateAIResponse;