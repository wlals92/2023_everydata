// 개설 교양 목록 가져오기-------------------------------------------------
const tempSubjects = [];
// 현재 날짜 기반으로 년도와 학기 출력 : 남서린 작성
let today = new Date();
let year = today.getFullYear();
let semester = today.getMonth() < 6 ? 1 : 2;
let message = year + '년 ' + semester + '학기';
document.getElementById('p-semester_date').innerHTML = message;

const table = document.getElementById("div-class_list_table");
const categorySelect = document.getElementById("table-ge_category");

// 강의 목록을 표시하는 함수
async function displaySubjectList(subjectsList) {
  // 기존 테이블 내용 삭제
  while (table.firstChild) {
    table.firstChild.remove();
  }

  try {
    const response = await fetch('../php/getSubjectsList.php', {
      method: 'GET'
    });
    const data = await response.json();
    subjectsList.push(...data);

    // 선택된 카테고리
    const selectedCategory = categorySelect.value;

    subjectsList.forEach(subject => {
      // 과목의 카테고리와 선택된 카테고리를 비교하여 일치하는 경우에만 출력
      if (subject.category === selectedCategory) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${subject.subject_name}</td>
          <td>${subject.professor}</td>
          <td>${subject.category}${subject.ge_category ? `<br>(${subject.ge_category})` : ''}</td>
          <td>${subject.subject_code}</td>
          <td>${subject.lecture_time}</td>
          <td>${subject.lecture_room}</td>
          <td><button type="button" onclick="addSubjectFromList(${subject['1st_subjects_id']})">시간표에 추가</button></td>
        `;
        table.appendChild(tr);
      }
    });
  } catch (error) {
    console.error('데이터를 가져오는 도중 오류가 발생했습니다.', error);
  }
}

// 초기 페이지 로드 시 전체 강의 목록 표시
async function initializePage() {
  try {
    await displaySubjectList(tempSubjects);
  } catch (error) {
    console.error('강의 목록 표시 중 오류가 발생했습니다.', error);
  }
}

// 카테고리 선택 이벤트 처리
categorySelect.addEventListener("change", function() {
  // 과목 목록을 업데이트합니다.
  updateSubjectList();
});

// 과목 목록을 업데이트하는 함수
function updateSubjectList() {
  // 기존 테이블 내용 삭제
  while (table.firstChild) {
    table.firstChild.remove();
  }

  // 과목 목록을 가져와서 선택된 카테고리와 일치하는 과목만 표시합니다.
  displaySubjectList(tempSubjects);
}

// 체크된 요일의 value 값을 저장할 변수
var selectedDay = null;

// 체크된 교시의 value 값을 저장할 변수
var selectedHour = null;

// 체크박스 요소들을 선택합니다
var dayCheckboxes = document.getElementsByClassName("table-select_day");
var hourCheckboxes = document.getElementsByClassName("table-select_hour");
console.log(dayCheckboxes); // 확인용 로그
console.log(hourCheckboxes); // 확인용 로그

// 요일 체크박스 이벤트 처리
for (var i = 0; i < dayCheckboxes.length; i++) {
  dayCheckboxes[i].addEventListener("change", function() {
    // 다른 요일 체크박스를 해제합니다
    for (var j = 0; j < dayCheckboxes.length; j++) {
      if (dayCheckboxes[j] !== this) {
        dayCheckboxes[j].checked = false;
      }
    }

    // 선택된 요일 값을 변수에 저장합니다
    if (this.checked) {
      selectedDay = this.value;
    } else {
      selectedDay = null;
    }
  });
}

// 교시 체크박스 이벤트 처리
for (var k = 0; k < hourCheckboxes.length; k++) {
  hourCheckboxes[k].addEventListener("change", function() {
    // 다른 교시 체크박스를 해제합니다
    for (var l = 0; l < hourCheckboxes.length; l++) {
      if (hourCheckboxes[l] !== this) {
        hourCheckboxes[l].checked = false;
      }
    }

    // 선택된 교시 값을 변수에 저장합니다
    if (this.checked) {
      selectedHour = this.value;
    } else {
      selectedHour = null;
    }
  });
}

// 서버에 강의 추가 요청 전송
const addSubjectToServer = (subject) => {
  // AJAX 요청
  $.ajax({
    url: '../php/addSubject.php',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(subject),
    success: function (response) {
      console.log('강의 추가 요청이 성공적으로 전송되었습니다.');

      localStorage.setItem('subjectAdded', 'true');
    },
    error: function (xhr, status, error) {
      console.error('강의 추가 요청이 실패하였습니다.');
    }
  });
};

// 서버에서 현재 강의 목록 가져오기
const getTimetableFromServer = async () => {
  try {
    const subjects = await $.ajax({
      url: '../php/getTimetable.php',
      type: 'GET'
    });
    return subjects;
  } catch (error) {
    console.error('강의 목록을 가져오는 도중 오류가 발생하였습니다.', error);
    return [];
  }
};

// 이미 추가된 강의인지 확인하는 함수
const isAlreadyAdded = async (subject) => {
  const subjects = await getTimetableFromServer();
  const alreadyAdded = subjects.find((addedSubject) => addedSubject['subject_code'] == subject['subject_code']);
  return alreadyAdded !== undefined;
};

// 해당 시간에 강의가 이미 있는지 확인하는 함수
const isTimeConflict = async (day, time) => {
  const subjects = await getTimetableFromServer();
  const lectureTimes = subjects.map(subject => subject.lecture_time);
  for (let i = 0; i < lectureTimes.length; i++) {
    const lectureTime = lectureTimes[i];
    if (lectureTime.includes(day + time)) {
      return true; // 시간 충돌
    }
  }
  return false; // 시간 겹치는 강의 없음
};

// 강의목록에서 강의 추가
const addSubjectFromList = async (subjectId) => {
  const subject = tempSubjects.find((subject) => subject['1st_subjects_id'] == subjectId);
  if (subject) {
    const dayTimePairs = subject.lecture_time.split(", ");

    for (const dayTimePair of dayTimePairs) {
      const [day, time] = dayTimePair.split(/([^\uAC00-\uD7A3]+)/);

      const isAdded = await isAlreadyAdded(subject);
      if (isAdded) {
        alert('이미 추가된 강의입니다.');
      } else {
        const isConflict = await isTimeConflict(day, time);
        if (isConflict) {
          alert('해당 시간에 이미 다른 강의가 있습니다.');
        } else {
          addSubjectToServer(subject);
        }
      }
    }
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
};

initializePage();
