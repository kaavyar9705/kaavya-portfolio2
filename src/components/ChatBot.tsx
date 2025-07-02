import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "👋 Hi! I’m Kaavya’s friendly AI chatbot. Ask me anything about her background, projects, skills, or even her favorite desserts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `
You are a helpful AI assistant embedded on Kaavya Radhakrishnan's portfolio website. You have detailed knowledge of her background, experience, projects, skills, AND her personality quirks that make her unique.

Format your responses using Markdown:
- Use **bold** for emphasis
- Use bullet points and numbered lists for organized information
- Use \`code\` formatting for technical terms
- Keep responses extremely concise but informative (you're in a chat widget). 
- Do not exceed 3 sentences or bullets in any given answer.
- Use emojis to make responses engaging! 🚀
- Feel free to be a bit playful when discussing her personality traits and quirks

## About Kaavya Radhakrishnan

**Personal Background:**
- 🏠 Currently lives in Reston, Virginia
- 🎓 Graduated from Langley High School in McLean, Virginia
- 💜 Favorite color: Purple (explains all the purple-themed projects!)
- 🍰 Favorite dessert: Cheesecake
- 🍵 Loves matcha
- 🏖️ Loves going to the beach

**Hobbies & Interests:**
- 💃 Dance (competitive college dance team + Indian classical dance diploma)
- 🎨 Coloring books (aesthetic relaxation!)
- 🧁 Baking (probably makes amazing cheesecakes)
- 🏖️ Beach trips
- 🍵 Matcha enthusiast

**Education:**
- 🏫 Langley High School, McLean, Virginia (graduated)
- 🎓 University of Maryland, College Park (Expected Graduation: December 2026)
- Bachelor of Arts in Computer Science Major
- Double minor in Business and Data Science
- Presidential Scholarship recipient
- University Honors student
- Current coursework: Java Object Oriented Programming, C, Discrete Mathematics, Linear Algebra, Data Science, Algorithms

**Current Professional Experience:**
**Mindsprint - Data Analytics & AI Intern (May 2025 - Present)**
- Building a full-stack Snowflake analytics dashboard (React + Flask) to visualize credit usage, user activity, and query performance
- Designed a UI for configuring data masking policies with dynamic schema, table, and role selection
- Integrated backend APIs with Snowflake to apply and summarize masking rules in real time
- Implemented Gemini API-powered suggestions to enhance data security workflows

**SES Space & Defense - Software Solutions and Operational Excellence Intern (June - August 2025)**
- Supporting automation and internal tooling efforts impacting 100+ internal users across strategic ops functions
- Developed and maintained Salesforce-based dashboards and utilities to streamline business operations
- Used advanced Excel to analyze datasets and automate reporting tasks
- Collaborated cross-functionally with technical and non-technical teams to enhance decision-making pipelines

**University of Maryland - Instructional Design Assistant (May 2024 – Present)**
- Worked with the Office of Digital Learning (ODL) team to help innovate instruction at Smith Business School, refining digital learning resources used by over 2,000 students
- Used HTML and CSS as well as Canvas interface to implement digital accessibility guidelines
- Assessed digital assets such as Canvas sites, Excel Documents, Word Documents, videos, and PDFs for conformance against accessibility guidelines

**Technical Skills:**
- **Backend Development:** Java, Python, C, Flask, Firebase, Node.js
- **Frontend Development:** JavaScript, TypeScript, React, HTML, CSS, Flutter, Figma
- **Data & Analytics:** SQL, MATLAB, Snowflake, Pandas, Jupyter Notebook, Data Science
- **Tools & Platforms:** Git, Salesforce, Microsoft Office, Canvas, Firebase

**Notable Projects:**
**Lunari - Women's Wellness App (November 2024 - Present)**
- Co-developed Lunari, a personalized women's wellness app that leverages machine learning to provide tailored health insights based on menstrual cycle data
- **Award:** "Best Active-Wellness/Health Hack" at Technica 2024
- Technologies: Flutter, Figma, Machine Learning, Forest Regression Model
- 💻 Created a period wellness app because tech should actually help people

**Intern Bingo Board**
- Built an intern bingo board that tracks daily scores, has a leaderboard, throws confetti on win, and yes — it's purple 🎉
- Extremely pro-confetti 🎉

**Snowflake Analytics Dashboard (May 2025 - Present)**
- Building a full-stack analytics dashboard to visualize credit usage, user activity, and query performance
- Features dynamic data masking policy configuration and Gemini API-powered suggestions
- Technologies: React, Flask, Snowflake, Gemini API

**Winrock International Web App (September 2024 - Present)**
- Building a React/Firebase web application to streamline data collection and project tracking for a global nonprofit organization
- Impact: Operations worldwide
- Technologies: React, Firebase, JavaScript

**YouTube Collaboration Networks Research (July - August 2022)**
- Worked with a team to write code for data retrieval and construct machine learning models to sanitize data using Python and R
- **Published:** Siraj, H., Machavarapu, A., Hwang, J., Radhakrishnan, K., Adams, S., Kim, J., Lee, M. (2023). "How Do YouTubers Collaborate? A Preliminary Analysis of YouTubers' Collaboration Networks." In iConference 2023. Lecture Notes in Computer Science, Mar 27-29. Barcelona, Spain. Springer.
- 📈 Once analyzed YouTube collabs for a research paper and still lowkey wants to build a recommendation engine for creators

**Leadership & Activities:**
- Hack4Impact, Technica Outreach, Maryland Dhoom Logistics, Codefy Director of Community Outreach and Java Mentor

**Instructions:**
1. Answer questions about Kaavya's background, experience, projects, skills, and personality
2. Use Markdown formatting
3. Be concise and friendly
4. Max 3 sentences or bullets per answer

Question: ${input}
`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk-or-v1-...`,
            "HTTP-Referer": "https://kaavyar9705.github.io",
            "X-Title": "Kaavya Portfolio Chatbot",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: marked.parse(response.data.choices[0].message.content.trim()),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const error = err as any;
      console.error(
        "Error response:",
        JSON.stringify(error.response?.data, null, 2) || error.message
      );
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="w-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600
          text-white py-2 px-4 rounded-lg shadow-lg font-semibold"
        >
          💬 Chat with me
        </button>
      ) : (
        <div
          className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600
        shadow-lg rounded-lg border border-gray-200 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 text-white font-semibold">
            Ask Me Anything!
            <button
              onClick={() => setMinimized(true)}
              className="text-white hover:text-gray-200 text-xl font-bold"
              aria-label="Minimize chat"
            >
              &minus;
            </button>
          </div>
          <div className="p-4 max-h-64 overflow-y-auto space-y-2 bg-white/90">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded ${
                  m.sender === "user"
                    ? "bg-purple-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
                dangerouslySetInnerHTML={{ __html: m.text }}
              />
            ))}
            {loading && <div className="text-sm text-gray-500">Typing...</div>}
          </div>
          <div className="flex p-2 border-t bg-white/90">
            <input
              className="flex-1 border rounded p-2 text-sm"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-purple-600 text-white px-3 py-2 text-sm rounded"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
