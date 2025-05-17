import { Star } from "lucide-react";
import React from "react";

// Puedes ajustar estos colores a tus variables CSS si lo prefieres
const filledColor = "#ffc107"; // Amarillo
const emptyColor = "#e4e5e9"; // Gris claro
const glowColor = "#ffe066"; // Glow para estrellas llenas

// Permite media estrella si quieres, o solo enteras
// type RatingProps = { rating: number; };
type RatingProps = {
  rating: number;
  size?: number; // Permite cambiar el tamaño
  showValue?: boolean; // Muestra el valor numérico
};

const Rating = ({ rating, size = 20, showValue = false }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className="transition-transform duration-200 hover:scale-110"
          style={{
            width: size,
            height: size,
            filter:
              index <= rating
                ? `drop-shadow(0 0 1px ${glowColor}) drop-shadow(0 0 1px ${glowColor})`
                : undefined,
            stroke: index <= rating ? filledColor : emptyColor,
            fill: index <= rating ? filledColor : "none",
          }}
        />
      ))}
      {showValue && (
        <span className="ml-2 text-xs text-[var(--color-primary)] font-semibold">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;
