import { CategoryInfo } from '../models/product.model';

const img = (key: string) => `assets/images/categories/${key}.svg`;

export const CATEGORIES: CategoryInfo[] = [
  { name: 'Smartphones', khmer: 'ទូរស័ព្ទ', icon: 'bi-phone', image: img('smartphones') },
  { name: 'Tablets', khmer: 'Tablet', icon: 'bi-tablet', image: img('tablets') },
  { name: 'Laptops', khmer: 'កុំព្យូទ័រយួរដៃ', icon: 'bi-laptop', image: img('laptops') },
  { name: 'Headphones and Earbuds', khmer: 'កាសស្តាប់សំឡេង', icon: 'bi-headphones', image: img('headphones') },
  { name: 'Smartwatches', khmer: 'នាឡិកាឆ្លាតវៃ', icon: 'bi-smartwatch', image: img('smartwatches') },
  { name: 'Speakers', khmer: 'បាស Speaker', icon: 'bi-speaker', image: img('speakers') },
  { name: 'Chargers and Power Banks', khmer: 'ឆ្នាំងសាក និង​ PowerBank', icon: 'bi-lightning-charge', image: img('chargers') },
  { name: 'Keyboards', khmer: 'ក្តារចុច', icon: 'bi-keyboard', image: img('keyboards') },
  { name: 'Computer Mice', khmer: 'Mouse កុំព្យូទ័រ', icon: 'bi-mouse', image: img('mice') },
  { name: 'Computer Accessories', khmer: 'គ្រឿង Accessories កុំព្យូទ័រ', icon: 'bi-usb-symbol', image: img('accessories') },
];
