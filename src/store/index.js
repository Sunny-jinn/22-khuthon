import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialLocationState = {
  prevLocation: null,
  location: "software",
};

const initialClassState = {
  class: [
    {
      prof: "김영진",
      name: "우리가 사는 세계",
      people: 3,
      full: 40,
    },
    {
      prof: "김영진",
      name: "용인학",
      people: 14,
      full: 50,
    },
    {
      prof: "조진성",
      name: "운영체제",
      people: 0,
      full: 40,
    },
    {
      prof: "조진성",
      name: "리눅스 프로그래밍",
      people: 7,
      full: 60,
    },
    {
      prof: "배성호",
      name: "딥러닝",
      people: 20,
      full: 40,
    },
    {
      prof: "배성호",
      name: "기계학습",
      people: 9,
      full: 40,
    },
    {
      prof: "박성배",
      name: "프로그래밍 언어 구조론",
      people: 1,
      full: 40,
    },
    {
      prof: "박성배",
      name: "자료 구조",
      people: 5,
      full: 50,
    },
    {
      prof: "김휘용",
      name: "기계 학습",
      people: 3,
      full: 40,
    },
    {
      prof: "김휘용",
      name: "이산구조",
      people: 14,
      full: 50,
    },
    {
      prof: "이영구",
      name: "데이터베이스",
      people: 13,
      full: 40,
    },
    {
      prof: "이영구",
      name: "자료구조",
      people: 0,
      full: 50,
    },
    {
      prof: "이성원",
      name: "풀스택 서비스 네트워킹",
      people: 3,
      full: 40,
    },
    {
      prof: "이성원",
      name: "데이터 센터 프로그래밍",
      people: 14,
      full: 50,
    },
  ],
  myList: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    setLocation(state, action) {
      state.prevLocation = state.location;
      state.location = action.payload;
    },
  },
});

const classSlice = createSlice({
  name: "class",
  initialState: initialClassState,
  reducers: {
    deletePeople(state, action) {
      state.class.map((list) => {
        if (list.name === action.payload && list.people !== 0) {
          alert("수강신청에 성공하였습니다!");
          list.people = list.people - 1;
        } else if (list.name === action.payload && list.people === 0) {
          alert("수강 인원이 초과되었습니다!");
        }
      });
    },
    addMyList(state, action) {
      if (action.payload[0].people !== 0)
        state.myList = [...state.myList, action.payload];
    },
    deleteMyList(state, action) {
      state.myList = state.myList.filter(
        (list) => list[0].name !== action.payload
      );
    },
  },
});

const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    class: classSlice.reducer,
  },
});

export const locationActions = locationSlice.actions;
export const classActions = classSlice.actions;

export default store;
