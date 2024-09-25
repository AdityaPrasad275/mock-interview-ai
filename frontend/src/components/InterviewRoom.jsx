import { useState, useEffect, useRef } from 'react';
import Interviewer from './Interviewer';
import Reviewer from './Reviewer';
import User from './User';

const askLLM = async (endpoint, payload) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

const Interview = () => {
  const [messages, setMessages] = useState([{
    sender: "interviewer",
    content: {
      review: "None",
      next_question: "Tell me about yourself",
      explanation: "This is a common question to start with"
    }
  }]);
  const [systemDirections, setSystemDirections] = useState("Formulate an answer to the question and send it to the reviewer");
  const [state, setState] = useState(1);
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  let prev_question = "Tell me abt yourself";
  let prev_answer = "";

  const startChain = async (e) => {
    e.preventDefault();
    const user_ans = e.target[0].value;

    console.log(prev_question, prev_answer);

    if (state === 1) {
      prev_answer = user_ans;
      setMessages(prevMessages => [...prevMessages, { sender: "user", content: user_ans }]);
      await reviewerReviews();
      setSystemDirections("Now you have the option to iterate further on the answer and send it once again to the reviewer or send the final answer to the interviewer. Reply with just '1' to send the answer to the interviewer and '2' to iterate further");
      setState(2);
    } else if (state === 2) {
      if (user_ans == "1") {
        setState(3);
        setSystemDirections("Formulate an answer to the question and send it to the interviewer");
      } else if (user_ans == "2") {
        setState(1);
        setSystemDirections("Formulate an answer to the question and send it to the reviewer");
      } else {
        setSystemDirections("Invalid input, enter '1' to send the answer to the interviewer and '2' to iterate further");
      }
    } else if (state === 3) {
      prev_answer = user_ans;
      setMessages(prevMessages => [...prevMessages, { sender: "user", content: user_ans }]);
      console.log(messages);
      await interviewerAsks(prev_question);
      setSystemDirections("Formulate an answer to the question and send it to the reviewer");
      setState(1);
    }
    setNewMessage('');
    textareaRef.current.style.height = '40px'; // Reset height to minimum
  }

  const handleTextChange = (event) => {
    setNewMessage(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  async function interviewerAsks(prev_question){
    const response = await askLLM('/api/interviewer-asks', { prev_answer, prev_question });
    prev_question = response.next_question;
    setMessages(prevMessages => [...prevMessages, { sender: "interviewer", content: response }]);
  }

  async function reviewerReviews(){
    const response = await askLLM('/api/reviewer-reviews', { prev_question, prev_answer });
    setMessages(prevMessages => [...prevMessages, { sender: "reviewer", content: response }]);
  }

  return ( 
    <>
      <div className='chat-container'>
        <div className="messages">
          {messages && messages.map((message, index) => {
            if (message.sender === "interviewer") {
              return (
                <div key={index} className='interviewer-message'>
                  <Interviewer props={message.content} />
                </div>
              )
            } else if (message.sender === "reviewer") {
              return (
                <div key={index} className='reviewer-message'>
                  <Reviewer props={message.content} />
                </div>
              )
            } else if (message.sender === "user") {
              return (
                <div key={index} className='user-message'>
                  <User props={message.content} />
                </div>
              )
            } else {
              return null;
            }
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <div className='system-message'>
            {systemDirections}
          </div>
          <form onSubmit={startChain}>
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleTextChange}
              placeholder="Type your message..."
              rows="1"
              id="messageInput"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
   );
}
 
export default Interview;