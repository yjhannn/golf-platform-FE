// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import GolfCourseCard from '../components/GolfCourseCard';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const MainPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false); // 초기 로딩은 false
//   const [error, setError] = useState(null);
//   const [query, setQuery] = useState(''); // 검색어 상태

//   // 1. 지역명으로 골프장 검색하는 함수
//   const handleSearch = async () => {
//     if (!query) {
//       alert('검색할 지역명을 입력하세요.');
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('/api/golf-courses/search', {
//         params: { local: query }
//       });
//       setCourses(response.data);
//     } catch (err) {
//       setError('검색 결과를 불러오는 데 실패했습니다.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. 현재 위치 기반으로 주변 골프장 검색하는 함수
//   const handleFindNearby = () => {
//     setLoading(true);
//     setError(null);

//     // 브라우저의 Geolocation API로 현재 위치 가져오기
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const response = await axios.get('/api/golf-courses/nearby', {
//             params: {
//               lat: latitude,
//               lng: longitude,
//               radius: 20000 // 20km 반경
//             }
//           });
//           setCourses(response.data);
//         } catch (err) {
//           setError('주변 골프장 정보를 불러오는 데 실패했습니다.');
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       },
//       (err) => { // 위치 정보 가져오기 실패 시
//         setError('현재 위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
//         console.error(err);
//         setLoading(false);
//       }
//     );
//   };
  
//   // 페이지가 처음 로드될 때 주변 골프장 찾기를 자동으로 실행
//   useEffect(() => {
//     handleFindNearby();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <header className="text-center my-8">
//         <h1 className="text-4xl font-bold mb-2">⛳️ Golf Platform</h1>
//         <p className="text-muted-foreground">가까운 골프장을 찾아보세요!</p>
//       </header>

//       {/* 검색 UI 부분 */}
//       <div className="flex w-full max-w-2xl mx-auto items-center space-x-2 mb-8">
//         <Input
//           type="text"
//           placeholder="지역명 입력 (예: 강남구, 분당)"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//         />
//         <Button onClick={handleSearch}>검색</Button>
//         <Button variant="outline" onClick={handleFindNearby}>내 주변 검색</Button>
//       </div>

//       {/* 골프장 목록 표시 부분 */}
//       <main>
//         {loading && <div className="text-center">목록을 불러오는 중...</div>}
//         {error && <div className="text-center text-red-500">{error}</div>}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.length > 0 ? (
//               courses.map((course) => (
//                 <GolfCourseCard key={course.id} course={course} />
//               ))
//             ) : (
//               <p className="col-span-full text-center text-muted-foreground">
//                 검색 결과가 없습니다.
//               </p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MainPage;

