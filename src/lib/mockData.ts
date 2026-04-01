import { Book, Category } from "@/types/database";

export const mockCategories: Category[] = [
  { id: '1', name: 'Consciousness & Mind', slug: 'consciousness', icon: '🧠', color: '#4F46E5', sort_order: 1, description: 'The inner science of the self.' },
  { id: '2', name: 'Forbidden & Real History', slug: 'forbidden-history', icon: '🏛️', color: '#B45309', sort_order: 2, description: 'What we weren\'t told about where we come from.' },
  { id: '3', name: 'Esoteric & Occult', slug: 'esoteric', icon: '🜂', color: '#991B1B', sort_order: 3, description: 'Ancient mysteries and hidden lore.' },
  { id: '4', name: 'Spirituality', slug: 'spirituality', icon: '🔮', color: '#7C3AED', sort_order: 4, description: 'Connecting with the higher nature.' },
];

export const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'The Kybalion',
    author: 'The Three Initiates',
    category_id: '3',
    description: 'A study of the Hermetic Philosophy of Ancient Egypt and Greece. It explores the seven hermetic principles of the universe.',
    cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&h=800&fit=crop',
    file_url: '#',
    is_restricted: false,
    tags: ['hermeticism', 'philosophy', 'ancient'],
    added_date: '2024-03-01',
    curator_note: 'A fundamental text for understanding universal laws.',
    views: 120,
    downloads: 45,
    is_published: true
  },
  {
    id: 'b2',
    title: 'The Secret Doctrine',
    author: 'H.P. Blavatsky',
    category_id: '3',
    description: 'The synthesis of science, religion, and philosophy. A foundational work of modern theosophy.',
    cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&h=800&fit=crop',
    file_url: '#',
    is_restricted: true,
    tags: ['theosophy', 'esoteric', 'cosmology'],
    added_date: '2024-03-05',
    curator_note: 'High-level cosmic knowledge. Approach with discernment.',
    views: 85,
    downloads: 12,
    is_published: true
  },
  {
    id: 'b3',
    title: 'Man\'s Search for Meaning',
    author: 'Viktor Frankl',
    category_id: '1',
    description: 'A psychologist\'s reflection on his experience in Nazi concentration camps and his development of logotherapy.',
    cover_url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&h=800&fit=crop',
    file_url: '#',
    is_restricted: false,
    tags: ['psychology', 'philosophy', 'healing'],
    added_date: '2024-02-15',
    curator_note: 'Crucial for survival in the dark night of the soul.',
    views: 200,
    downloads: 80,
    is_published: true
  },
  {
    id: 'b4',
    title: 'Fingerprints of the Gods',
    author: 'Graham Hancock',
    category_id: '2',
    description: 'A look at the evidence for a lost civilization that pre-dates our official history.',
    cover_url: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&h=800&fit=crop',
    file_url: '#',
    is_restricted: false,
    tags: ['history', 'archaeology', 'ancient'],
    added_date: '2024-02-28',
    curator_note: 'Challenges the linear progress of human development.',
    views: 150,
    downloads: 55,
    is_published: true
  }
];
