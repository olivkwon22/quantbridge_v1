# My Project — "QuantBridge" BD-to-CRM System
**랜딩페이지 + Account 관리(CRM) + Operational KPI 대시보드**

---

## 배경

Salesforce Korea의 "Strategy & Operations Senior Analyst – CSG Korea" 채용공고를 레퍼런스로, Project를 BD 플랫폼이면서 동시에 엔터프라이즈 CRM/CSM 워크플로우를 보여주는 시스템으로 재포지셔닝한다.

---

## 수업 세션 계획

| 세션 | 목표 |
|---|---|
| 세션 1 | 랜딩페이지 UI — Hero, 기능 소개, 가입 폼 레이아웃 |
| 세션 2 | Supabase 연결 + 가입 폼 데이터 저장 + UTM 수집 + 배포 |
| 세션 3 | 웰컴 이메일 자동 발송 (Resend) + Account 라이프사이클 상태 설계 |
| 세션 4 | Account 관리 화면 (CRM) — 리스트, 필터, 히스토리 로그, Health Score |
| 세션 5 | Operational KPI Dashboard — 차트, Executive Summary 박스 |
| 세션 6 | Health Score 분포 시각화 + 전체 마무리 + 배포 정리 |

> *수업 중에 ① 랜딩페이지 + ② Account 관리(CRM)까지는 확실히 끝내고, ③ KPI 대시보드는 시간이 부족하면 8~9월로 자연스럽게 이어간다.*

---

## 🎯 가상 플랫폼: QuantBridge

*글로벌 퀀트 리서처를 위한 알고리즘 트레이딩 플랫폼. WorldQuant Brain을 레퍼런스로 한 가상의 브랜드.*

---

## 핵심 재포지셔닝

### ① 가입자 관리 화면 → "Account 관리 (CSM 워크플로우)"

| BD 관점 | CRM 관점 재포지셔닝 |
|---|---|
| 가입자 리스트 | Account 리스트 — 각 가입자를 하나의 account로 취급 |
| status: Registered/Active/Churned | 고객 라이프사이클 단계: Onboarding → Active Engagement → At-Risk/Churned |
| 메모 기능 | Account 히스토리 로그 — CSM이 고객 상태를 추적하는 방식과 동일 |
| CSV 내보내기 | Account Health 리포팅 — 운영 가시성 제공 |

"post-sales customer experience의 전체적 건강 상태를 모니터링·분석·진단"하는 역할 — status 필드(Registered→Active→Churned)가 이 개념을 그대로 구현.

---

### ② Operational KPI Dashboard

- 전환율, KPI 카드, 채널별 분포
- 대시보드 상단에 "Executive Summary" 텍스트 박스 — 핵심 인사이트 3줄 + 권고 액션 1개
- 목적: 단순 시각화가 아니라 **"데이터를 경영진 의사결정으로 번역하는 능력"** 을 보여주기 위함
- 직무와 연결: KPI/타겟을 정의하고, 리포트와 대시보드를 구축해 비즈니스 건강도에 대한 인사이트를 도출하고, 데이터 기반 권고안을 리더십에 제시

---

### ③ Account Health Score ⭐

가입자별로 활동 빈도, 마지막 로그인일, 가입 후 경과일 등을 조합한 간단한 점수(0~100)를 계산해서 보여주는 기능.

- 구현 난이도: 낮음 — Supabase의 created_at, status, notes 필드 활용한 간단 로직
- 효과: "단순 트래커"가 아니라 "운영 인텔리전스 툴"이라는 인상을 줌
- 직무와 연결: 운영 병목, 딜리버리 리스크, 마찰 지점을 식별해 즉각적인 시정 조치를 위한 데이터 기반 권고를 제공

---

## 화면 구성

### ① 랜딩페이지 (공개)

- Hero 섹션 + 메인 CTA + 가입 폼 + UTM 수집 + 웰컴 이메일 자동 발송

### ② Account 관리 (CRM/CSM, 어드민 전용)

- Account 리스트 + 필터 (국가 / 배경 / 라이프사이클 단계 / 유입 채널)
- 개별 Account 상세 페이지 + Account 히스토리 로그
- 라이프사이클 관리: Onboarding → Active Engagement → At-Risk → Churned
- ⭐ Account Health Score 표시 (0~100)
- CSV 내보내기 (Account Health 리포팅용)

### ③ Operational KPI Dashboard (어드민 전용)

- ⭐ Executive Summary 박스 (상단) — 핵심 인사이트 3줄 + 권고 액션 1개
- 총 가입자 수 / 목표 대비 달성률 (KPI 카드)
- 일별/주별 신규 가입 추이 (라인 차트)
- 채널별 유입 및 전환율 비교
- Account Health Score 분포 (At-Risk 비중 등)
- 국가별 / 배경별 가입자 분포

---

## 데이터베이스 구조 (Supabase)

### `accounts` 테이블

| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | uuid | 고유 ID (자동 생성) |
| name | text | 이름 |
| email | text | 이메일 (웰컴 이메일 대상) |
| country | text | 국가 |
| background | text | 학생 / 직장인 / 연구자 |
| lifecycle_stage | text | onboarding / active / at_risk / churned |
| health_score | integer | ⭐ 신규 — Account Health Score (0~100) |
| utm_source | text | 유입 채널 (linkedin / google / email / direct) |
| utm_campaign | text | 캠페인명 |
| last_active_at | timestamp | ⭐ 신규 — 마지막 활동일 (Health Score 계산용) |
| created_at | timestamp | 가입일 |

