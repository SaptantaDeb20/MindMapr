# MindMapr

MindMapr is a web application that transforms raw machine learning notes into clear, visual concept maps. It helps learners understand how core ML concepts relate to each other rather than memorizing isolated definitions.

The application uses Google Gemini as a reasoning engine to extract key concepts from free-form text and infer prerequisite relationships between them. These relationships are visualized as an interactive concept graph.

---

## Problem

Machine learning concepts such as bias, variance, overfitting, and regularization are often taught independently. This makes it difficult for learners to understand how these ideas connect and build upon each other, leading to shallow understanding and confusion.

---

## Solution

MindMapr addresses this problem by:
- Extracting meaningful machine learning concepts from raw notes
- Identifying conceptual dependencies between those concepts
- Rendering an interactive visual graph that shows how ideas are connected

This allows learners to build stronger mental models and understand machine learning more intuitively.

---

## How It Works

1. The user pastes machine learning notes into the application
2. Google Gemini extracts key conceptual terms from the text
3. A pruning and validation layer filters noisy or irrelevant concepts
4. Gemini infers prerequisite or causal relationships between concepts
5. The frontend visualizes the result as an interactive concept graph

---

## Gemini Integration

Google Gemini is central to the application. It is used for:
- Semantic concept extraction from unstructured text
- Reasoning about relationships between machine learning concepts

Carefully designed prompts and response-cleaning logic ensure that the output is structured, reliable, and suitable for educational visualization.

---

## Tech Stack

### Frontend
- Next.js (React)
- TypeScript
- React Flow (graph visualization)

### Backend
- Node.js
- Express.js

### AI / APIs
- Google Gemini API

### Tools
- Git
- GitHub
- VS Code

---

## Running Locally

### Prerequisites
- Node.js (v18 or later)
- A Google Gemini API key

### Setup

Clone the repository:
```bash
git clone https://github.com/SaptantaDeb20/MindMapr.git
cd MindMapr

#Install dependencies for both frontend and backend:
cd frontend
npm install

cd ../backend
npm install

#Create a .env file in the backend directory:
GEMINI_API_KEY=your_api_key_here

#Run the backend:
cd backend
node server.js

#Run the frontend:
cd frontend
npm run dev

#Open the application at:
http://localhost:3000


