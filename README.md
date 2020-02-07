# 🔥PR, merge, push 방법
***
!!!중요 코드를 짧게 작성 후 PR 보내기 (길면 충돌 발생 위험 커짐)
1. organization 원격 저장소에서 본인 원격(origin) 저장소에 `fork` 하기
2. 본인 원격(origin) 저장소에서 본인 로컬 저장소로 `clone` 하기
3. feature/OOO 브랜치 만들고 `checkout` 후 여기에 `commit` 하기
4. 코딩이 끝나면 본인 원격(origin) 저장소에 feature/ 브랜치로 `push`하기
5. 본인 원격 저장소 feature/ 브랜치에서 조직 저장소 develop 브랜치로 PR 보내기 
    - 다른 사람이 리뷰 후 comment나 aprove 3번째 거 중에 하나 클릴 후 확인하기 <보통 aprove 누름>
6. 그 다음 본인이 PR merge 누르기
7. 다른 사람들도 본인 분야에서 작업한 걸 PR를 보냄 
8. develop 브랜치에서 충돌 일어나면 해결 후 버그가 없는 걸 확인 한 다음 조직 로컬 저장소에서 develop을 master로 merge함
9. (최신화) 본인 로컬 저장소에 upstream 원격저장소를 만든 후 조직 원격 저장소(master)를 fetch 함 
    - ```git remote add upstream "조직 원격 저장소 주소"```
    - ```git fetch upstream```
    - 자기 로컬 저장소의 브랜치(feature)로 이동 ```git checkout feature/```
    - 머지하기 ```git merge upstream/master -> 본인 로컬 저장소(feature/)에 조직 원격 저장소(master)를 머지함```
    - 그 다음 본인 원격 저장소(origin)에 push하기 ```git push origin feature/```
![KakaoTalk_Photo_2020-02-07-17-06-05](https://user-images.githubusercontent.com/57027805/74011861-333ccc80-49cc-11ea-8f33-a4312dc649ca.jpeg)
