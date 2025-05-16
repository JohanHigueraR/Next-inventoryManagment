import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      className="w-4 h-4"
      color={index <= rating ? "#ffc107" : "#e4e5e9"}
    ></Star>
  ));
};

export default Rating;
