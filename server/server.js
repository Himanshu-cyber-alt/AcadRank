import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import uploadRoutes from "./routes/upload.js";
import profileRoutes from "./routes/profile.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use("/upload", uploadRoutes);
app.use("/profile", profileRoutes);


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
