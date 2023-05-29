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
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 1, subject_name: "C프로그래밍", major:"컴퓨터과학과", professor: "홍길동"},
  { grade: 1, category: "전필", credit: 3, subject_name: "식품자원경제학개론", major: "식품자원경제학과", professor: "홍길동"}
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

// 학기별 개설 전공을 데이터베이스(mysql에서 가져오기)------------------------------------------------------
const user_major = "식품자원경제학과"; // 사용자의 전공

// 테이블 헤더 추가
// const headerRow = table.insertRow();
// const header1 = headerRow.insertCell(0);
// const header2 = headerRow.insertCell(1);
// const header3 = headerRow.insertCell(2);
// const header4 = headerRow.insertCell(3);
// header1.innerHTML = '학년';
// header2.innerHTML = '이수구분';
// header3.innerHTML = '학점';
// header4.innerHTML = '교과목명';


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

// 이지민 작성 : 개설전공 목록 및 시간표에 추가--------------------------------------------------------
const tempSubjects = [];
(async () => {
  try {
    const response = await fetch('../php/getSubjectsList.php', {
      method: 'GET'
    });
    const data = await response.json();
    tempSubjects.push(...data);
  } catch (error) {
    console.error('데이터를 가져오는 도중 오류가 발생했습니다.', error);
  }
})();

(async () => {
  try {
    const response = await fetch('../php/getMajor.php');
    if (!response.ok) {
      throw new Error('서버 요청 실패');
    }
    const data = await response.json();
    const table = document.getElementById('div-search_major');

    data.forEach((row) => {
      const newRow = table.insertRow();
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);
      const cell7 = newRow.insertCell(6);
      const cell8 = newRow.insertCell(7);
      const formattedLectureTime = formatLectureTime(row.lecture_time);
      const button = row.professor === '미개설' ?
        "<button type='button' id='unopened'>시간표에 추가</button>" :
        `<button type='button' onclick='addSubjectFromList(${row['1st_subjects_id']})'>시간표에 추가</button>`;
    
      cell1.textContent = row.curriculum_grade;
      cell2.textContent = row.category;
      cell3.textContent = row.credit;
      cell4.textContent = row.subject_name;
      cell5.textContent = row.professor;
      cell6.textContent = formattedLectureTime;
      cell7.innerHTML = button;
      cell8.textContent = row.department;
      cell8.style.display = 'none';
    });
    
  } catch (error) {
    console.error('서버 요청 실패.', error);
  }
})();

async function populateDepartmentDropdown() {
  const dropdown = document.getElementById('departmentDropdown');
  
  try {
    const response = await fetch('../php/getSession.php');
    if (!response.ok) {
      throw new Error('서버 요청 실패');
    }
    const departments = await response.json();

    // 기존 옵션 제거
    dropdown.innerHTML = '';

    // 옵션 추가
    if (departments.double_major !== 'none' || departments.minor !== 'none') {
      const option = document.createElement('option');
      option.value = '전체';
      option.textContent = '전체'
      dropdown.appendChild(option);
    }
    const majorOption = document.createElement('option');
    majorOption.value = departments.major;
    majorOption.textContent = departments.major;
    dropdown.appendChild(majorOption);

    if (departments.double_major !== 'none') {
      const doubleMajorOption = document.createElement('option');
      doubleMajorOption.value = departments.double_major;
      doubleMajorOption.textContent = departments.double_major;
      dropdown.appendChild(doubleMajorOption);
    }
    if (departments.minor !== 'none') {
      const minorOption = document.createElement('option');
      minorOption.value = departments.minor;
      minorOption.textContent = departments.minor;
      dropdown.appendChild(minorOption);
    }
  } catch (error) {
    console.error('서버 요청 실패.', error);
  }
}

// 페이지 로드 시 학과 드롭다운 메뉴 초기화
window.onload = populateDepartmentDropdown;

function filterSubjects() {
  const dropdown = document.getElementById('departmentDropdown');
  const selectedDepartment = dropdown.value;
  let selectedComputer = '';
  if (selectedDepartment == '컴퓨터과학과'){
    selectedComputer = '컴퓨터과학부';
  }
  const table = document.getElementById('div-search_major');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const categoryCell = row.cells[7].textContent;

    if (selectedDepartment === '전체' || categoryCell === selectedDepartment || categoryCell === selectedComputer) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

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