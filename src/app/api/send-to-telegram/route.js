import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const chatId = formData.get('chatId');
    const caption = formData.get('caption');
    const textMessage = formData.get('textMessage');
    const image = formData.get('image');
    const pdf = formData.get('pdf');

    if (!chatId) {
      return NextResponse.json(
        { message: 'Chat ID is required' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // Если есть PDF файл
    if (pdf) {
      const telegramFormData = new FormData();
      const pdfBuffer = await pdf.arrayBuffer();

      telegramFormData.append('document', Buffer.from(pdfBuffer), {
        filename: pdf.name || 'document.pdf',
        contentType: pdf.type || 'application/pdf',
      });

      telegramFormData.append('chat_id', chatId);

      const fullCaption = [caption, textMessage].filter(Boolean).join('\n\n');
      if (fullCaption) telegramFormData.append('caption', fullCaption);

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendDocument`,
        telegramFormData,
        { headers: telegramFormData.getHeaders() }
      );

      return NextResponse.json({ success: true, data: response.data });
    }
    // Если есть изображение
    else if (image) {
      const telegramFormData = new FormData();
      const imageBuffer = await image.arrayBuffer();

      telegramFormData.append('photo', Buffer.from(imageBuffer), {
        filename: image.name || 'image.jpg',
        contentType: image.type || 'image/jpeg',
      });

      telegramFormData.append('chat_id', chatId);

      const fullCaption = [caption, textMessage].filter(Boolean).join('\n\n');
      if (fullCaption) telegramFormData.append('caption', fullCaption);

      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        telegramFormData,
        { headers: telegramFormData.getHeaders() }
      );

      return NextResponse.json({ success: true, data: response.data });
    }
    // Если только текст
    else if (textMessage) {
      const response = await axios.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: chatId,
          text: textMessage,
        }
      );

      return NextResponse.json({ success: true, data: response.data });
    } else {
      return NextResponse.json(
        { message: 'Необходимо указать файл или текст' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      {
        message: 'Error sending message to Telegram',
        error: error.response?.data || error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