### `account_logs` 테이블

| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | uuid | 고유 ID |
| account_id | uuid | Account 연결 (FK) |
| log_text | text | 히스토리 로그 내용 |
| created_at | timestamp | 기록일 |

---

## 포트폴리오 스토리

### 이 프로젝트가 무엇을 증명하는가

QuantBridge는 단순한 바이브코딩 실습 프로젝트가 아니다. **"제품을 시장에 가져다 파는 전체 사이클(GTM — Go-To-Market)"** 을 직접 설계하고 구현한 시스템이다.

| GTM 단계 | QuantBridge 구현 | RevOps 타겟직무와 연결 |
|---|---|---|
| 인지·관심 (Awareness) | 랜딩페이지 — 플랫폼 소개 + CTA, UTM 파라미터로 채널 추적 | GTM 채널별 리드 유입 분석 |
| 리드 확보 (Lead Capture) | 가입 폼 → Supabase 저장, 웰컴 이메일 자동 발송 | 리드 → 파이프라인 진입 |
| 온보딩 (Onboarding) | Account 라이프사이클 (Onboarding → Active) | Marketing-Sales 핸드오프 |
| 고객 유지 (Retention) | Account Health Score, At-Risk 감지 + 권고 액션 | CS 운영, NRR 최적화 |
| 성과 분석 (Analytics) | Operational KPI Dashboard, Executive Summary 박스 | 리더십 데이터 기반 의사결정 |

> "이 흐름이 정확히 RevOps가 운영하는 GTM 엔진의 구조다 — Marketing이 리드를 만들고, Sales가 딜을 클로징하고, CS가 고객을 유지하는 세 팀을 하나의 시스템으로 통합하는 것. QuantBridge는 그 전체를 혼자서 설계하고 구현해본 경험이다."

---

### 타겟 직무와의 연결

| 타겟 포지션 | QuantBridge가 증명하는 것 |
|---|---|
| Strategy & Operations (Salesforce Korea 등) | KPI 정의 + 대시보드 구축 + 리더십 보고 — 공고 요건과 1:1 매칭 |
| RevOps Manager/Analyst (Performars 등) | GTM 풀사이클 설계 + CRM 워크플로우 + 데이터 기반 의사결정 |
| CRM 전략 컨설턴트 (Deloitte Digital, 삼성SDS 등) | 엔터프라이즈 CRM 구조 이해 + Account 라이프사이클 + 운영 인텔리전스 |
| BD/Customer Success 전략 직군 | 리드 수집부터 고객 건강도 추적까지 BD 풀사이클 직접 경험 |

---

### 📌 LinkedIn / 이력서용 — 메인 스토리

**영문**

> "Designed and built QuantBridge — a full GTM pipeline system simulating how a RevOps/Strategy & Operations function runs end-to-end revenue operations. Built a product landing page with UTM tracking, an account management CRM modeling customer lifecycle stages (Onboarding→Active→At-Risk→Churned) with Health Scoring, and an Operational KPI dashboard with Executive Summary for leadership reporting. Inspired by 10 years of BD and operations experience at WorldQuant Brain Korea."

**한국어**

> "퀀트 플랫폼의 GTM 사이클 전체를 직접 구현한 시스템. 광고 캠페인 유입(UTM)부터 랜딩페이지, 가입자 CRM(Account 라이프사이클 + Health Score), Operational KPI 대시보드(임원 보고용 Executive Summary)까지 RevOps 풀사이클을 설계·구축했습니다. WorldQuant Brain의 BD 경험을 기반으로, 전략·운영 직군에서 데이터 기반 의사결정을 어떻게 구현하는지 보여주는 포트폴리오입니다."

---

## 타임라인

| 시기 | 단계 | 내용 |
|---|---|---|
| **7월 (수업 중)** | **① 랜딩페이지** (GTM 인지·리드 확보) | 플랫폼 소개 + 가입 폼 + UTM 수집 + 웰컴 이메일 자동 발송 — 수업 세션 내 완성 목표 |
| **9~10월 (Irvine)** | **② Account 관리 (CRM)** (GTM 온보딩·유지) | Account 리스트 + 라이프사이클 관리 + Health Score + 히스토리 로그 |
| **11월 (Irvine)** | **③ KPI 대시보드** (GTM 성과 분석) | Executive Summary + 채널별 성과 분석 + Health Score 분포 |

---

## 💡 면접 활용 팁

- **"GTM 사이클 전체를 직접 설계하고 구현해봤다"** 는 표현을 면접에서 쓸 것 — RevOps/Strategy & Ops 면접관이 바로 이해하는 언어
- Account Health Score는 "왜 이 지표를 만들었고, 비즈니스에서 어떤 의사결정에 쓰이는가"를 설명할 수 있도록 준비
- Executive Summary 박스는 "데이터를 리더십 언어로 번역하는 능력"의 증거 — 스크린샷 이력서 첨부 권장
- README에 "엔터프라이즈 CRM의 핵심 GTM 워크플로우를 소규모로 구현"이라고 명시
- Salesforce, Performars, Deloitte Digital 등 지원 시 각 회사의 언어(RevOps/CRM/Strategy)에 맞게 스토리 강조점 조정
