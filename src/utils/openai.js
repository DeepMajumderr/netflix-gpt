// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";


// If using CRA (Create React App), use this instead:
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default model;
