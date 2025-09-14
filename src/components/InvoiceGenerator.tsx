import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OrderItem {
    product: {
        _id: string;
        name: string;
        price: number;
    };
    quantity: number;
    price: number;
}

interface OrderData {
    items: OrderItem[];
    shippingAddress: {
        name: string;
        address: string;
        pickupPoint: string;
        phone: string;
        email: string;
    };
    shippingFee: number;
    subtotal: number;
    totalAmount: number;
    orderId?: string;
    date?: string;
}

interface InvoiceGeneratorProps {
    orderData: OrderData;
    onGenerate?: (pdfBlob: Blob) => void;
}

declare global {
    interface Window {
        qpdf: any;
    }
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ orderData, onGenerate }) => {
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateInvoicePDF = async () => {
        if (!window.qpdf) {
            setError('PDF library not loaded. Please refresh the page.');
            return;
        }

        setGenerating(true);
        setError(null);

        try {
            // Create PDF document
            const pdfDoc = await window.qpdf.PDFDocument.create();

            // Add a page
            const page = window.qpdf.PDFPage.create();
            pdfDoc.addPage(page);

            // Set up fonts and colors
            const font = await window.qpdf.PDFFont.loadStandardFont(window.qpdf.StandardFonts.Helvetica);
            const boldFont = await window.qpdf.PDFFont.loadStandardFont(window.qpdf.StandardFonts.HelveticaBold);

            // Company header
            page.drawText('MEDHELM SUPPLIES', {
                x: 50,
                y: 750,
                size: 24,
                font: boldFont,
                color: window.qpdf.rgb(0.2, 0.4, 0.8)
            });

            page.drawText('Medical Equipment & Supplies', {
                x: 50,
                y: 720,
                size: 12,
                font: font,
                color: window.qpdf.rgb(0.5, 0.5, 0.5)
            });

            // Invoice title
            page.drawText('INVOICE', {
                x: 450,
                y: 750,
                size: 20,
                font: boldFont,
                color: window.qpdf.rgb(0.2, 0.4, 0.8)
            });

            // Invoice details
            const invoiceNumber = orderData.orderId || `INV-${Date.now()}`;
            const invoiceDate = orderData.date || new Date().toLocaleDateString();

            page.drawText(`Invoice Number: ${invoiceNumber}`, {
                x: 400,
                y: 700,
                size: 10,
                font: font
            });

            page.drawText(`Date: ${invoiceDate}`, {
                x: 400,
                y: 680,
                size: 10,
                font: font
            });

            // Billing address
            page.drawText('Bill To:', {
                x: 50,
                y: 650,
                size: 12,
                font: boldFont
            });

            page.drawText(orderData.shippingAddress.name, {
                x: 50,
                y: 630,
                size: 10,
                font: font
            });

            page.drawText(orderData.shippingAddress.address, {
                x: 50,
                y: 610,
                size: 10,
                font: font
            });

            page.drawText(orderData.shippingAddress.pickupPoint, {
                x: 50,
                y: 590,
                size: 10,
                font: font
            });

            page.drawText(`Phone: ${orderData.shippingAddress.phone}`, {
                x: 50,
                y: 570,
                size: 10,
                font: font
            });

            page.drawText(`Email: ${orderData.shippingAddress.email}`, {
                x: 50,
                y: 550,
                size: 10,
                font: font
            });

            // Items table header
            let yPosition = 480;

            page.drawText('Description', {
                x: 50,
                y: yPosition,
                size: 10,
                font: boldFont
            });

            page.drawText('Qty', {
                x: 350,
                y: yPosition,
                size: 10,
                font: boldFont
            });

            page.drawText('Unit Price', {
                x: 400,
                y: yPosition,
                size: 10,
                font: boldFont
            });

            page.drawText('Total', {
                x: 480,
                y: yPosition,
                size: 10,
                font: boldFont
            });

            // Draw header line
            page.drawLine({
                start: { x: 50, y: yPosition - 5 },
                end: { x: 550, y: yPosition - 5 },
                thickness: 1,
                color: window.qpdf.rgb(0, 0, 0)
            });

            yPosition -= 20;

            // Items
            orderData.items.forEach((item) => {
                page.drawText(item.product.name, {
                    x: 50,
                    y: yPosition,
                    size: 9,
                    font: font
                });

                page.drawText(item.quantity.toString(), {
                    x: 350,
                    y: yPosition,
                    size: 9,
                    font: font
                });

                page.drawText(`KES ${item.price.toLocaleString()}`, {
                    x: 400,
                    y: yPosition,
                    size: 9,
                    font: font
                });

                const itemTotal = item.price * item.quantity;
                page.drawText(`KES ${itemTotal.toLocaleString()}`, {
                    x: 480,
                    y: yPosition,
                    size: 9,
                    font: font
                });

                yPosition -= 15;
            });

            // Totals section
            yPosition -= 20;

            page.drawText(`Subtotal: KES ${orderData.subtotal.toLocaleString()}`, {
                x: 400,
                y: yPosition,
                size: 10,
                font: font
            });

            yPosition -= 15;

            page.drawText(`Shipping: KES ${orderData.shippingFee.toLocaleString()}`, {
                x: 400,
                y: yPosition,
                size: 10,
                font: font
            });

            yPosition -= 15;

            // Draw total line
            page.drawLine({
                start: { x: 380, y: yPosition - 5 },
                end: { x: 550, y: yPosition - 5 },
                thickness: 2,
                color: window.qpdf.rgb(0, 0, 0)
            });

            yPosition -= 15;

            page.drawText(`TOTAL: KES ${orderData.totalAmount.toLocaleString()}`, {
                x: 400,
                y: yPosition,
                size: 12,
                font: boldFont
            });

            // Footer
            page.drawText('Thank you for your business!', {
                x: 50,
                y: 100,
                size: 10,
                font: font,
                color: window.qpdf.rgb(0.5, 0.5, 0.5)
            });

            page.drawText('For any inquiries, please contact us at support@medhelm.com', {
                x: 50,
                y: 80,
                size: 8,
                font: font,
                color: window.qpdf.rgb(0.5, 0.5, 0.5)
            });

            // Save PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Trigger download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoiceNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            if (onGenerate) {
                onGenerate(blob);
            }

        } catch (err: any) {
            console.error('PDF generation error:', err);
            setError('Failed to generate PDF. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <Button
                onClick={generateInvoicePDF}
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                {generating ? 'Generating PDF...' : 'Download Invoice PDF'}
            </Button>

            {error && (
                <div className="text-red-600 text-sm text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default InvoiceGenerator;
