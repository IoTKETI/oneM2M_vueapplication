import Vue from 'vue';
const EventBus = new Vue();
export default EventBus;


// 본 모듈은 EventBus 를 사용하기 위한 모듈
// EventBus : 컴포넌트간 메소드 호출 (EventBus라는 공간에 각 프로젝트에 맞는 규격을 만들어 그에따라 EventBus를 활용하면 됨)
// 이벤트 호출 $emit('이벤트 이름', option)  : option에 값을 넣어서 보낼 수 있다
// 이벤트 받는 컴포넌트에서 사용 $on
