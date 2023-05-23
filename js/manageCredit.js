// 임의의 데이터베이스
//남은 학점 DB
const data = [
  { area: 1, credit: 2, completed: true },
  { area: 2, credit: 3, completed: true },
  { area: 3, credit: 2, completed: true },
  { area: 4, credit: 1, completed: true },
  { area: 5, credit: 1, completed: true },
  { area: 6, credit: 2, completed: false },
  { area: 7, credit: 2, completed: false },
  { area: 8, credit: 1, completed: false }
];

//개설전공 DB
const major_data=[
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과"}
];

// 졸업요건 충족했는지 여부를 판단하는 함수
function calculateCompletedCreditsByArea() {
  const completedCredits = Array(8).fill(0);

  data.forEach(item => {
    if (item.completed) {
      completedCredits[item.area - 1] += item.credit;
    }
  });

  const completedAreas = [];
  for (let i = 0; i < completedCredits.length; i++) {
    if (completedCredits[i] >= 2) {
      completedAreas.push(i + 1);
    }
  }

  if (completedAreas.length >= 5) {
    const graduationRequirement = `[균형교양]은 ${completedAreas.join(',')} 영역을 이수했습니다. 졸업요건을 충족합니다.`;
    document.getElementById('graduation-requirement').textContent = graduationRequirement;
  } else {
    const graduationRequirement = `[균형교양]은 ${completedAreas.join(',')} 영역을 이수했습니다. 졸업요건을 충족하지 않습니다.`;
    document.getElementById('graduation-requirement').textContent = graduationRequirement;
  }

  return completedCredits;
}

calculateCompletedCreditsByArea();

// 임의의 데이터베이스(남서린 이수내역확인표)
// 소요
const coreCapacityNeed = 10;
const balanceIntegrationNeed = 10;
const foundationNeed = 9;
const generalNeed = 6;
const majorEssentialNeed = 18;
const majorElectiveNeed = 21;
const minorEssentialNeed = 21;
const minorElectiveNeed = 15;
const teachingNeed = 0;
const remaining1Need = 0;
const remaining2Need = 0;

// 취득
const coreCapacityAcquire = 10;
const balanceIntegrationAcquire = 16;
const foundationAcquire = 12;
const generalAcquire = 9;
const majorEssentialAcquire = 12;
const majorElectiveAcquire = 15;
const minorEssentialAcquire = 6;
const minorElectiveAcquire = 3;
const teachingAcquire = 0;
const remaining1Acquire = 0;
const remaining2Acquire = 0;

// 잔여
// 취득학점이 소요학점 이상일 경우 0(단순히 빼기하면 취득이 소요보다 클때 마이너스 값이 나옴)
// 취득학점이 소요학점 미만일 경우 소요학점-취득학점 출력
let coreCapacityRemaining = coreCapacityNeed - coreCapacityAcquire;
if (coreCapacityAcquire >= coreCapacityNeed) {
  coreCapacityRemaining = 0;
} else {
  coreCapacityRemaining = coreCapacityNeed - coreCapacityAcquire;
}

let balanceIntegrationRemaining = balanceIntegrationNeed - balanceIntegrationAcquire;
if (balanceIntegrationAcquire >= balanceIntegrationNeed){
  balanceIntegrationRemaining = 0;
} else {
  balanceIntegrationRemaining = balanceIntegrationNeed - balanceIntegrationAcquire;
}

let foundationRemaining = foundationNeed - foundationAcquire;
if (foundationAcquire >= foundationNeed){
  foundationRemaining = 0;
} else {
  foundationRemaining = foundationNeed - foundationAcquire;
}

let generalRemaining = generalNeed - generalAcquire;
if (generalAcquire>=generalNeed){
  generalRemaining=0;
} else {
  generalRemaining=generalNeed-generalAcquire;
}

let majorEssentialRemaining = majorEssentialNeed - majorEssentialAcquire;
if(majorEssentialAcquire>=majorEssentialNeed){
  majorEssentialRemaining=0;
} else {
  majorEssentialRemaining = majorEssentialNeed-majorEssentialAcquire;
}

