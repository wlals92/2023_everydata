//이지민 작성

// 현재 날짜 기반으로 년도와 학기 출력 : 남서린 작성
let today = new Date();
let year = today.getFullYear();
let semester = today.getMonth() < 6 ? 1 : 2;
let message = year + '년 ' + semester + '학기 시간표';
document.getElementById('p-semester_date').innerHTML = message;

//사용자 프로필--------------------------------------------------------------
$.ajax({
  url: "../php/getProfile.php",
  type: "GET",
  dataType: "json",
  success: function(data) {
    const name = data.name;
    const user_credit = data.user_credit;
    const total_credit = data.total_credit;
    const major = data.major;
    const status = data.status;
    const academic_number = data.academic_number;
    const grade = data.grade;

    document.getElementById("profile-name").innerHTML = name;
    document.getElementById("profile-user_credit").innerHTML = user_credit;
    document.getElementById("profile-total_credit").innerHTML = total_credit;
    document.getElementById("profile-major").innerHTML = major;
    document.getElementById("profile-status").innerHTML = status;
    document.getElementById("profile-student_id").innerHTML = academic_number;
    document.getElementById("profile-grade").innerHTML = grade;
  },
  error: function(xhr, status, error){
    console.log(xhr);
    console.log(status);
    console.log(error);
  }
});

let tempSubjects = [];


//강의목록 팝업창 : 메인 '+' 버튼 onclick ------------------------------------
const openSubjectList = () => {
  // const url = 'sample.html';
  const url = 'searchTimeTable.html';
  window.open(url, 'subject-list-popup', 'width=1200,height=800');
};

// 시간표 정보를 서버에서 가져오기
const getTimetableFromServer = async () => {
  try {
    const response = await fetch('../php/getTimetable.php');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('시간표를 가져오는 중에 오류가 발생했습니다.', response.status);
      return [];
    }
  } catch (error) {
    console.error('시간표를 가져오는 중에 오류가 발생했습니다.', error);
    return [];
  }
};


// 시간표 업데이트 함수-------------------------------------------------------
const updateTimetable = async () => {
  try {
    tempSubjects = []; // tempSubjects 초기화
    const subjectsFromServer = await getTimetableFromServer();
    tempSubjects.push(...subjectsFromServer);
    initializeTimetable();
    subjectsFromServer.forEach((subject) => {
      addSubjectToTimetable(subject);
    });
  } catch (error) {
    console.error('시간표 업데이트 중에 오류가 발생했습니다.', error);
  }
};

const MAX_TIMETABLE_HOURS =  9; // 최대 시간표 교시 수

