# ocr_text

一个简单的图片内容识别 Web 应用。

## 项目结构

```
ocr_text/
├── backend/         # Node.js Express 后端
│   └── index.js
├── frontend/        # React 前端
│   ├── package.json
│   └── src/
│       ├── App.js
│       └── index.js
├── README.md
└── package.json
```

## 功能
- 用户上传图片
- 后端调用 webhook（留空，返回模拟结果）
- 前端展示识别结果

## 启动方法

### 1. 启动后端
```bash
cd backend
npm install
npm start
```

### 2. 启动前端
```bash
cd frontend
npm install
npm start
```

前端默认端口：3000，后端默认端口：5000。

---

如需自定义 webhook 或端口号，请修改对应代码。 