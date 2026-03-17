# Three.js Study

Three.js를 활용해 3D 기본 렌더링부터 조명, HDR 환경맵, GLTF 모델, 파티클 연출까지 단계별로 학습할 수 있는 예제 프로젝트입니다.

## Features

- Three.js 기반 기본 씬, 카메라, 렌더러, OrbitControls 구성
- 조명과 머티리얼을 활용한 오브젝트 표현 실습
- HDRI 배경과 환경맵 적용 예제 제공
- GLTF 모델 로드 및 파티클 애니메이션 예제 포함
- 각 단계별 강의 노트와 실습 코드 분리 구성

## Project Structure

- `1/`: 박스 메쉬와 카메라, 조작 컨트롤 등 Three.js 기본 구성을 다루는 예제
- `2/`: 조명, 그림자, HDR 환경 텍스처를 활용한 장면 구성 예제
- `3/`: GLTF 모델, 스크롤/인터랙션, 파티클 효과까지 확장한 심화 예제

각 폴더는 독립적으로 실행할 수 있으며, `src/note`에는 단계별 예제 코드가 정리되어 있습니다.

## Tech Stack

- Three.js
- JavaScript
- Webpack
- LESS / CSS
- Babel

## Run

각 폴더(`1`, `2`, `3`)는 별도 프로젝트로 구성되어 있습니다.

1. 실행할 폴더로 이동합니다.
2. 의존성을 설치합니다.
3. 개발 서버를 실행합니다.

```bash
cd 1
npm install
npm start
```

배포용 빌드가 필요하면 아래 명령어를 사용할 수 있습니다.

```bash
npm run build
```

## Note

- 각 수업의 완성본은 `src/note` 폴더에 정리되어 있습니다.
- 강의 노트를 확인할 때는 원하는 예제 파일 내용을 `src/index.js`에 반영해 실행하면 됩니다.
