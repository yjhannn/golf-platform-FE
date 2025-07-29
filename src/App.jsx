"use client"

import { useState } from "react"
import HomePage from "./pages/HomePage"
import GolfCoursePage from "./pages/GolfCoursePage"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  // 페이지 변경 함수
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // 페이지 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case "golf-courses":
        return <GolfCoursePage navigateTo={navigateTo} />
      case "community":
        return <div>커뮤니티 페이지 (준비중)</div>
      case "about":
        return <div>소개 페이지 (준비중)</div>
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  }

  return renderPage()
}

export default App
