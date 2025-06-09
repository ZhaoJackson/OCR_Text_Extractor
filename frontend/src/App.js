import React, { useState } from 'react';
import { Layout, Typography, Upload, Button, message, Card, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecognize = async () => {
    if (!file) {
      message.warning('Please select an image');
      return;
    }
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('data', file);
    try {
      const res = await axios.post('https://jacksonzhao.app.n8n.cloud/webhook/3b985579-35a7-4e58-97eb-fdbcd6c3f14f', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      let text = '';
      try {
        text = res.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (e) {
        text = '';
      }
      setResult(text || 'Unable to recognize the content');
    } catch (err) {
      message.error('Failed to recognize the content');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      setResult(null);
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target.result);
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
    accept: 'image/*',
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f6ff' }}>
      <Header style={{ background: '#1677ff' }}>
        <Title style={{ color: '#fff', margin: 0 }} level={3}>Text Extractor</Title>
      </Header>
      <Content style={{
        padding: '40px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 128px)'
      }}>
        <Card style={{ width: 400, background: '#fff', boxShadow: '0 2px 8px #f0f1f2', textAlign: 'center' }}>
          <Paragraph style={{ color: '#1677ff', fontWeight: 500 }}>Upload an image, recognize the text in the image</Paragraph>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {preview && (
            <div style={{ marginTop: 16 }}>
              <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, boxShadow: '0 1px 4px #e6e6e6' }} />
              <Button
                type="primary"
                style={{ marginTop: 16, width: '100%' }}
                onClick={handleRecognize}
                loading={loading}
                disabled={loading}
              >
                Start Recognition
              </Button>
            </div>
          )}
          {loading && <Spin style={{ marginTop: 16 }} />}
          {result && (
            <Card type="inner" title="Recognition Result" style={{ marginTop: 24, background: '#f6faff' }}>
              <Paragraph>{result}</Paragraph>
            </Card>
          )}
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f0f6ff', color: '#1677ff' }}>
        ocr_text © 2025 by Zichen Zhao
      </Footer>
    </Layout>
  );
}

export default App; 