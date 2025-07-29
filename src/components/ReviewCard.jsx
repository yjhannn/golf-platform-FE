import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Calendar } from "lucide-react"

export default function ReviewCard({ review }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-emerald-200">
      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
            />
          ))}
        </div>

        {/* Review Title */}
        <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {review.title}
        </h3>

        {/* Golf Course Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{review.golfCourse}</span>
          </div>
          <div className="text-sm text-slate-500">{review.location}</div>
        </div>

        {/* Review Comment */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{review.comment}</p>

        {/* User Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <Avatar className="w-8 h-8">
            <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-600 text-xs">
              {review.userName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{review.userName}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              {review.date}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
