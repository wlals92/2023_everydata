// 남서린 작성

// 졸업요건 충족했는지 여부를 판단하는 함수
function calculateCompletedCreditsByArea(data) {
  const completedCredits = Array(8).fill(0);

  data.forEach(item => {
    completedCredits[item.area - 1] += item.credit;
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


// // 서버 이수내역확인표 정보 요청------------------
fetch('../php/getCredit.php')
  .then(response => response.json())
  .then(data => {
    // 서버 응답 처리
    updateElementValue("core-capacity-need", data[0].coreCapacityNeed);
    updateElementValue("balance-integration-need", data[0].balanceIntegrationNeed);
    updateElementValue("foundation-need", data[0].foundationNeed);
    updateElementValue("general-need", data[0].generalNeed);
    updateElementValue("major-essential-need", data[0].majorEssentialNeed);
    updateElementValue("major-elective-need", data[0].majorElectiveNeed);
    updateElementValue("double-major-essential-need", data[0].doubleMajorEssentialNeed);
    updateElementValue("double-major-elective-need", data[0].doubleMajorElectiveNeed);
    updateElementValue("minor-need", data[0].minorNeed);
    updateElementValue("teaching-need", data[0].teachingNeed);

    updateElementValue("core-capacity-acquire", data[0].coreCapacityAcquire);
    updateElementValue("balance-integration-acquire", data[0].balanceIntegrationAcquire);
    updateElementValue("foundation-acquire", data[0].foundationAcquire);
    updateElementValue("general-acquire", data[0].generalAcquire);
    updateElementValue("major-essential-acquire", data[0].majorEssentialAcquire);
    updateElementValue("major-elective-acquire", data[0].majorElectiveAcquire);
    updateElementValue("double-major-essential-acquire", data[0].doubleMajorEssentialAcquire);
    updateElementValue("double-major-elective-acquire", data[0].doubleMajorElectiveAcquire);
    updateElementValue("minor-acquire", data[0].minorAcquire);
    updateElementValue("teaching-acquire", data[0].teachingAcquire);

    updateRemainingValue("core-capacity", data[0].coreCapacityNeed, data[0].coreCapacityAcquire);
    updateRemainingValue("balance-integration", data[0].balanceIntegrationNeed, data[0].balanceIntegrationAcquire);
    updateRemainingValue("foundation", data[0].foundationNeed, data[0].foundationAcquire);
    updateRemainingValue("general", data[0].generalNeed, data[0].generalAcquire);
    updateRemainingValue("major-essential", data[0].majorEssentialNeed, data[0].majorEssentialAcquire);
    updateRemainingValue("major-elective", data[0].majorElectiveNeed, data[0].majorElectiveAcquire);
    updateRemainingValue("double-major-essential", data[0].doubleMajorEssentialNeed, data[0].doubleMajorEssentialAcquire);
    updateRemainingValue("double-major-elective", data[0].doubleMajorElectiveNeed, data[0].doubleMajorElectiveAcquire);
    updateRemainingValue("minor", data[0].minorNeed, data[0].minorAcquire);
    updateRemainingValue("teaching", data[0].teachingNeed, data[0].teachingAcquire);

    const areas = [
      { area: 1, credit: data[0].area1},
      { area: 2, credit: data[0].area2},
      { area: 3, credit: data[0].area3},
      { area: 4, credit: data[0].area4},
      { area: 5, credit: data[0].area5},
      { area: 6, credit: data[0].area6},
      { area: 7, credit: data[0].area7}
    ];
    calculateCompletedCreditsByArea(areas);
  })
  .catch(error => {
    // 서버 요청이 실패한 경우 에러 처리
    console.error('데이터 요청 실패함.', error);
  });


function updateElementValue(elementId, value) {
  document.getElementById(elementId).innerHTML = value;
}


// 잔여
// 취득학점이 소요학점 이상일 경우 0(단순히 빼기하면 취득이 소요보다 클때 마이너스 값이 나옴)
// 취득학점이 소요학점 미만일 경우 소요학점-취득학점 출력
function updateRemainingValue(elementId, need, acquire) {
  let remaining = Math.max(need - acquire, 0);
  document.getElementById(elementId + "-remaining").innerHTML = remaining;
}


// 현재 날짜 기반으로 년도와 학기 출력-------------------------
var today = new Date();
var year = today.getFullYear();
var semester = today.getMonth() < 6 ? 1 : 2;
var message = year + '년 ' + semester + '학기에 개설된 전공';

document.getElementById('p-semester_date').innerHTML = message;


// 여기서부터 이지민 작성 ------------------------------------------------------------------------------
// 이수내역확인표 원본 보기 버튼 클릭시 원본 새창으로 뜨는 기능
document.getElementById('section-origin_table').addEventListener('click', async function() {
  try {
    const response = await fetch('../php/getSession.php', {
      method: 'GET'
    });
    if (response.ok) {
      const data = await response.json();
      const userID = data.id;
      if (userID) {
        const fileExtension = 'pdf';
        const url = '../pdf/' + userID + '.' + fileExtension;
        window.open(url);
      } else {
        console.log('유저 아이디를 가져올 수 없습니다.');
      }
    } else {
      throw new Error('서버 요청 실패');
    }
  } catch (error) {
    console.log('서버 요청 실패: ' + error.message);
  }
});

// tempSubjects 생성 후 강의 목록 넣기
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

// 전공 커리큘럼 및 개설된 전공 불러오기
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
      // 개설 강의는 시간표에 추가 버튼이 기능하고, 미개설된 강의는 기능하지 않음
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

// 학과 드롭다운 : 전공 커리큘럼을 학과별로 볼 수 있음(본전공, 부전공, 복수전공만 표시)
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
    // 전공이 두개 이상일 때만 전체 옵션
    if ((departments.double_major !== 'none' && departments.double_major !== 'null'  && departments.double_major !== null ) || (departments.minor !== 'none' && departments.minor !== 'null' && departments.minor !== null)) {
      const option = document.createElement('option');
      option.value = '전체';
      option.textContent = '전체'
      dropdown.appendChild(option);
    }
    const majorOption = document.createElement('option');
    majorOption.value = departments.major;
    majorOption.textContent = departments.major;
    dropdown.appendChild(majorOption);

    if (departments.double_major !== 'none' && departments.double_major !== 'null' && departments.double_major !== null) {
      const doubleMajorOption = document.createElement('option');
      doubleMajorOption.value = departments.double_major;
      doubleMajorOption.textContent = departments.double_major;
      dropdown.appendChild(doubleMajorOption);
    }
    if (departments.minor !== 'none' && departments.minor !== 'null' && departments.minor !== null) {
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

// 학과 드롭다운 값에 따라 필터링
function filterSubjects() {
  const dropdown = document.getElementById('departmentDropdown');
  const selectedDepartment = dropdown.value;
  let selectedComputer = '';
  // 컴퓨터과학과는 통합 전후 이름이 바뀌어 따로 표시
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

// 시간표에 추가------------------------------------------------------------------------------
// 서버에 강의 추가 요청
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
    const dayTimePairs = subject.lecture_time.split(",");
    let hasConflict = false;
    
    for (const dayTimePair of dayTimePairs) {
      const [day, time] = dayTimePair.split(/([^\uAC00-\uD7A3]+)/);

      const isAdded = await isAlreadyAdded(subject);
      if (isAdded) {
        alert('이미 추가된 강의입니다.');
      } else {
        const isConflict = await isTimeConflict(day, time);
        if (isConflict) {
          hasConflict = true;
          alert('해당 시간에 이미 다른 강의가 있습니다.');
          break;
        }
      }
    }
    if (!hasConflict) {
      addSubjectToServer(subject);
    }
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
};

// 시간 형식 변환 (월6, 월7, 수3 -> 월6, 7, 수3)
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

// 유저 이름 받아오기 : 000님의 이수내역 표시용
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