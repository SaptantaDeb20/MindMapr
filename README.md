# MindMapr

🧠 MindMapr – Visual ML Concept Mapping with Gemini
💡 Inspiration

Many computer science and machine learning students struggle not because concepts are difficult, but because relationships between concepts are unclear.

Topics like bias, variance, overfitting, and regularization are often memorized independently instead of being understood as a connected system.

MindMapr was built to solve this by turning raw ML notes into a structured visual concept map.


🚀 What it does

MindMapr takes unstructured machine learning notes and:

Extracts key ML concepts using Google Gemini

Identifies prerequisite and dependency relationships

Displays everything as an interactive visual graph

Uses color-coding to clearly distinguish:

🔴 Problems (Bias, Variance, Overfitting)

🟡 Derived concepts (High bias, High variance)

🟢 Solutions (Regularization, L1, L2)


How we built it

Frontend: Next.js (React + TypeScript)

Backend: Node.js + Express

AI: Google Gemini API

Visualization: React Flow

User Notes → Gemini → Concept Extraction
           → Pruning & Validation
           → Dependency Detection
           → Visual Graph Rendering


Challenges we ran into

AI output noise: Gemini can return extra concepts, so we built a pruning layer to keep graphs concise.

API rate limits: The Gemini free tier has strict quotas, so we implemented graceful fallbacks to ensure the app never breaks.

Visual clarity: Balancing enough detail without cluttering the graph required multiple iterations.


Challenges we ran into

AI output noise: Gemini can return extra concepts, so we built a pruning layer to keep graphs concise.

API rate limits: The Gemini free tier has strict quotas, so we implemented graceful fallbacks to ensure the app never breaks.

Visual clarity: Balancing enough detail without cluttering the graph required multiple iterations.


Challenges we ran into

AI output noise: Gemini can return extra concepts, so we built a pruning layer to keep graphs concise.

API rate limits: The Gemini free tier has strict quotas, so we implemented graceful fallbacks to ensure the app never breaks.

Visual clarity: Balancing enough detail without cluttering the graph required multiple iterations.



Challenges we ran into

AI output noise: Gemini can return extra concepts, so we built a pruning layer to keep graphs concise.

API rate limits: The Gemini free tier has strict quotas, so we implemented graceful fallbacks to ensure the app never breaks.

Visual clarity: Balancing enough detail without cluttering the graph required multiple iterations.


Try it out

Paste machine learning notes into the app

Click Extract Concepts

Explore the generated concept graph



Built with Gemini

MindMapr uses Google Gemini to:

Understand ML terminology

Extract conceptual meaning

Infer prerequisite relationships

Gemini is central to the app’s intelligence, not just an add-on.


Built with Gemini

MindMapr uses Google Gemini to:

Understand ML terminology

Extract conceptual meaning

Infer prerequisite relationships

Gemini is central to the app’s intelligence, not just an add-on.
