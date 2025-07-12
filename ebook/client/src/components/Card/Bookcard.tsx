import Image from "next/image";
import React from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating?: number;
};

type Props = {
  book: Book;
  size?: "sm" | "md" | "lg";
};

// Tailwind classes based on card size
const sizeClasses = {
  sm: {
    image: "aspect-[16/9] h-[220px]",
    text: "text-base",
  },
  md: {
    image: "aspect-[16/9] h-[300px]", // A4 ratio
    text: "text-lg",
  },
  lg: {
    image: "aspect-[16/9] h-[400px]",
    text: "text-xl",
  },
};

const BookCard: React.FC<Props> = ({ book, size = "md" }) => {
  const styles = sizeClasses[size];

  return (
    <div className="border rounded-lg overflow-hidden p-4 transition-all bg-white hover:bg-gray-100/30 cursor-pointer">
      <Image
        src={book.cover}
        alt={book.title}
        width={500}
        height={500}
        className={`w-full object-cover rounded-lg ${styles.image}`}
      />
      <div className="p-4">
        <h3 className={`font-semibold text-gray-900 truncate ${styles.text}`}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        {book.rating && (
          <p className="text-yellow-500 text-sm mt-1">⭐ {book.rating}/5</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