let majorElectiveRemaining = majorElectiveNeed - majorElectiveAcquire;
if (majorElectiveAcquire>=majorElectiveNeed){
  majorElectiveRemaining=0;
} else{
  majorElectiveRemaining=majorElectiveNeed-majorElectiveAcquire;
}

let minorEssentialRemaining = minorEssentialNeed - minorEssentialAcquire;
if (minorEssentialAcquire>=minorEssentialNeed){
  minorElectiveRemaining = 0;
} else {
  minorEssentialRemaining = minorEssentialNeed - minorEssentialAcquire;
}

let minorElectiveRemaining = minorElectiveNeed - minorElectiveAcquire;
if (minorElectiveAcquire>=minorElectiveNeed){
  minorElectiveRemaining = 0;
} else {
  minorElectiveRemaining = minorElectiveNeed- minorElectiveAcquire;
}

let teachingRemaining = teachingNeed - teachingAcquire;
if (teachingAcquire<=teachingNeed){
  teachingRemaining = 0;
} else{
  teachingRemaining = teachingNeed-teachingAcquire;
}

let remaining1Remaining = remaining1Need - remaining1Acquire;
if (remaining1Acquire>=remaining1Need){
  remaining1Remaining=0;
} else{
  remaining1Remaining=remaining1Need-remaining1Acquire;
}

let remaining2Remaining = remaining2Need - remaining2Acquire;
if (remaining2Acquire>=remaining2Need){
  remaining2Remaining=0;
} else{
  remaining2Remaining=remaining2Need-remaining2Acquire;
}

// // 서버 이수내역확인표 정보 요청------------------

// $.ajax({
//   url: '/api/subjects-completed-pdf',  // 데이터를 받아올 API 엔드포인트의 URL을 설정.
//   method: 'GET',  // GET 메서드를 사용하여 데이터를 요청.
//   success: function(response) {
//     // 서버 응답 처리
//     document.getElementById("core-capacity-need").innerHTML = response.coreCapacityNeed;
//     document.getElementById("balance-integration-need").innerHTML = response.balanceIntegrationNeed;
//     document.getElementById("foundation-need").innerHTML = response.foundationNeed;
//     document.getElementById("general-need").innerHTML = response.generalNeed;
//     document.getElementById("major-essential-need").innerHTML = response.majorEssentialNeed;
//     document.getElementById("major-elective-need").innerHTML = response.majorElectiveNeed;
//     document.getElementById("minor-essential-need").innerHTML = response.minorEssentialNeed;
//     document.getElementById("minor-elective-need").innerHTML = response.minorElectiveNeed;
//     document.getElementById("teaching-need").innerHTML = response.teachingNeed;
//     document.getElementById("remaining1-need").innerHTML = response.remaining1Need;
//     document.getElementById("remaining2-need").innerHTML = response.remaining2Need;

//     document.getElementById("core-capacity-acquire").innerHTML = response.coreCapacityAcquire;
//     document.getElementById("balance-integration-acquire").innerHTML = response.balanceIntegrationAcquire;
//     document.getElementById("foundation-acquire").innerHTML = response.foundationAcquire;
//     document.getElementById("general-acquire").innerHTML = response.generalAcquire;
//     document.getElementById("major-essential-acquire").innerHTML = response.majorEssentialAcquire;
//     document.getElementById("major-elective-acquire").innerHTML = response.majorElectiveAcquire;
//     document.getElementById("minor-essential-acquire").innerHTML = response.minorEssentialAcquire;
//     document.getElementById("minor-elective-acquire").innerHTML = response.minorElectiveAcquire;
//     document.getElementById("teaching-acquire").innerHTML = response.teachingAcquire;
//     document.getElementById("remaining1-acquire").innerHTML = response.remaining1Acquire;
//     document.getElementById("remaining2-acquire").innerHTML = response.remaining2Acquire;

