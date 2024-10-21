import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Xin chào, tôi có thể hỗ trợ gì cho bạn?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const chatbotResponses = [
    {
      userInput: 'sốt',
      botResponse: 'Bé đang có triệu chứng sốt. Bạn có thể theo dõi thêm các dấu hiệu khác như ho, mệt mỏi, và liên hệ bác sĩ nếu cần.',
    },
    {
      userInput: 'ho',
      botResponse: 'Bé đang có triệu chứng ho. Bạn nên cho bé uống nhiều nước ấm và nếu triệu chứng kéo dài, hãy đưa bé đi khám bác sĩ.',
    },
    {
      userInput: 'đau bụng',
      botResponse: 'Đau bụng có thể là dấu hiệu của nhiều tình trạng khác nhau. Bạn nên theo dõi thêm và đưa bé đến bác sĩ nếu triệu chứng không thuyên giảm.',
    },
    {
      userInput: 'tiêu chảy',
      botResponse: 'Tiêu chảy có thể là do nhiễm khuẩn đường ruột. Hãy cho bé uống nhiều nước để tránh mất nước và đưa bé đến bác sĩ nếu tình trạng kéo dài.',
    },
    {
      userInput: 'nôn',
      botResponse: 'Nôn có thể là dấu hiệu của rối loạn tiêu hóa. Bạn nên theo dõi thêm các triệu chứng khác và tham khảo ý kiến bác sĩ nếu cần.',
    },
  ];

  const findBotResponse = (userInput) => {
    const response = chatbotResponses.find((item) =>
      userInput.toLowerCase().includes(item.userInput.toLowerCase())
    );
    return response ? response.botResponse : 'Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể thử diễn đạt lại?';
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = { id: `${messages.length + 1}`, text: inputText, sender: 'user' };
      const botMessage = {
        id: `${messages.length + 2}`,
        text: findBotResponse(inputText), // Tìm câu trả lời từ chatbot
        sender: 'bot',
      };

      setMessages([...messages, userMessage, botMessage]);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter your message"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chatbot;
