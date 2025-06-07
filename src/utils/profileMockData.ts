export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
  maxCredits: number;
}

export interface Generation {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  creditsUsed: number;
}

export interface BillingInfo {
  cardType: string;
  lastFour: string;
  expiryDate: string;
  nextBillingDate: string;
  amount: number;
}

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150',
  plan: 'pro',
  credits: 750,
  maxCredits: 1000
};

export const mockGenerations: Generation[] = [
  {
    id: '1',
    prompt: 'A futuristic cityscape with neon lights and flying cars',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: '2024-03-15T10:30:00Z',
    creditsUsed: 10
  },
  {
    id: '2',
    prompt: 'Serene mountain landscape at sunset',
    imageUrl: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: '2024-03-14T15:45:00Z',
    creditsUsed: 8
  },
  {
    id: '3',
    prompt: 'Abstract digital art with vibrant colors',
    imageUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=300',
    createdAt: '2024-03-13T09:20:00Z',
    creditsUsed: 12
  }
];

export const mockBilling: BillingInfo = {
  cardType: 'Visa',
  lastFour: '4242',
  expiryDate: '12/25',
  nextBillingDate: '2024-04-15',
  amount: 29.99
};