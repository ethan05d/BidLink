import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WinnerCard({
  winner,
  amount,
  image,
}: {
  winner: string;
  amount: string;
  image: string;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    if (winner !== "No Winner") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#34D399", "#6EE7B7"], // Green shades for confetti
      });
    }
  }, []);

  if (winner === "No Winner") {
    return (
      <Card
        className={`w-full max-w-2xl mx-auto overflow-hidden ${
          animate ? "animate-in zoom-in-50 duration-500" : ""
        }`}
      >
        <CardHeader className="bg-red-600 text-white text-center py-3">
          <CardTitle className="text-xl font-bold flex items-center justify-center">
            <Trophy className="mr-2" />
            Error Announcement!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center bg-green-50">
          <p className="mt-3 text-sm text-red-600">No bidder, no winner.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`w-full max-w-2xl mx-auto overflow-hidden ${
        animate ? "animate-in zoom-in-50 duration-500" : ""
      }`}
    >
      <CardHeader className="bg-green-600 text-white text-center py-3">
        <CardTitle className="text-xl font-bold flex items-center justify-center">
          <Trophy className="mr-2" />
          Winner Announcement
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-center bg-green-50">
        <div className="flex items-center justify-center space-x-2 text-lg">
          <Avatar className="flex justify-center items-center md:hover:opacity-80 transition-opacity duration-200 w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage
              src={image ?? undefined}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs sm:text-sm">CN</AvatarFallback>
          </Avatar>
          <span className="font-bold text-green-800">{winner}</span>
          <span className="text-green-700">has won the bid with</span>
          <span className="font-bold text-green-800 bg-green-200 px-2 py-1 rounded-md">
            ${amount}
          </span>
        </div>
        <p className="mt-3 text-sm text-green-600">
          Congratulations to the winner!
        </p>
      </CardContent>
    </Card>
  );
}
