export interface Product {
  id: string;
  name: string;
  category: 'viscose' | 'cotton' | 'printed' | 'kaftan' | 'palazzo';
  printType?: 'pigment' | 'procion' | 'digital' | 'discharge';
  description: string;
  image: string;
  usage: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  fabricType: string;
  printType: string;
  message: string;
  customDesign?: FileList;
}
