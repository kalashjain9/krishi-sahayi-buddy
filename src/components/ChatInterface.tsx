import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Mic, Send, X } from 'lucide-react';
import diseasedLeaf1 from '@/assets/diseased-leaf-1.jpg';
import diseasedLeaf2 from '@/assets/diseased-leaf-2.jpg';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  initialMessage?: string;
  onEscalation?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  initialMessage = 'നമസ്കാരം ബാബു, നിങ്ങൾക്ക് എന്ത് സഹായമാണ് വേണ്ടത്? (Hello Babu, how can I help you today?)',
  onEscalation 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [waitingForImage, setWaitingForImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot', image?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      image
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addTypingIndicator = () => {
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);
  };

  const removeTypingIndicator = () => {
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
  };

  const simulateBotResponse = (userMessage: string) => {
    addTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      
      if (userMessage.includes('Leaf Spot') || userMessage.includes('വഴുതനയുടെ ഇലയിൽ പാടുകൾ') || userMessage.includes('spots')) {
        addMessage('മനസ്സിലായി. ദയവായി ഇലയുടെ ഒരു ഫോട്ടോ അയക്കാമോ? (Understood. Please send a photo of the leaf.)', 'bot');
        setWaitingForImage(true);
      } else if (userMessage.includes('Market Price') || userMessage.includes('വഴുതനയുടെ ഇന്നത്തെ വില') || userMessage.includes('price')) {
        addMessage('ആലപ്പുഴ മാർക്കറ്റിൽ ഇന്നത്തെ ശരാശരി വില കിലോയ്ക്ക് ₹35 ആണ്. (Today\'s average price in the Alappuzha market is ₹35/kg.)', 'bot');
      } else if (userMessage.includes('Weather') || userMessage.includes('കാലാവസ്ഥ') || userMessage.includes('weather')) {
        addMessage('ഇന്ന് കനത്ത മഴയ്ക്ക് സാധ്യത. മണ്ണിൽ വെള്ളക്കെട്ട് ഉണ്ടാകാതെ നോക്കുക. (Heavy rain likely today. Ensure no waterlogging in soil.)', 'bot');
      } else if (userMessage.includes('Govt. Schemes') || userMessage.includes('സർക്കാർ പദ്ധതികൾ') || userMessage.includes('schemes')) {
        addMessage('PM-KISAN യോജന പ്രകാരം നിങ്ങൾക്ക് വർഷം ₹6,000 ലഭിക്കും. കൂടാതെ Krishi Credit Card സ്കീമും ലഭ്യമാണ്. (Under PM-KISAN scheme, you get ₹6,000/year. Krishi Credit Card scheme is also available.)', 'bot');
      } else if (userMessage.includes('fertilizer') || userMessage.includes('വളം')) {
        addMessage('നിങ്ങളുടെ വഴുതന വിളയ്ക്ക് NPK 19:19:19 വളം പ്രയോഗിക്കാൻ നിർദ്ദേശിക്കുന്നു. ചെടിക്ക് 20 ഗ്രാം വീതം 15 ദിവസത്തെ ഇടവേളയിൽ. (For your brinjal crop, recommend NPK 19:19:19 fertilizer. Apply 20g per plant every 15 days.)', 'bot');
      } else if (userMessage.includes('irrigation') || userMessage.includes('നനയ്ക്കൽ')) {
        addMessage('ഈ കാലാവസ്ഥയിൽ ദിവസവും നേരത്തെ രാവിലെയും വൈകുന്നേരവും നനയ്ക്കുക. മണ്ണിന്റെ ഈർപ്പം പരിശോധിച്ച് നനയ്ക്കുക. (In this weather, water early morning and evening daily. Check soil moisture before watering.)', 'bot');
      } else if (userMessage.includes('എൻ്റെ ചെടിക്ക് ഒരു ഉഷാറില്ല') || userMessage.includes('complex')) {
        addMessage('ഈ പ്രശ്നം കൂടുതൽ സങ്കീർണ്ണമാണ്. കൃത്യമായ ഉപദേശത്തിനായി നിങ്ങളുടെ ചോദ്യം കൃഷി ഭവനിലെ വിദഗ്ദ്ധന് കൈമാറുന്നു. ഉടൻ മറുപടി ലഭിക്കുന്നതാണ്. (This issue is complex. Forwarding your query to the expert at the Krishi Bhavan for precise advice. You will receive a response soon.)', 'bot');
        setTimeout(() => {
          onEscalation?.();
        }, 1000);
      } else {
        addMessage('ക്ഷമിക്കണം, എനിക്ക് ഈ ചോദ്യം മനസ്സിലായില്ല. കൃത്യമായി പറയാമോ? (Sorry, I didn\'t understand this question. Could you be more specific?)', 'bot');
      }
    }, 2000);
  };

  const handleSuggestion = (queryText: string) => {
    addMessage(queryText, 'user');
    simulateBotResponse(queryText);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, 'user');
      simulateBotResponse(inputValue);
      setInputValue('');
    }
  };

  const handleImageUpload = (imageSrc: string) => {
    addMessage('', 'user', imageSrc);
    setShowImageModal(false);
    setWaitingForImage(false);
    
    addTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      addMessage('ഇത് സെർക്കോസ്പോറ ഇലപ്പുള്ളി രോഗമാണ് (Cercospora leaf spot). പ്രതിവിധിക്ക്, 2 ഗ്രാം മാൻകോസെബ് ഒരു ലിറ്റർ വെള്ളത്തിൽ കലക്കി 15 ദിവസത്തെ ഇടവേളകളിൽ തളിക്കുക. (This is Cercospora leaf spot. For remedy, spray 2g Mancozeb mixed in 1 liter of water at 15-day intervals.)', 'bot');
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen relative">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.isTyping ? (
              <div className="bg-bot-message p-3 rounded-lg border max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-user-message text-success-green ml-auto'
                    : 'bg-bot-message border'
                }`}
              >
                {message.image ? (
                  <img src={message.image} alt="Uploaded crop" className="w-full rounded-md mb-2" />
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
                {message.sender === 'bot' && !message.isTyping && (
                  <p className="text-xs text-muted-foreground mt-1">Krishi Sakhi</p>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestion('എൻ്റെ വഴുതനയുടെ ഇലയിൽ പാടുകൾ കാണുന്നു (Leaf Spot Issue)')}
            className="text-xs"
          >
            Leaf Spot Issue
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestion('ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയാണ്? (Weather Today?)')}
            className="text-xs"
          >
            Weather Today?
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestion('വഴുതനയുടെ ഇന്നത്തെ വില എത്രയാണ്? (Market Price)')}
            className="text-xs"
          >
            Market Price
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSuggestion('സർക്കാർ പദ്ധതികൾ എന്തൊക്കെ? (Govt. Schemes)')}
            className="text-xs"
          >
            Govt. Schemes
          </Button>
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-card border-t flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ഇവിടെ ടൈപ്പ് ചെയ്യുക... (Type here...)"
          className="flex-1"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowImageModal(true)}
          className="p-2"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="p-2"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={handleSendMessage}
          className="p-2"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Select Image</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowImageModal(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src={diseasedLeaf1}
                alt="Diseased leaf 1"
                className="w-full h-20 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                onClick={() => handleImageUpload(diseasedLeaf1)}
              />
              <img
                src={diseasedLeaf2}
                alt="Diseased leaf 2"
                className="w-full h-20 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                onClick={() => handleImageUpload(diseasedLeaf2)}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;