window.addEventListener("load", () => {
    initProfile();
});

function initProfile() {
    const profileWrap = document.querySelector('.profile_expand_wrap');
    const profileMain = document.querySelector('.profile_main');
    const addBtn = document.querySelector('.btn_add_profile');
    const profileList = document.querySelector('.profile_list');

    if (!profileWrap || !profileMain || !addBtn || !profileList) return;

    let maxProfiles = 5;
    let currentCount = 0;
    let isOpen = false;

    const profileImages = [
        "./assets/images/profile/profile_dog.png",
        "./assets/images/profile/profile_girl.png",
        "./assets/images/profile/profile_rabbit.png",
        "./assets/images/profile/profile_star.png",
        "./assets/images/profile/profile_bear.png"
    ];

    // 🔥 메인 프로필 클릭 → 열기/닫기 토글
    profileMain.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;

        if (isOpen) {
            profileWrap.classList.add("is_open");

            const items = profileList.querySelectorAll('.profile_item');
            items.forEach(item => item.classList.add("show"));
        } else {
            const items = profileList.querySelectorAll('.profile_item');
            items.forEach(item => item.classList.remove("show"));

            profileWrap.classList.remove("is_open");
        }
    });

    // 🔥 추가 버튼 클릭 → 새로운 프로필 생성
    addBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (currentCount >= maxProfiles) return;

        const newProfile = document.createElement("button");
        newProfile.classList.add("profile_item");
        newProfile.dataset.pos = currentCount;

        newProfile.innerHTML = `
      <img src="${profileImages[currentCount]}" alt="프로필 ${currentCount + 1}">
    `;

        // ⭐ 작은 프로필 클릭 → 메인 프로필 이미지로 변경
        newProfile.addEventListener("click", (e) => {
            e.stopPropagation();

            const selected = newProfile.querySelector("img").src;

            // ⭐ NEW : 모든 프로필 이미지 변경
            document.querySelectorAll(".js-profile-img").forEach(img => {
                img.src = selected;
            });

            // 작은 프로필 닫기
            const items = profileList.querySelectorAll(".profile_item");
            items.forEach(item => item.classList.remove("show"));

            // 전체 래퍼 닫기
            isOpen = false;
            profileWrap.classList.remove("is_open");

            // 추가 버튼 닫기
            addBtn.style.opacity = "0";
            addBtn.style.pointerEvents = "none";
        });
        profileList.appendChild(newProfile);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                newProfile.classList.add("show");
            });
        });

        currentCount++;

        if (currentCount >= maxProfiles) {
            addBtn.style.opacity = "0.5";
            addBtn.style.cursor = "not-allowed";
        }
    });

    // 🔥 외부 클릭 → 메뉴 닫기
    document.addEventListener("click", (e) => {
        if (!profileWrap.contains(e.target)) {
            isOpen = false;
            profileWrap.classList.remove("is_open");
        }
    });
}
