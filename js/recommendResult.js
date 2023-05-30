// 남서린 작성

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



// 이지민 작성 ---------------------------------------------------------------------------
// 강의 시간표에 추가
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