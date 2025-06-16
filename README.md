**Chat with PDFs & Multilingual CV Parser**

A powerful web application that enables interactive chatting with PDF documents and parses multilingual CVs into English. Built with modern technologies and optimized for scalable AI-driven experiences.

https://github.com/user-attachments/assets/2ebde3a5-4ae4-41a8-b7f4-f1a5ad63c450

---

## 🚀 Features

* **Chat with PDFs**: Ask questions, extract key points, and engage in dynamic conversations with your PDF content.
* **Multilingual CV Parser**: Automatically detect and parse resumes in multiple languages, extracting personal details, skills, experience, and education in English.
* **Semantic Search & Embeddings**: Leverage cutting-edge transformer embeddings for accurate information retrieval within documents.
* **Secure User Authentication**: Built-in user management and authentication with ClerkAuth.
* **Scalable Architecture**: Powered by Pinecone vector DB and PostgreSQL for robust data storage and retrieval.

---

## 🛠 Tech Stack

* **Frontend**: Next.js
* **Vector Database**: Pinecone DB
* **Relational Database**: PostgreSQL (via Prisma)
* **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2` (via HuggingFace JS)
* **LLM & Chat**: Gemini-1.5-Flash API, LangChain
* **Auth**: ClerkAuth
* **Data Fetching**: Tanstack Query
* **File Storage**: AWS S3

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/satejplatonist/SerenLingua.git
   cd <project-directory>
   ```
   **IMPORTANT : Remove EmbeddingModelEvaluation.ipynb , formatted_table.png and table.png this includes eveluation done on various models and table of metrics for each model evaluated  **
   https://raw.githubusercontent.com/satejplatonist/SerenLingua/refs/heads/master/table.png

3. **Install dependencies**

   ```bash
   npm install
   # (Requires Hugging Face Inference JS ^3.14.0)
   ```

4. **Configure environment variables**

   Create a `.env.local` file in the root directory and add the following keys:

   ```env.local
   # ClerkAuth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # AWS S3
   NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_aws_access_key_id
   NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   NEXT_PUBLIC_S3_BUCKET_NAME=your_s3_bucket_name

   # Pinecone
   PINECONE_ENVIRONMENT=your_pinecone_environment
   PINECONE_API_KEY=your_pinecone_api_key

   # HuggingFace Embeddings
   HF_TOKEN=your_huggingface_token

   # Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Setup the database**

   * Ensure PostgreSQL is installed and running.

   * Create a new database :

     ```sql
     CREATE DATABASE your_db_name;
     ```
   * And fill all database detaiil in .env file 

   * Apply Prisma migrations:

     ```bash
     npx prisma migrate dev
     ```

6. **Run the development server**

   ```bash
   npm run dev
   ```

   > If you encounter issues, verify Prisma migrations and check that `.env.local` variables are correctly set.

---

