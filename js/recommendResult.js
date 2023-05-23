const results = [
  {
    title: "환경과 오염",
    professor: "김둘선",
    category: "균형교양(통합교양) - 5영역(과학과 기술)",
    time: "월 1,2",
    classroom: "024-0260"
  },
  {
    title: "사회학개론",
    professor: "이네모",
    category: "핵심교양(역량교양) - 사회과학",
    time: "화 3,4",
    classroom: "013-0203"
  },
  {
    title: "글쓰기의 기초",
    professor: "박글",
    category: "기초교양",
    time: "수 2,3",
    classroom: "025-0312"
  },
  {
    title: "문화와 예술",
    professor: "김예술",
    category: "균형교양(통합교양) - 1영역(문학과 문화)",
    time: "목 4,5",
    classroom: "032-0410"
  },
  {
    title: "디지털 리터러시",
    professor: "정디지",
    category: "핵심교양(역량교양) - 정보문화",
    time: "금 1,2",
    classroom: "009-0156"
  }
];

// //파이썬에서 강의추천 돌린거 가져오기-------------
// $.ajax({
//   url: '/api/recommend-courses',
//   method: 'GET',
//   success: function(response) {
//       // 서버에서 받은 추천된 강의 목록 처리
//       response.forEach(function(course) {
//           console.log('강의 제목:', course.title);
//           console.log('강사:', course.professor);
//           console.log('카테고리:', course.category);
//           console.log('시간:', course.time);
//           console.log('강의실:', course.classroom);
//           // 여기에서 필요한 처리를 수행
//       });

//       // 강의 추천 결과를 화면에 표시
//       displayResults(response);
//   },
//   error: function(xhr, status, error) {
//       // 서버 요청이 실패한 경우 에러 처리
//       console.error('강의 추천 요청 실패.', error);
//   }
// });


// 강의 추천 결과를 화면에 표시하는 함수
function displayResults(results) {
  const resultContainer = document.getElementById("section-recommend_list");

  // 결과 컨테이너를 비웁니다.
  resultContainer.innerHTML = "";

  // 추천 결과에 따라 각각의 요소를 생성해서 컨테이너에 추가합니다.
  results.forEach(function(result) {
    const title = result.title;
    const professor = result.professor;
    const category = result.category;
    const time = result.time;
    const classroom = result.classroom;

    // 결과를 보여주는 HTML 요소를 생성합니다.
    const resultElement = document.createElement("div");
    resultElement.id = "div-recommended_class";

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.name = "recommendedClassName";
    checkboxElement.value = title; 

    const titleElement = document.createElement("h3");
    const professorElement = document.createElement("p");
    const categoryElement = document.createElement("p");
    const timeElement = document.createElement("p");
    const classroomElement = document.createElement("p");

    titleElement.innerText = title;
    professorElement.innerText = "교수: " + professor;
    categoryElement.innerText = "구분: " + category;
    timeElement.innerText = "시간: " + time;
    classroomElement.innerText = "강의실: " + classroom;

    resultElement.appendChild(checkboxElement);
    resultElement.appendChild(titleElement);
    resultElement.appendChild(professorElement);
    resultElement.appendChild(categoryElement);
    resultElement.appendChild(timeElement);
    resultElement.appendChild(classroomElement);

    resultContainer.appendChild(resultElement);
  });
}

displayResults(results);







// 강의 추천을 실행하는 함수
function recommendCourses() {
  // 사용자가 입력한 카테고리를 가져옴
  const category = getCategory();
  
  // AJAX 요청을 보내서 강의 추천 결과를 가져오기
  $.ajax({
    url: "/recommend-courses",
    type: "POST",
    data: { category: category },
    dataType: "json",
    success: function(data) {
      // 강의 추천 결과를 화면에 표시합니다.
      displayResults(data.results);
    },
    error: function(xhr, status, error) {
      console.log(xhr);
      console.log(status);
      console.log(error);
    }
  });
}
// 다시 추천 받기 눌렀을 때--------------------------------------------
// "다시 추천 받기" 버튼 요소 가져오기
const reRecommendBtn = document.getElementById("section-re_recommend");


// "다시 추천 받기" 버튼 클릭 이벤트 처리
reRecommendBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

  // Python 파일 경로
  const pythonFile = "../python/skatjfls_recommend.py";

  // Python 파일 호출 코드 작성 (예시: AJAX 사용)
  const xhr = new XMLHttpRequest();
  xhr.open("GET", pythonFile, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText); // Python 파일에서 반환된 응답 출력
    }
  };
  xhr.send();
});


// @@@@@얘도 마찬가지로 오류 발생하는데 보안 이슈라 가상환경 구축이 완료되어야할 것 같아요@@@@@@@@@@@@@@@@@@@@@@@@