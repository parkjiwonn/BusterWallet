  //console.log("===========================CONTENT.jS ===========================");

  // 웹페이지에서 크롬 확장 프로그램으로 요청을 보냄
  chrome.runtime.sendMessage({ greeting : "hello" }, function (response) {
    //console.log('확장 프로그램으로부터의 응답:', response.farewell);

    alert('dididiidid');

    localStorage.setItem('test','test');

    
      // 팝업 창 띄우기
    // window.open("", "Popup", "width=400,height=800");

    window.location.href = 'https://developer.chrome.com/docs/extensions/mv3/messaging/#simple';

    
    
 
  });