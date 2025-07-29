"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ReviewCard from "../components/ReviewCard"

export default function HomePage({ navigateTo }) {
  // 임시 리뷰 데이터 (백엔드 구현 전까지 사용)
  const mockReviews = [
    {
      id: 1,
      rating: 5,
      title: "정말 좋아요!",
      golfCourse: "경주신라CC",
      location: "경주시",
      userName: "상골치고싶어요",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.13",
      comment: "코스 관리가 정말 잘 되어있고 직원분들도 친절해요.",
    },
    {
      id: 2,
      rating: 4,
      title: "좋은 경험이었어요",
      golfCourse: "부산베이CC",
      location: "부산시",
      userName: "골프매니아",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.12",
      comment: "바다 전망이 아름답고 코스도 도전적이에요.",
    },
    {
      id: 3,
      rating: 5,
      title: "완벽한 라운딩!",
      golfCourse: "제주오라CC",
      location: "제주시",
      userName: "제주골퍼",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.11",
      comment: "제주도 여행과 함께 즐긴 최고의 골프장입니다.",
    },
    {
      id: 4,
      rating: 4,
      title: "추천합니다",
      golfCourse: "강남힐스CC",
      location: "서울시",
      userName: "서울골퍼",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.10",
      comment: "접근성이 좋고 시설이 깔끔해요.",
    },
    {
      id: 5,
      rating: 5,
      title: "최고의 코스!",
      golfCourse: "인천스카이CC",
      location: "인천시",
      userName: "인천골퍼",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.09",
      comment: "공항 근처라 접근성도 좋고 코스도 훌륭해요.",
    },
    {
      id: 6,
      rating: 4,
      title: "좋은 시설",
      golfCourse: "대구팰리스CC",
      location: "대구시",
      userName: "대구골퍼",
      userAvatar: "/placeholder.svg?height=40&width=40",
      date: "2025.03.08",
      comment: "클럽하우스 시설이 정말 좋아요.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header navigateTo={navigateTo} currentPage="home" />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center">
          <div className="space-y-8">
            {/* 더 짧은 배지 */}
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm inline-block">
              골프 플랫폼
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-tight">
              완벽한 골프 경험을
              <br />
              <span className="text-emerald-600">그린톡</span>과 함께
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              내 위치 기반 골프장 검색부터 골퍼들의 생생한 후기까지,
              <br />
              모든 골프 정보를 한 곳에서 만나보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                onClick={() => navigateTo("golf-courses")}
              >
                <Search className="w-5 h-5 mr-2" />
                골프장 찾기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg bg-transparent"
                onClick={() => navigateTo("community")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                커뮤니티 둘러보기
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">최근 리뷰</h2>
            <p className="text-lg md:text-xl text-slate-600">골퍼들이 직접 남긴 생생한 골프장 후기를 확인해보세요</p>
          </div>

          {/* 완전히 유연한 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              더 많은 리뷰 보기
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
