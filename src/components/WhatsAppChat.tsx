import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const whatsappNumber = "+254746020323"; // Your WhatsApp business number

  const quickMessages = [
    "Hello! I need help with medical supplies",
    "What are your current product offerings?",
    "Can you help me with bulk orders?",
    "I need assistance with my order",
    "Do you have emergency supplies available?"
  ];

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    if (quickMessage.trim()) {
      const encodedMessage = encodeURIComponent(quickMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      setQuickMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button - Positioned higher on mobile to avoid bottom nav */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
        <div className="relative">
          {/* Animated ring background */}
          <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="relative h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            size="icon"
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-200" />
            ) : (
              <div className="relative">
                {/* WhatsApp icon representation */}
                <FaWhatsapp className="h-14 w-14 transition-transform duration-200" />
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* WhatsApp Chat Card - Adjusted position for mobile */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] animate-slide-up transform transition-all duration-300 ease-out">
          <Card className="shadow-xl border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="bg-white/20 p-2 rounded-full animate-pulse">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">MEDHELM Support</div>
                  <div className="text-sm opacity-90">Usually responds in a few minutes</div>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Hi! 👋 How can we help you with medical supplies today?
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Quick Messages:</p>
                  {quickMessages.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(message)}
                      className="w-full text-left p-2 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors border border-border hover:border-green-200"
                    >
                      {message}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Or write your own message:</p>
                <Textarea
                  placeholder="Type your message here..."
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <Button
                  onClick={handleCustomMessage}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={!quickMessage.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <FaWhatsapp className="h-3 w-3 text-green-500" />
                  <span>Powered by WhatsApp</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppChat;
