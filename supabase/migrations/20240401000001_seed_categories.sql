INSERT INTO categories (name, slug, icon, color, sort_order) VALUES
('Consciousness & Mind', 'consciousness', '🧠', '#4F46E5', 1),
('Forbidden & Real History', 'forbidden-history', '🏛️', '#B45309', 2),
('Spirituality & Mysticism', 'spirituality', '🔮', '#7C3AED', 3),
('Science & Cosmology', 'science', '🌌', '#1D4ED8', 4),
('Esoteric & Occult', 'esoteric', '🜂', '#991B1B', 5),
('Law & Systems of Control', 'law', '⚖️', '#374151', 6),
('Psychology & Inner Healing', 'psychology', '🌿', '#065F46', 7),
('Ancient Civilizations', 'ancient', '𓂀', '#92400E', 8),
('Technology & Science', 'technology', '⚙️', '#0E7490', 9),
('Philosophy & Creativity', 'philosophy', '✍️', '#4B5563', 10)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order;
