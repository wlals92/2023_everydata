// 남서린 작성
// 제출 버튼 요소 가져오기
const submitBtn = document.getElementById("input-recommend_submit");

// 제출 버튼 클릭 이벤트 처리
submitBtn.addEventListener("click", function(event) {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
  
  // 선택한 값들 가져오기
  const selectedDay = document.querySelector("input[name='day']:checked").value; // 1번 문항(공강 요일) 값 가져오기
  const fillCredit = document.getElementById("div-fill_credit").value; // 2번 문항(희망 학점) 가져오기
  const selectedAreas = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value); // 3번 문항(교양 영역) 가져오기

  // 값들을 객체로 만들기
  const data = {
    day: selectedDay, // 공강 요일 값
    credit: fillCredit, // 학점 값
    areas: selectedAreas // 선택한 영역 값들의 배열
  };

  fetch("../php/recommendSubjects.php", {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error); // 오류 메시지 출력
    });

});


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
  if (document.querySelector('input[name="day"]:checked') && document.getElementById('div-fill_credit').value && (document.querySelectorAll('input[name="balanceClass"]:checked').length > 0 || document.querySelectorAll('input[name="CoreClass"]:checked').length > 0 || document.querySelectorAll('input[name="RootClass"]:checked').length > 0)) {
    // 필수 입력 항목이 모두 입력된 경우, 강의 추천 결과 페이지로 이동
    location.href='recommendResult.html';
  } else {
    // 필수 입력 항목 중 입력되지 않은 항목이 있는 경우, alert 메시지 띄우기
    var alertMessage = "";
    if (!document.querySelector('input[name="day"]:checked')) alertMessage += "1번 ";
    if (!document.getElementById('div-fill_credit').value) alertMessage += "2번 ";
    if (document.querySelectorAll('input[name="balanceClass"]:checked').length === 0 && document.querySelectorAll('input[name="CoreClass"]:checked').length === 0 && document.querySelectorAll('input[name="RootClass"]:checked').length === 0) alertMessage += "3번 ";
    alert(alertMessage.trim() + " 문항을 입력해주세요.");
    return false; // 폼 제출 방지
  }
};




// 여기서부터 이지민 작성 ----------------------------------------------------------------------------
// 모두 선택 함수
function toggleCheckboxes(className) {
  if (className) {
    // 영역별 모두 선택
    let selectAllCheckbox = document.getElementById("selectAll" + className);
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="' + className + '"]');

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = selectAllCheckbox.checked;
    }
  } else {
    // 전체 모두 선택
    let selectAllCheckbox = document.getElementById("selectAll");
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
      let checkbox = checkboxes[i];
      if (checkbox.name === 'balanceClass' || checkbox.name === 'RootClass' || checkbox.name === 'CoreClass') {
        checkbox.checked = selectAllCheckbox.checked;
      }
    }
  }
}

// 이름 받아옴 : 000님을 위한 강의 추천 표시용
fetch('../php/getSession.php')
  .then(response => {
    if (!response.ok) {
      throw new Error('서버 요청이 실패하였습니다.');
    }
    return response.json();
  })
  .then(data => {
    const user_name = document.getElementById('user_name');
    user_name.innerHTML = data.name;
  })
  .catch(error => {
    console.error('서버 요청이 실패하였습니다.', error);
  });