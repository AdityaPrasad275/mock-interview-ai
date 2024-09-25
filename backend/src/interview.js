const askLLM = require('./askLLM.js');


const parseResponse = (responseString) => {
  const jsonString = responseString.replace(/```json|```/g, '').trim();
  console.log(responseString);
  return JSON.parse(jsonString);
};

async function interviewer(req, res) {
  
  const resume = req.summarizedResume; // Access summarizedResume from req object

  const { prevQuestion, prevAnswer } = req.body;
  const question_prompt = `
    you're an expert interviwer and you are asking a candidate a question.
    Here's his summarised resume:
    <resume start>
     ${resume}
    <resume end>

    The previous question was 
    <prev_question start>
    ${prevQuestion}
    <prev_question end>

    The candidate's response was
    <prev_answer start>
    ${prevAnswer}
    <prev_answer end>

    Give us a response in the following json format
    {
      "review": "Your review here for the given answer",
      "next_question": "The next question to ask the candidate",
      "explanation": "Explanation of why the next question is being asked"
    }
  `;
  //console.log('question_prompt:', question_prompt);
  try {
    const responseText = await askLLM(question_prompt);
    const parsedResponse = parseResponse(responseText);
    res.json(parsedResponse);
  } catch (error) {
    console.error('Error in /api/interviewer-asks route:', error);
    res.status(500).json({ error: 'Error invoking LLM' });
  }
}

const reviewer = async (req, res) => {
  const resume = req.summarizedResume; // Access summarizedResume from req object
  
  const { prevQuestion, prevAnswer } = req.body;
  const review_prompt = `
    You are an expert career coach and you are reviewing a candidate's response to the question
    Given the question <question_start> ${prevQuestion} <question_end>, the candidate responded with <answer_start> ${prevAnswer} <answer_end>
    Here's his summarised resume:
    <resume start>
     ${resume}
    <resume end>
    Give us a response in the following json format
    {
      "review": "Your review here for the given answer",
      "improvement": "points of improvement, better wording, better phrasing etc",
      "model_answer": "The model answer to given question"
    }
  `;
  console.log('review_prompt:', review_prompt);
  try {
    const responseText = await askLLM(review_prompt);
    //console.log('responseText:', responseText);
    const parsedResponse = parseResponse(responseText);
    res.json(parsedResponse);
  } catch (error) {
    console.error('Error in /api/reviewer-reviews route:', error);
    res.status(500).json({ error: 'Error invoking LLM' });
  }
}

module.exports = { interviewer, reviewer };