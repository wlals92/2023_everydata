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
  // // 기존 테이블 내용 삭제
  // while (table.firstChild) {
  //   table.firstChild.remove();
  // }

  try {
    const response = await fetch('../php/getSubjectsList.php', {
      method: 'GET'
    });
    const data = await response.json();
    subjectsList.push(...data);

    subjectsList.forEach(subject => {
      const tr = document.createElement("tr");
      const formattedLectureTime = formatLectureTime(subject.lecture_time);
      tr.innerHTML = `
        <td>${subject.subject_name}</td>
        <td>${subject.professor}</td>
        <td>${subject.category}${subject.ge_category ? `<br>(${subject.ge_category})` : ''}</td>
        <td>${subject.subject_code}</td>
        <td>${formattedLectureTime}</td>
        <td>${subject.lecture_room}</td>
        <td><button type="button" onclick="addSubjectFromList(${subject['1st_subjects_id']})">시간표에 추가</button></td>
        <td style="display: none;">${subject.lecture_time}</td>
      `;
      table.appendChild(tr);
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

initializePage();


// 이지민 작성 ---------------------------------------------------------------------------
// 시간 형식 변환 : ex. 화2, 화3, 수1, 수2 -> 화2, 3, 수1, 2
function formatLectureTime(lectureTime) {
  const times = lectureTime.split(','); // 시간을 쉼표로 분할하여 배열로 변환
  const formattedTimes = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i].trim(); // 각 시간 문자열 앞뒤의 공백 제거

    if (i > 0 && time.startsWith(times[i - 1].charAt(0))) {
      // 이전 시간과 같은 요일인 경우
      const prevTime = formattedTimes.pop(); // 이전 요일 + 시간
      const currentTime = time.substring(1); //현재 시간
      formattedTimes.push(prevTime + ', ' + currentTime); // 이전 요일과 현재 시간을 합쳐서 배열에 추가
    } else {
      formattedTimes.push(time); // 이전 시간과 요일이 다른 경우 그대로 배열에 추가
    }
  }

  return formattedTimes.join(', '); // 변경된 시간들을 다시 쉼표로 연결하여 반환
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
      alert('강의가 추가되었습니다.');

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
    const dayTimePairs = subject.lecture_time.split(",");
    let hasConflict = false;
    let hasAdded = false;
    
    for (const dayTimePair of dayTimePairs) {
      const [day, time] = dayTimePair.split(/([^\uAC00-\uD7A3]+)/);

      const isAdded = await isAlreadyAdded(subject);
      if (isAdded) {
        hasAdded = true;
        window.alert('이미 추가된 강의입니다.');
        break;
      } else {
        const isConflict = await isTimeConflict(day, time);
        if (isConflict) {
          hasConflict = true;
          window.alert('해당 시간에 이미 다른 강의가 있습니다.');
          break;
        }
      }
    }
    if (!hasConflict && !hasAdded) {
      addSubjectToServer(subject);
    }
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
};


// 강의 검색------------------------------------------------------------------------
const searchInput = document.getElementById('form-search_text');
const searchButton = document.getElementById('form-search_button');

searchButton.addEventListener('click', function(event) {
  event.preventDefault();
});

// 검색어 입력
searchInput.addEventListener('input', function() {
  showFilteredLectures();
});

const searchSelect = document.getElementById('form-search_select');
searchSelect.addEventListener('change', handleSearchSelect);

// 검색 종류 드롭다운
function handleSearchSelect(){
  const selectedValue = searchSelect.value;
  if (selectedValue === 'lectureName'){
    searchInput.placeholder = '강의명 검색';
  }else{
    searchInput.placeholder = '이수구분 검색';
  }
}


// 카테고리별 강의목록 필터링----------------------------------------------------
// 요일 체크박스 변경 시
const dayCheckboxes = document.querySelectorAll('.table-select_day');
const hourCheckboxes = document.querySelectorAll('.table-select_hour');
dayCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    // 모든 체크박스 해제
    if (this.checked) {
      dayCheckboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    } else {
      this.checked = false;
    }
    showFilteredLectures()
  });
});

hourCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    showFilteredLectures()
  });
});

// 필터링된 강의 목록을 보여주는 함수
function showFilteredLectures() {
  const searchValue = searchInput.value;
  const selectedDay = document.querySelector('input[name="table-select_day"]:checked');
  const selectedHours = Array.from(document.querySelectorAll('input[name="table-select_time"]:checked')).map(checkbox => checkbox.value);
  const selectedValue = searchSelect.value;

  let cellNumber = 0;
  if (selectedValue === 'lectureName'){
    cellNumber = 0;
  }else{
    cellNumber = 2;
  }
  if (selectedDay || selectedHours.length > 0) {
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const lectureTime = row.cells[7].textContent;
      const lectureCell = row.cells[cellNumber].textContent;
      let shouldDisplay = false;

      // selectedDay가 선택된 경우
      if (selectedDay && selectedHours.length == 0) {
        const searchTime = selectedDay.value;
        if (lectureTime.includes(searchTime)) {
          shouldDisplay = true;
        }
      }

      // selectedHours가 선택된 경우
      if (selectedHours.length > 0 && !selectedDay) {
        shouldDisplay = true; // 기본값으로 true 설정
        for (let j = 0; j < selectedHours.length; j++) {
          const searchTime = selectedHours[j];
          const regex = new RegExp(`\\b${searchTime}\\b`); // 정확한 일치 검사(ex. searchTime이 5 일때 15 출력 방지)
          if (!lectureTime.match(regex)) {
            shouldDisplay = false;
            break;
          }
        }
      }
      
      // selectedDay, selectedHours 둘다 선택된 경우
      if (selectedDay && selectedHours.length > 0) {
        shouldDisplay = true; // 기본값으로 true 설정
        for (let j = 0; j < selectedHours.length; j++) {
          const searchTime = selectedDay.value + selectedHours[j];
          if (!lectureTime.includes(searchTime)) {
            shouldDisplay = false; // 하나라도 포함되지 않으면 false 설정하고 종료
            break;
          }
        }
      }
      if (shouldDisplay) {
        row.style.display = ''; // 보여줌
        // 검색어가 있을 경우
        if (searchValue!=''){
          if (!lectureCell.includes(searchValue)) {
            row.style.display = 'none'; // 숨김
          }
        }
      } else {
        row.style.display = 'none'; // 숨김
      }
    }
  } else {
    // 선택된 요일과 교시가 없을 때 전체 강의 보여주기
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const lectureCell = row.cells[cellNumber].textContent;
      row.style.display = ''; // 보여줌
      // 검색어가 있을 경우
      if (searchValue!=''){
        if (!lectureCell.includes(searchValue)) {
          row.style.display = 'none'; // 숨김
        }
      }
    }
  }
}