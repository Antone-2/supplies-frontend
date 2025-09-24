import { useState } from 'react';
import { LuX, LuSend } from 'react-icons/lu';
// Custom WhatsApp Icon Component
const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.107h-.001a8.77 8.77 0 01-4.473-1.231l-.321-.191-3.326.874.889-3.24-.209-.332a8.725 8.725 0 01-1.334-4.626c.001-4.822 3.934-8.754 8.757-8.754 2.338 0 4.529.911 6.18 2.563a8.68 8.68 0 012.575 6.18c-.003 4.822-3.936 8.754-8.757 8.754zm7.149-15.927A10.449 10.449 0 0012.05 1.5C6.228 1.5 1.3 6.428 1.298 12.25c0 2.164.566 4.281 1.641 6.125l-1.749 6.387a1 1 0 001.225 1.225l6.386-1.749a10.43 10.43 0 004.249.964h.004c5.822 0 10.75-4.928 10.752-10.75a10.42 10.42 0 00-3.062-7.637z" />
    </svg>
);
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// ...existing code...
import { Textarea } from '../components/ui/textarea';

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
            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <div className="relative">
                    {/* Animated ring background */}
                    <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>

                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white border-4 border-white shadow-2xl hover:shadow-green-400/60 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
                        size="icon"
                        style={{ boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.25)' }}
                    >
                        {isOpen ? (
                            <LuX className="h-7 w-7 transition-transform duration-200" />
                        ) : (
                            <div className="relative flex items-center justify-center">
                                {/* WhatsApp icon representation */}
                                <WhatsappIcon className="h-8 w-8 transition-transform duration-200" />
                                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white border-2 border-green-500 rounded-full flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        )}
                    </Button>
                </div>
            </div>

            {/* WhatsApp Chat Card */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] animate-slide-up transform transition-all duration-300 ease-out">
                    <Card className="shadow-xl border-green-200">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <div className="bg-white/20 p-2 rounded-full animate-pulse">
                                    <WhatsappIcon className="h-5 w-5" />
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
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuickMessage(e.target.value)}
                                    className="resize-none"
                                />
                                <Button
                                    onClick={handleCustomMessage}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                                    disabled={!quickMessage.trim()}
                                >
                                    <LuSend className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <WhatsappIcon className="h-3 w-3 text-green-500" />
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