//     document.getElementById("core-capacity-remaining").innerHTML = response.coreCapacityRemaining;
//     document.getElementById("balance-integration-remaining").innerHTML = response.balanceIntegrationRemaining;
//     document.getElementById("foundation-remaining").innerHTML = response.foundationRemaining;
//     document.getElementById("general-remaining").innerHTML = response.generalRemaining;
//     document.getElementById("major-essential-remaining").innerHTML = response.majorEssentialRemaining;
//     document.getElementById("major-elective-remaining").innerHTML = response.majorElectiveRemaining;
//     document.getElementById("minor-essential-remaining").innerHTML = response.minorEssentialRemaining;
//     document.getElementById("minor-elective-remaining").innerHTML = response.minorElectiveRemaining;
//     document.getElementById("teaching-remaining").innerHTML = response.teachingRemaining;
//     document.getElementById("remaining1-remaining").innerHTML = response.remaining1Remaining;
//   },
//   error: function(xhr, status, error) {
//     // 서버 요청이 실패한 경우 에러 처리
//     console.error('데이터 요청 실패함.', error);
//   }
// });

// 각 td 엘리먼트에 값 넣기----------------------
document.getElementById("core-capacity-need").innerHTML = coreCapacityNeed;
document.getElementById("balance-integration-need").innerHTML = balanceIntegrationNeed;
document.getElementById("foundation-need").innerHTML = foundationNeed;
document.getElementById("general-need").innerHTML = generalNeed;
document.getElementById("major-essential-need").innerHTML = majorEssentialNeed;
document.getElementById("major-elective-need").innerHTML = majorElectiveNeed;
document.getElementById("minor-essential-need").innerHTML = minorEssentialNeed;
document.getElementById("minor-elective-need").innerHTML = minorElectiveNeed;
document.getElementById("teaching-need").innerHTML = teachingNeed;
document.getElementById("remaining1-need").innerHTML = remaining1Need;
document.getElementById("remaining2-need").innerHTML = remaining2Need;

document.getElementById("core-capacity-acquire").innerHTML = coreCapacityAcquire;
document.getElementById("balance-integration-acquire").innerHTML = balanceIntegrationAcquire;
document.getElementById("foundation-acquire").innerHTML = foundationAcquire;
document.getElementById("general-acquire").innerHTML = generalAcquire;
document.getElementById("major-essential-acquire").innerHTML = majorEssentialAcquire;
document.getElementById("major-elective-acquire").innerHTML = majorElectiveAcquire;
document.getElementById("minor-essential-acquire").innerHTML = minorEssentialAcquire;
document.getElementById("minor-elective-acquire").innerHTML = minorElectiveAcquire;
document.getElementById("teaching-acquire").innerHTML = teachingAcquire;
document.getElementById("remaining1-acquire").innerHTML = remaining1Acquire;
document.getElementById("remaining2-acquire").innerHTML = remaining2Acquire;

document.getElementById("core-capacity-remaining").innerHTML = coreCapacityRemaining;
document.getElementById("balance-integration-remaining").innerHTML = balanceIntegrationRemaining;
document.getElementById("foundation-remaining").innerHTML = foundationRemaining;
document.getElementById("general-remaining").innerHTML = generalRemaining;
document.getElementById("major-essential-remaining").innerHTML = majorEssentialRemaining;
document.getElementById("major-elective-remaining").innerHTML = majorElectiveRemaining;
document.getElementById("minor-essential-remaining").innerHTML = minorEssentialRemaining;
document.getElementById("minor-elective-remaining").innerHTML = minorElectiveRemaining;
document.getElementById("teaching-remaining").innerHTML = teachingRemaining;
document.getElementById("remaining1-remaining").innerHTML = remaining1Remaining;



// 현재 날짜 기반으로 년도와 학기 출력-------------------------
var today = new Date();
var year = today.getFullYear();
var semester = today.getMonth() < 6 ? 1 : 2;
var message = year + '년 ' + semester + '학기에 개설된 전공';

document.getElementById('p-semester_date').innerHTML = message;

