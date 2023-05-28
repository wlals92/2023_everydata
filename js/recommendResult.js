// 남서린 작성
// const results = [
//   {
//     title: "환경과 오염",
//     professor: "김둘선",
//     category: "균형교양(통합교양) - 5영역(과학과 기술)",
//     time: "월 1,2",
//     classroom: "024-0260"
//   },
//   {
//     title: "사회학개론",
//     professor: "이네모",
//     category: "핵심교양(역량교양) - 사회과학",
//     time: "화 3,4",
//     classroom: "013-0203"
//   },
//   {
//     title: "글쓰기의 기초",
//     professor: "박글",
//     category: "기초교양",
//     time: "수 2,3",
//     classroom: "025-0312"
//   },
//   {
//     title: "문화와 예술",
//     professor: "김예술",
//     category: "균형교양(통합교양) - 1영역(문학과 문화)",
//     time: "목 4,5",
//     classroom: "032-0410"
//   },
//   {
//     title: "디지털 리터러시",
//     professor: "정디지",
//     category: "핵심교양(역량교양) - 정보문화",
//     time: "금 1,2",
//     classroom: "009-0156"
//   }
// ];

// 강의추천 돌린거 가져오기-------------
$.ajax({
  url: '../php/recommendResult.php',
  method: 'POST',
  dataType: "json",
  success: function(response) {
    // 강의 추천 결과를 화면에 표시
    if (response === false) {
      const noResult = document.createElement("h3");
      noResult.id = "noResult";
      noResult.textContent = "추천한 강의가 없습니다.";
      document.getElementById("section-recommend_list").appendChild(noResult);
    } else {
      displayResults(response);
      const recommendList = document.getElementById("section-recommend_list");
      const recommendListItems = recommendList.querySelectorAll("div");
      if (recommendListItems.length <= 2) {
        recommendList.style.justifyContent = "center";
      } else {
        recommendList.style.justifyContent = "flex-start";
      }
    }
  },
  error: function(xhr, status, error) {
      // 서버 요청이 실패한 경우 에러 처리
      console.error('강의 추천 요청 실패.', error);
  }
});


// 강의 추천 결과를 화면에 표시하는 함수
function displayResults(results) {
  const resultContainer = document.getElementById("section-recommend_list");

  // 결과 컨테이너를 비웁니다.
  resultContainer.innerHTML = "";

  // 추천 결과에 따라 각각의 요소를 생성해서 컨테이너에 추가합니다.
  results.forEach(function(result) {
    const name = result.subject_name;
    const professor = result.professor;
    const category = result.category;
    const credit = result.credit;
    const time = result.lecture_time;
    const room = result.lecture_room;
    const subject_id = result.subject_id;

    // 결과를 보여주는 HTML 요소를 생성합니다.
    const resultElement = document.createElement("div");
    resultElement.id = "div-recommended_class";

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.name = "recommendedClassName";
    checkboxElement.value = subject_id;

    const nameElement = document.createElement("h3");
    const professorElement = document.createElement("p");
    const categoryElement = document.createElement("p");
    const creditElement = document.createElement("p");
    const timeElement = document.createElement("p");
    const roomElement = document.createElement("p");

    nameElement.innerText = name;
    professorElement.innerText = "교수: " + professor;
    categoryElement.innerText = "구분: " + category;
    creditElement.innerText = "학점: " + credit;
    timeElement.innerText = "시간: " + time;
    roomElement.innerText = "강의실: " + room;

    resultElement.appendChild(checkboxElement);
    resultElement.appendChild(nameElement);
    resultElement.appendChild(professorElement);
    resultElement.appendChild(categoryElement);
    resultElement.appendChild(creditElement);
    resultElement.appendChild(timeElement);
    resultElement.appendChild(roomElement);

    resultContainer.appendChild(resultElement);
  });
}

// 다시 추천 받기 눌렀을 때--------------------------------------------
// "다시 추천 받기" 버튼 요소 가져오기
const reRecommendBtn = document.getElementById("section-re_recommend");
// "다시 추천 받기" 버튼 클릭 이벤트 처리
reRecommendBtn.addEventListener("click", function(event) {
  location.reload();
});


// @@@@@얘도 마찬가지로 오류 발생하는데 보안 이슈라 가상환경 구축이 완료되어야할 것 같아요@@@@@@@@@@@@@@@@@@@@@@@@

const timetableButton = document.getElementById("section-add_in_time_table");
timetableButton.addEventListener("click", function() {
  const checkboxes = document.getElementsByName("recommendedClassName");
  const selectedCourses = [];

  // 체크된 강의를 선택된 강의 배열에 추가
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      selectedCourses.push(checkbox.value);
    }
  });

  // 서버로 전송
  const requestData = {
    courses: selectedCourses
  };

  $.ajax({
    url: "../php/addSubjects.php", // 서버 URL 입력
    method: "POST", // 전송 방식 (GET, POST 등)
    contentType: 'application/json',
    data: JSON.stringify(requestData),
    success: function(response) {
      // 서버 응답 처리
      alert("강의가 추가되었습니다.");
      window.location.href = "../html/main.html";
    },
    error: function(error) {
      // 에러 처리
      console.error("강의 전송 중 오류가 발생하였습니다.");
    }
  });
});