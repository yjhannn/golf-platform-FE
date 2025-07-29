"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Phone, X, Loader2, Navigation, Calendar, ExternalLink } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function GolfCoursePage({ navigateTo }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [golfCourses, setGolfCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [locationPermission, setLocationPermission] = useState(null)

  // 페이지 로드 시 위치 권한 요청 및 자동 검색
  useEffect(() => {
    // 페이지 로드 시 자동으로 위치 기반 골프장 검색
    requestLocationPermission()
  }, [])

  // 위치 권한 요청 함수 - API 호출 수정
  const requestLocationPermission = async () => {
    setLocationLoading(true)

    if (!navigator.geolocation) {
      console.log("위치 서비스 미지원")
      setLocationPermission("denied")
      setLocationLoading(false)
      // 서울 기본 위치로 실제 API 호출
      await fetchNearbyGolfCourses({ latitude: 37.5665, longitude: 126.978 })
      return
    }

    // 위치 권한 요청
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        console.log("위치 권한 허용됨:", location)
        setUserLocation(location)
        setLocationPermission("granted")

        // 현재 위치 기반 골프장 검색 - 자동 호출
        await fetchNearbyGolfCourses(location)
        setLocationLoading(false)
      },
      async (error) => {
        console.error("위치 정보 오류:", error)
        setLocationPermission("denied")
        setLocationLoading(false)

        // 위치 권한이 거부된 경우에도 서울 기본 위치로 실제 API 호출
        await fetchNearbyGolfCourses({ latitude: 37.5665, longitude: 126.978 })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  // 주변 골프장 검색 API 호출 - 백엔드 파라미터와 정확히 매칭
  const fetchNearbyGolfCourses = async (location) => {
    try {
      setLoading(true)
      console.log("주변 골프장 검색 시작:", location)

      // 반경 10km = 10000m로 설정
      const apiUrl = `/api/golf-courses/nearby?lat=${location.latitude}&lng=${location.longitude}&radius=10000`
      console.log("API 요청 URL:", apiUrl)

      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        console.log("API 응답 데이터:", data)
        setGolfCourses(data || [])
      } else {
        console.error("주변 골프장 검색 API 오류:", response.status, await response.text())
        setGolfCourses([])
      }
    } catch (error) {
      console.error("주변 골프장 검색 네트워크 오류:", error)
      setGolfCourses([])
    } finally {
      setLoading(false)
    }
  }

  // 지역 검색 API 호출
  const searchGolfCourses = async (query) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      console.log("지역 검색 시작:", query)

      const response = await fetch(`/api/golf-courses/search?local=${encodeURIComponent(query)}`)

      if (response.ok) {
        const data = await response.json()
        console.log("검색 API 응답 데이터:", data)
        setGolfCourses(data || [])
      } else {
        console.error("골프장 검색 API 오류:", response.status)
        setGolfCourses([])
      }
    } catch (error) {
      console.error("골프장 검색 네트워크 오류:", error)
      setGolfCourses([])
    } finally {
      setLoading(false)
    }
  }

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault()
    searchGolfCourses(searchQuery)
  }

  // 골프장 클릭 시 상세 정보 로드
  const handleCourseClick = (course) => {
    const detailData = {
      ...course,
      description: `${course.place_name}에서 최고의 골프 경험을 즐겨보세요.`,
      facilities: ["드라이빙레인지", "퍼팅그린", "클럽하우스", "레스토랑"],
      reviews: [
        {
          id: 1,
          userName: "골프매니아",
          rating: 5,
          comment: "코스 관리가 정말 잘 되어있어요!",
          date: "2025.03.13",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          userName: "주말골퍼",
          rating: 4,
          comment: "시설이 깔끔하고 직원분들이 친절해요.",
          date: "2025.03.12",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      loading: false,
    }

    setSelectedCourse(detailData)
  }

  // 거리 포맷팅 함수
  const formatDistance = (distance) => {
    const dist = Number.parseInt(distance)
    if (dist >= 1000) {
      return `${(dist / 1000).toFixed(1)}km`
    }
    return `${dist}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header navigateTo={navigateTo} currentPage="golf-courses" />

      {/* 메인페이지와 완전히 동일한 구조 - flex 제거! */}
      {/* Hero Section - 메인페이지와 동일한 구조 */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="w-screen text-center">
          <div className="space-y-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-tight">
              골프장 찾기
            </h1>

            {/* 위치 상태 표시 */}
            {locationLoading && (
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xl md:text-2xl lg:text-3xl">현재 위치를 확인하고 있습니다...</span>
              </div>
            )}

            {locationPermission === "granted" && userLocation && (
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <Navigation className="w-6 h-6" />
                <span className="text-xl md:text-2xl lg:text-3xl">현재 위치 기반으로 주변 골프장을 표시합니다</span>
              </div>
            )}

            {locationPermission === "denied" && (
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <MapPin className="w-6 h-6" />
                <span className="text-xl md:text-2xl lg:text-3xl">서울 기준으로 골프장을 표시합니다</span>
              </div>
            )}

            {/* 검색창 - 메인페이지 버튼 스타일과 동일 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full">
              <Input
                type="text"
                placeholder="지역명을 입력하세요 (예: 강남, 부산, 제주)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-xl w-full sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[700px]"
              />
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                disabled={loading}
                onClick={handleSearch}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    검색
                  </>
                )}
              </Button>
            </div>

            {/* 내 위치 중심 검색 버튼 추가 */}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent px-6 py-3"
                disabled={locationLoading || loading}
                onClick={async () => {
                  if (userLocation) {
                    await fetchNearbyGolfCourses(userLocation)
                  } else {
                    await requestLocationPermission()
                  }
                }}
              >
                {locationLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Navigation className="w-5 h-5 mr-2" />
                )}
                내 주위 검색
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration - 메인페이지와 동일 */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* 골프장 목록 섹션 - 메인페이지 리뷰 섹션과 동일한 구조 */}
      <section className="py-16 md:py-24">
        <div className="w-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="space-y-4">
            {loading && golfCourses.length === 0 ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
                <p className="text-slate-600 text-2xl">골프장을 검색하고 있습니다...</p>
              </div>
            ) : golfCourses.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="w-20 h-20 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600 text-2xl mb-2">검색된 골프장이 없습니다.</p>
                <p className="text-slate-500 text-xl">다른 지역명으로 검색해보세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {golfCourses.map((course, index) => (
                  <Card
                    key={`${course.place_name}-${index}`}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-emerald-200 border-slate-200 w-full"
                    onClick={() => handleCourseClick(course)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4 w-full">
                        <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-semibold text-slate-900 truncate pr-4">{course.place_name}</h3>
                            {course.distance && (
                              <Badge
                                variant="secondary"
                                className="bg-emerald-100 text-emerald-800 flex-shrink-0 text-lg px-3 py-1"
                              >
                                {formatDistance(course.distance)}
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-lg text-slate-600">
                              <MapPin className="w-5 h-5 flex-shrink-0" />
                              <span className="truncate">{course.road_address_name || course.address_name}</span>
                            </div>
                            {course.phone && (
                              <div className="flex items-center gap-2 text-lg text-slate-600">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <span>{course.phone}</span>
                              </div>
                            )}
                            {course.category_name && (
                              <div className="flex items-center gap-2 text-lg text-slate-600">
                                <span className="text-slate-500 flex-shrink-0">카테고리:</span>
                                <span className="truncate">{course.category_name}</span>
                              </div>
                            )}
                          </div>

                          {course.place_url && (
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              <a
                                href={course.place_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 text-lg font-medium truncate"
                                onClick={(e) => e.stopPropagation()}
                              >
                                상세 정보 보기
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer 추가 */}
      <Footer />

      {/* 사이드 패널 - absolute positioning으로 변경 */}
      {selectedCourse && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white border-l border-slate-200 shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">상세 정보</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* 골프장 기본 정보 */}
              <div>
                <h3 className="text-xl font-semibold mb-3">{selectedCourse.place_name}</h3>
                <p className="text-slate-600 mb-4">{selectedCourse.description}</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium">도로명 주소</p>
                      <p className="text-slate-600 break-words">{selectedCourse.road_address_name}</p>
                      {selectedCourse.address_name !== selectedCourse.road_address_name && (
                        <>
                          <p className="font-medium mt-2">지번 주소</p>
                          <p className="text-slate-600 break-words">{selectedCourse.address_name}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {selectedCourse.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span>{selectedCourse.phone}</span>
                    </div>
                  )}

                  {selectedCourse.distance && (
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span>현재 위치에서 {formatDistance(selectedCourse.distance)}</span>
                    </div>
                  )}

                  {selectedCourse.place_url && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <a
                        href={selectedCourse.place_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-medium break-words"
                      >
                        카카오맵에서 보기
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 카테고리 정보 */}
              {selectedCourse.category_name && (
                <div>
                  <h4 className="font-semibold mb-3">카테고리</h4>
                  <Badge variant="outline">{selectedCourse.category_name}</Badge>
                </div>
              )}

              {/* 시설 정보 */}
              <div>
                <h4 className="font-semibold mb-3">예상 시설</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.facilities?.map((facility, index) => (
                    <Badge key={index} variant="outline">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 리뷰 섹션 */}
              <div>
                <h4 className="font-semibold mb-4">샘플 리뷰</h4>
                <div className="space-y-4">
                  {selectedCourse.reviews?.map((review) => (
                    <div key={review.id} className="border-b border-slate-100 pb-4 last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.userName} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-600 text-xs">
                            {review.userName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">{review.userName}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 break-words">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