// 학기별 개설 전공을 데이터베이스(mysql에서 가져오기)--------------------
const user_major = "식품자원경제학과"; // 사용자의 전공

// 테이블 요소 선택
const table = document.getElementById('div-search_major');

// 테이블 헤더 추가
const headerRow = table.insertRow();
const header1 = headerRow.insertCell(0);
const header2 = headerRow.insertCell(1);
const header3 = headerRow.insertCell(2);
const header4 = headerRow.insertCell(3);
header1.innerHTML = '학년';
header2.innerHTML = '이수구분';
header3.innerHTML = '학점';
header4.innerHTML = '교과목명';

// 데이터 추가
for (let i = 0; i < major_data.length; i++) {
  const grade = major_data[i].grade;
  const category = major_data[i].category;
  const credit = major_data[i].credit;
  const subject_name = major_data[i].subject_name;
  const major = major_data[i].major;

  if (major === user_major) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.textContent = grade;
    cell2.textContent = category;
    cell3.textContent = credit;
    cell4.textContent = subject_name;
  }
}

document.getElementById("section-origin_table").addEventListener("click", function() {
  // AJAX 요청을 통해 이수내역확인표를 받아오는 코드
  $.ajax({
    url: '/api/subjects-completed-pdf',
    method: 'GET',
    success: function(response) {
      // 새 창을 열어 이수내역확인표를 표시
      var newWindow = window.open();
      newWindow.document.write(response);
    },
    error: function(xhr, status, error) {
      // 서버 요청이 실패한 경우 에러 처리
      console.error('이수내역확인표 요청 실패.', error);
    }
  });
});

//임의 DB
const tempSubjects = [
  { id: 1, name: '프로그래밍언어론', professor: '홍길동', category: '전공필수', time: '금4, 금5, 목6', room: '030-0304' },
  { id: 2, name: '소프트웨어설계PBL', professor: '홍길동', category: '전공필수', time: '목1, 목2, 목3', room: '030-0304' },
  { id: 3, name: '데이터베이스', professor: '홍길동', category: '전공필수', time: '금3, 월1, 월2', room: '030-0304' },
  { id: 4, name: '데이터과학', professor: '홍길동', category: '전공필수', time: '토1, 토2', room: '030-0304' },
  { id: 5, name: '컴퓨터네트워크', professor: '홍길동', category: '전공필수', time: '수3, 수4, 수5, 수6', room: '030-0304' }
];

// 시간표 업데이트 함수-------------------------------------------------------
const updateTimetable = (subjects) => {
  // 시간표 초기화
  initializeTimetable();

  // 강의를 시간표에 추가
  subjects.forEach((subject) => {
    addSubjectToTimetable(subject);
  });
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
    const dayTimePairs = subject.time.split(", ");
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
    const dayTimePairs = subject.time.split(", ");
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
  const dayTimePairs = subject.time.split(", ");
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
      <div style="font-weight: bold; font-size: 15px; " class="subject_info">${subject.name}</div>
      <div class="subject_info">${subject.professor}</div>
      <div class="subject_info">${subject.room}</div>
      <button class="delete-button" onclick="removeSubjectFromTimetable()">삭제</button>
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

    const colorIndex = subject.id - 1
    const color = colorArray[colorIndex % colorArray.length];
    cell.style.backgroundColor = color;
  }
};

// 시간표 업데이트
updateTimetable(tempSubjects);


//강의 삭제------------------------------------------------------------------
const removeSubjectFromTimetable = (subject) => {
  const dayTimePairs = subject.time.split(", ");
  for (const pair of dayTimePairs) {
    const [day, time] = pair.split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    const div = cell.querySelector(`div[data-subject="${subject.name}"]`);
    if (div) {
      cell.removeChild(div);
    }
  }

  // 서버 강의 삭제 요청
  $.ajax({
    url: '/api/remove-subject',
    method: 'POST',
    data: { subjectId: subject.id },
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
}, 1000); // 1초마다 확인