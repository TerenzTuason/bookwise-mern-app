## Installing the BookWise React App

1. Locate your project folder
   ```
   cd "Project Folder"
   ```
2. Clone the git repository
   ```
   git clone https://github.com/TerenzTuason/bookwise-app-react.git
   ```
3. Go to the app folder
   ```
   cd bookwise-app-react
   ```
4. Install concurrently
   ```
   npm install --save-dev concurrently
   ```
5. Install other node libraries
   ```
   npm install dotenv express mongoose cors vite @vitejs/plugin-react tailwindcss autoprefixer react-dom react-router-dom
   ```
6. Create a .env file in the 'backend' folder with the following values
   ```
   PORT = 4000
   MONGO_URI = mongodb+srv://terenztuason:120501@cluster0.ggzyu87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
7. Run the vite react app
   ```
   npm start
   ```
