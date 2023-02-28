[작업한 데모 사이트](https://creative-buttercream-aa60ae.netlify.app/)

---

---

# 📌 할 일 관리(Todo)

- 작업 내용:
  - 주어진 API를 활용해 Todo list 구현
  - Todo 아이템 추가 및 수정, 제거 기능 구현
  - 생성날짜, 수정날짜 데이터 구현 (한국 시간)
  - 전체선택, 해제, 삭제 구현
  - 생성 로딩, 전체선택 및 개별선택 로딩 구현
  - 완료된 목록, 비완료 목록 구분하여 볼 수 있도록 구현
  - SortableJS 라이브러리를 통해 Grid 순서 변경 구현(변경한 순서 저장)
  - 완료한 목록들은 상단으로 정렬

---

- 사용 언어: HTML, SCSS, JS

---

### ❗ 필수

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### ❔ 선택

- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.([SortableJS](http://sortablejs.github.io/Sortable/))
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [x] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [x] 할 일 항목의 최신 수정일을 표시해보세요.
- [x] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.

---

---

## 데모 사이트 소개

---

### 🔗 Todo item 추가

![항목추가](https://drive.google.com/uc?id=15sz-Lt1dCuPJFmVK59KKbDcZnSiQ-kcN)

- Todo item 추가 구현
- 로딩 애니메이션 구현

</br>

---

### 📌 Todo item 수정

![수정](https://drive.google.com/uc?id=1xdQDDjEKdI8lW0PZy1WvvgA_pmKGa-K6)

- 만들어진 Todo item 수정할 수 있도록 구현

</br>

---

### 🚫 Todo item 개별삭제

![개별삭제](https://drive.google.com/uc?id=1Qe4V6zvd0ORpjbgOMmgpA2eQ-sbZHZBX)

- todo item 개별적으로 삭제할 수 있도록 구현

</br>

---

### ✅ Todo Check

![개별선택](https://drive.google.com/uc?id=1uVRQGVuHG1CpFlNtCKmX4vrNeSt8-YFe)

- Check 시 로딩 애니메이션 구현

</br>

---

### 🛒 완료된 Todo, 비완료된 Todo 분류

![선택항목분류](https://drive.google.com/uc?id=1V-NUyGgxu-6UcNJxJU4OM-H-mEqkrHXB)

- 완료된 Todo item들과 비완료된 Todo item 분류하여 볼 수 있도록 구현

</br>

---

### 🗑 완료된 Todo item 모두 삭제

![선택삭제](https://drive.google.com/uc?id=1QdWyZkgm5LVWFjB2v1jVGrAB0908nUq2)

- 선택된 Todo들만 삭제 가능
- 삭제될 때까지 로딩 애니메이션 구현
- 선택된 사항들을 한번에 지우기 때문에 모든 프로미스가 이행한 후 반영되도록 PromiseAll()을 사용
- 전체 선택 후 삭제도 가능

</br>

---

### 👋🏻 전체 Todo item 선택, 해제

![전체선택](https://drive.google.com/uc?id=10XDUtRm0LO2v-sxvDegpza8bqXztV7tr)

- 전체 Todo item을 선택하고 해제할 수 있도록 구현
- 여러 item 삭제를 하는 것처럼 모든 프로미스가 이행한 후 반영되도록 PromiseAll()을 사용

</br>

---

### ⛓ SortableJs 라이브러리로 Drag-and-drop reorderable 구현

![sortablejs](https://drive.google.com/uc?id=1I8gwbgq3lFwfpz3OfVIZfYbk4X1AwVGb)

- 목록을 재 정렬할 수 있도록 구현

</br>

---

### 🔎 자세히보기

![자세히보기](https://drive.google.com/uc?id=19G663KzqRwR4zfrNRvQnmbqzTUcb_5fm)

- 자세히보기에 생성된날짜, 수정된날짜 표기

</br>

---

---

### 👍🏻 프로젝트 진행 Review

- API를 사용하여 비동기, 네트워크 요청 등을 공부하면서 자연스럽게 Promise를 사용하는데에 공부를 할 수 있었습니다.
- Promise.all()을 통해서 여러개의 비동기 처리를 진행할때 대응해야하는 방법들도 알게 되었습니다.(제대로 사용한건지는 아직 모르겠습니다..!)
- 현재 코드에서도 리팩토링을 진행하고 모듈로 나누어볼 생각입니다.
- 이번 과제를 진행하면서 코드를 재사용이 가능하도록 최대한 개별적으로 구현했는데 아직도 부족한것 같습니다.
- 첫 로직을 짤때 여러 상황들을 더 고려해야한다는걸 알게되었습니다.
- 아직 고치지 못한 에러들도 리팩토링을 하면서 정리하도록 하겠습니다.!

- SortableJS 라이브러리로 순서를 변경 후 새로고침 또는 데이터가 갱신될때마다 원래 순서대로 돌아가는것 해결
- done값을 받아서 boolean값에 따라 checked를 구현했는데 렌더링이 될때마다 true, false를 string으로 인식하는 오류 해결
