interface TrackingData {
    orderId: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    timeline: Array<{
        status: string;
        date: string;
        note?: string;
    }>;
    shippingAddress: {
        fullName: string;
        city: string;
        county: string;
        deliveryLocation: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

interface TrackingResponse {
    order: TrackingData;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const trackingService = {
    async trackOrder(orderId: string): Promise<TrackingData> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/track/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Order not found. Please check your order ID and try again.');
                }
                throw new Error(`Failed to track order: ${response.status} ${response.statusText}`);
            }

            const data: TrackingResponse = await response.json();
            return data.order;
        } catch (error) {
            console.error('Error tracking order:', error);
            throw error instanceof Error ? error : new Error('Failed to track order');
        }
    }
};

export type { TrackingData };