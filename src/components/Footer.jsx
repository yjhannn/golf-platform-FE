export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GT</span>
              </div>
              <span className="font-bold text-xl">그린톡</span>
            </div>
            <p className="text-slate-400">골퍼들을 위한 최고의 골프장 정보 플랫폼</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/golf-courses" className="hover:text-white transition-colors">
                  골프장 찾기
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-white transition-colors">
                  커뮤니티
                </a>
              </li>
              <li>
                <a href="/reviews" className="hover:text-white transition-colors">
                  리뷰
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  도움말
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">회사</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 그린톡. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