// 시간표 초기화 및 기본 행 생성----------------------------------------------
const initializeTimetable = () => {
  const timetable = document.getElementById("main-timetable");

  // 기존 행 삭제
  while (timetable.firstChild) {
    timetable.firstChild.remove();
  }

  // 머리글 행 생성
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th></th>
    <th>월</th>
    <th>화</th>
    <th>수</th>
    <th>목</th>
    <th>금</th>
    ${hasSaturdaySubject(tempSubjects) ? '<th>토</th>' : ''}
  `;
  timetable.appendChild(headerRow);

  // 기본 행 생성
  const days = ["월", "화", "수", "목", "금"];
  if (hasSaturdaySubject(tempSubjects)) {
    days.push("토");
    timetable.classList.add("has-saturday");
  }

  const maxSubjectHour = findMaxSubjectHour(tempSubjects); // tempSubjects를 전달
  const timetableHours = maxSubjectHour > MAX_TIMETABLE_HOURS ? maxSubjectHour : MAX_TIMETABLE_HOURS;

  for (let i = 1; i <= timetableHours; i++) {
    const row = document.createElement("tr");
    const th = document.createElement("th");
    const time = (8 + i) % 12 || 12; // 9, 10, 11, 12, 1, 2, ... 5
    th.textContent = time;
    row.appendChild(th);

    for (const day of days) {
      const td = document.createElement("td");
      td.dataset.day = day;
      td.dataset.time = i.toString();
      row.appendChild(td);
    }

    timetable.appendChild(row);
  }
};

// 토요일 강의 여부 확인 (시간표 열 확장용)-----------------------------------------
const hasSaturdaySubject = (subjects) => {
  for (const subject of subjects) {
    const dayTimePairs = subject.lecture_time.split(",");
    for (const pair of dayTimePairs) {
      const [day, _] = pair.split(/([^\uAC00-\uD7A3]+)/);
      if (day === '토') {
        return true;
      }
    }
  }
  
  return false;
};


// 가장 큰 교시 확인 (시간표 행 확장용)----------------------------------------
const findMaxSubjectHour = (subjects) => {
  let maxSubjectHour = 0;
  
  for (const subject of subjects) {
    const dayTimePairs = subject.lecture_time.split(",");
    for (const pair of dayTimePairs) {
      const [_, time] = pair.split(/([^\uAC00-\uD7A3]+)/);
      const numericTime = Number(time);
      if (numericTime > maxSubjectHour) {
        maxSubjectHour = numericTime;
      }
    }
  }
  return maxSubjectHour;
};

// 시간표에 강의를 추가---------------------------------------------------------
const addSubjectToTimetable = (subject) => {

  const timetable = document.getElementById("main-timetable");
  const dayTimePairs = subject.lecture_time.split(",");
  let mergedRows = 1; // 통합된 행 수
  let mergedRowStart = null; // 통합된 행 시작 인덱스
  const days = ["월", "화", "수", "목", "금", "토"];

  const colorArray = ["#FFEDEC", "#E7F5F4", "#FFF9D2", "#F2ECF7", "#FFEFDD", "#E0F3EB", "#F2FAD2", "#F4EBEA"]; // 배경색 배열

  for (let i = 0; i < dayTimePairs.length; i++) {
    const [day, time] = dayTimePairs[i].split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);

    

    //시간표 셀 확인
    if (!cell) {
      console.error(`시간표 셀을 찾을 수 없습니다. [day: ${day}, time: ${time}]`);
      continue;
    }

    //해당 시간에 이미 다른 강의가 있는지 확인
    if (cell.children.length > 0) {
      return;
    }

    const isLastSubject = i === dayTimePairs.length - 1; //마지막 교시인지 확인
    //연속된 강의면 mergedRows++
    if (i > 0) {
      const prevSubject = dayTimePairs[i - 1];
      const [prevDay, prevTime] = prevSubject.split(/([^\uAC00-\uD7A3]+)/);
      const currentTime = Number(time);
      const prevTimeEnd = Number(prevTime) + 1;
      if (day === prevDay && currentTime === prevTimeEnd) {
        mergedRows++;
        // continue;
        if (!isLastSubject) {
          continue;
        }
      }
    }

    const div = document.createElement("div");
    div.innerHTML = `
      <div style="font-weight: bold; font-size: 15px; " class="subject_info">${subject.subject_name}</div>
      <div class="subject_info">${subject.professor}</div>
      <div class="subject_info">${subject.lecture_room}</div>
      <button class="delete-button" onclick="removeSubject(${subject.subjects_now_id})">삭제</button>
    `;

  
    //연속된 강의면 rowspan 속성 설정 및 셀 삭제
    if (mergedRows > 1) {
      const startCellIndex = mergedRowStart.cellIndex;
      const rowspan = mergedRows;
      const prevRow = mergedRowStart.parentNode;

      for (let j = 1; j < mergedRows; j++) {
        const currentRowIndex = prevRow.rowIndex + j;
        const currentRow = timetable.rows[currentRowIndex];
        const currentDay = days[startCellIndex-1];
        const cellToRemove = currentRow.querySelector(`#main-timetable td[data-day="${currentDay}"][data-time="${currentRowIndex}"]`);
        if (cellToRemove) {
          cellToRemove.remove();
        }
      }
      mergedRowStart.setAttribute("rowspan", rowspan);
    }
    mergedRows = 1;
    mergedRowStart = cell;

    
    cell.appendChild(div);
    cell.classList.add("added");

    const colorIndex = subject['subjects_now_id'] - 1
    const color = colorArray[colorIndex % colorArray.length];
    cell.style.backgroundColor = color;

  }
};

// 시간표 업데이트
updateTimetable(tempSubjects);

//강의 삭제------------------------------------------------------------------
const removeSubject = (subjects_now_id) => {

  // 서버 강의 삭제 요청
  $.ajax({
    url: '../php/removeSubject.php',
    method: 'POST',
    data: { subjectId: subjects_now_id },
    success: function (response) {
      // 서버 응답 처리
      console.log('강의 삭제 요청이 성공적으로 처리되었습니다.');
    },
    error: function (xhr, status, error) {
      // 서버 요청이 실패한 경우 에러 처리
      console.error('강의 삭제 요청이 실패하였습니다.', error);
    }
  });
  updateTimetable(tempSubjects);
};


//시간표 강의가 추가됐는지 확인하고 추가(변경)됐으면 함수 호출---------------------
// 로컬 스토리지 확인
setInterval(function() {
  if (localStorage.getItem('subjectAdded') === 'true') {
    // 실행할 함수 호출
    updateTimetable(tempSubjects);

    // 상태 변경 감지 후 값 초기화
    localStorage.setItem('subjectAdded', 'false');
  }
}, 1000);