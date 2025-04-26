const jsonServer = require('json-server');
const axios = require('axios');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const DATA_URL = "https://raw.githubusercontent.com/Someshsw1109/skoolwhiz-backend-author-somesh-raj/main/db.json";

server.use(middlewares);

// Fetch remote data and pass it to the router
server.use(async (req, res, next) => {
  try {
    const response = await axios.get(DATA_URL);
    const router = jsonServer.router(response.data);
    router(req, res, next);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running on port', PORT);
});
