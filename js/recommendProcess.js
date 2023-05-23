// 제출 버튼 요소 가져오기
const submitBtn = document.getElementById("input-recommend_submit");

// 제출 버튼 클릭 이벤트 처리
submitBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
  
  // 선택한 값들 가져오기
  const selectedDay = document.querySelector("input[name='day']:checked").value; // 1번 문항(공강 요일) 값 가져오기
  const fillCredit = document.getElementById("div-fill_credit").value; // 2번 문항(희망 학점) 가져오기
  const selectedAreas = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.name); // 3번 문항(교양 영역) 가져오기
  
  // 값들을 객체로 만들기
  const data = {
    day: selectedDay, // 공강 요일 값
    credit: fillCredit, // 학점 값
    areas: selectedAreas // 선택한 영역 값들의 배열
  };
  
  // 값들을 JSON 형태로 변환(JSON은 웹에서 데이터를 전송할 때 사용)
  const jsonData = JSON.stringify(data);
  
  // JS 파일 내에서 Python 파일 호출(임시 파일이라서 나중에 수정 필요@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)
  const pythonFile = "../python/skatjfls_recommend.py"; // Python 파일 경로

  // Python 파일 호출 코드(AJAX(서버와 웹이 비동기식으로 데이터 교환) 사용)
  const xhr = new XMLHttpRequest();
  xhr.open("POST", pythonFile, true); // POST 요청 설정
  xhr.setRequestHeader("Content-Type", "application/json"); // 요청 헤더 설정
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText); // Python 파일에서 반환된 응답 출력
    }
  };
  xhr.send(jsonData); // JSON 데이터를 요청으로 보냄

});
//@@@@@@@@@@@@@@@@@@@에러 발생. 근데 js내의 문제가 아니라 서버 보안때문에 발생하는거라 가상환경 만들어서 실행하면 실행 된다고 하는데 일단 해봐야해요@@@@@@@@@@@@@@@@@

const fillCreditInput = document.getElementById("div-fill_credit");

fillCreditInput.addEventListener("change", function() {
  let credit = parseInt(fillCreditInput.value);

  // 입력한 값이 1 미만인 경우 1로 설정
  if (credit < 1) {
    credit = 1;
  }

  // 입력한 값이 20을 초과하는 경우 20으로 설정
  if (credit > 20) {
    credit = 20;
  }

  // 값 업데이트
  fillCreditInput.value = credit;
});


document.getElementById("input-recommend_submit").addEventListener("click", function() {
  var selectedDay = document.querySelector('input[name="day"]:checked');
  var fillCredit = document.getElementById("div-fill_credit").value;
  var selectedClasses = document.querySelectorAll('input[name="balanceClass"]:checked, input[name="CoreClass"]:checked, input[name="RootClass"]:checked');
  
  if (!selectedDay || fillCredit === "" || selectedClasses.length === 0) {
    var alertMessage = "";
    if (!selectedDay) alertMessage += "1번 ";
    if (fillCredit === "") alertMessage += "2번 ";
    if (selectedClasses.length === 0) alertMessage += "3번 ";
  } else {
    location.href = "recommendResult.html";
  }
});

document.getElementById('input-recommend_submit').onclick = function() {
  // 필수 입력 항목이 모두 입력되었는지 확인
  if (document.querySelector('input[name="day"]:checked') && document.getElementById('div-fill_credit').value && document.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
    // 필수 입력 항목이 모두 입력된 경우, 강의 추천 결과 페이지로 이동
    location.href='recommendResult.html';
  } else {
    // 필수 입력 항목 중 입력되지 않은 항목이 있는 경우, alert 메시지 띄우기
    var alertMessage = "";
    if (!document.querySelector('input[name="day"]:checked')) alertMessage += "1번 ";
    if (!document.getElementById('div-fill_credit').value) alertMessage += "2번 ";
    if (document.querySelectorAll('input[name="balanceClass"]:checked').length === 0) alertMessage += "3번 ";
    alert(alertMessage.trim() + " 문항을 입력해주세요.");
    return false; // 폼 제출 방지
  }
};


