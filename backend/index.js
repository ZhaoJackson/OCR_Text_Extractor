const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 图片上传接口
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 这里调用 webhook，暂时留空
  // const webhookResult = await axios.post('WEBHOOK_URL', ...)

  // 模拟 webhook 返回结果
  const result = {
    success: true,
    data: {
      text: '模拟识别结果：这是图片中的内容。'
    }
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 