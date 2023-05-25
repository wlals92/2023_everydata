//이지민 작성

//로그인 상태일 때만 접근 가능
$.ajax({
    type: 'GET',
    url: '../php/getSession.php',
    success: function(response) {
      // 세션이 있는 경우 로그인한 사용자의 정보가 반환됨
      // 세션이 없는 경우 로그인 페이지로 이동
      if (!response) {
        alert("로그인을 해주세요.");
        window.location.href = '../index.html';
      }
    },
    error: function(error) {
      // 서버와의 통신에 실패한 경우 예외 처리
      alert('서버 요청 실패: '+error.statusText);
    }
});

//로그아웃 함수
const logout = () => {
    $.ajax({
        type: 'POST',
        url: '../php/logOut.php',
        success: function(response) {
            alert("로그아웃되었습니다.")
            window.location.href = '../index.html';
        },
        error: function(error) {
            // 서버와의 통신에 실패한 경우 예외 처리
            alert('서버 요청 실패: '+error.statusText);
          }
    });
}