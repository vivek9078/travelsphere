import type { Review } from "@/types";

const names = [
  "Ananya Sharma", "James Whitfield", "Priya Nair", "Marco Rossi", "Sofia Fernandez",
  "Liam O'Connor", "Chen Wei", "Fatima Al-Sayed", "Rahul Mehta", "Emma Johansson",
  "David Kim", "Olivia Brooks", "Arjun Verma", "Isabella Rossi", "Noah Bennett",
];

function avatar(seed: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

const comments = [
  "Exactly as described — the photos don't do it justice. Would book again without hesitation.",
  "Great value for the price. Staff went out of their way to help with local recommendations.",
  "A few small hiccups with timing, but the overall experience was memorable and well organized.",
  "One of the best trips we've taken. Everything from booking to check-out was smooth.",
  "Beautiful location, though it gets busy midday — go early if you can.",
  "Worth every rupee. Our guide was knowledgeable and clearly loved the work.",
  "Comfortable, clean, and in a great location. Minor wait at check-in but nothing major.",
  "Perfect for our group — spacious, well-equipped, and the views were unreal.",
];

function buildReviews(targetType: Review["targetType"], slug: string, count: number, seedOffset: number): Review[] {
  return Array.from({ length: count }).map((_, i) => {
    const name = names[(i + seedOffset) % names.length];
    return {
      id: `${slug}-${targetType}-${i}`,
      author: name,
      avatar: avatar(name + slug + i),
      rating: [5, 5, 4, 5, 4, 3, 5][(i + seedOffset) % 7],
      date: new Date(Date.now() - (i + 1) * 1000 * 60 * 60 * 24 * (7 + i)).toISOString(),
      comment: comments[(i + seedOffset) % comments.length],
      targetType,
      targetSlug: slug,
    };
  });
}

export function getReviewsFor(targetType: Review["targetType"], slug: string, count = 5): Review[] {
  const seedOffset = slug.length;
  return buildReviews(targetType, slug, count, seedOffset);
}
