import express from "express";
const app = express();


// Routes
app.get('/', (req, res) => {
    res.send('Server is ready');
  });


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
