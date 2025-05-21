'use client';

import { useState, useRef } from 'react';
import axios from 'axios';

export default function TelegramSender() {
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [chatId, setChatId] = useState('-1002692229299');
  const [caption, setCaption] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chatId) {
      alert('Chat ID обязателен для заполнения');
      return;
    }

    if (!file && !pdfFile && !textMessage) {
      alert('Заполните хотя бы одно поле (изображение, PDF или текст)');
      return;
    }

    setIsSending(true);
    setResult(null);

    try {
      const formData = new FormData();
      if (file) formData.append('image', file);
      if (pdfFile) formData.append('pdf', pdfFile);
      formData.append('chatId', chatId);
      formData.append('caption', caption);
      formData.append('textMessage', textMessage);

      const response = await axios.post('/api/send-to-telegram', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult({ success: true, data: response.data });

      // Очищаем форму
      setFile(null);
      setPdfFile(null);
      setCaption('');
      setTextMessage('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setResult({
        success: false,
        message:
          error.response?.data?.message || error.message || 'Произошла ошибка',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Отправить в Telegram
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chat ID *
          </label>
          <input
            type="text"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ID чата"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Изображение
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF документ
            </label>
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Подпись
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Подпись к файлу"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Текстовое сообщение *
            <span className="text-xs text-gray-500 ml-1">
              (обязательно, если нет файлов)
            </span>
          </label>
          <textarea
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите текст сообщения"
            required={!file && !pdfFile}
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isSending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSending ? 'Отправка...' : 'Отправить'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-4 rounded-md ${
            result.success
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {result.success ? (
            <p>Сообщение успешно отправлено!</p>
          ) : (
            <p>Ошибка: {result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
