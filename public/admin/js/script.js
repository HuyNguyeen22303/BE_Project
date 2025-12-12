// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                // Nếu có status (vd: active, inactive) thì gán vào URL
                url.searchParams.set("status", status);
            } else {
                // Nếu status rỗng (nút Tất cả) thì xóa param status đi
                url.searchParams.delete("status");
            }

            // Chuyển hướng trang sang URL mới
            window.location.href = url.href;
        });
    });
}
// End Button Status





// Form search

// const formSearch = document.querySelector("#form-search");
// if (formSearch) {
//     formSearch.addEventListener("submit", (e) => {
//         console.log(e);
//     });
// }



const formSearch = document.querySelector("#form-search");
// console.log(formSearch);
if (formSearch) {



    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // 1. Ngăn chặn hành vi load lại trang mặc định của HTML

        const keyword = e.target.elements.keyword.value; // 2. Lấy giá trị từ ô input có name="keyword"

        // 3. Lấy ra url hiện tại
        let url = new URL(window.location.href);

        if (keyword) {
            // 4. Nếu có từ khóa -> Thêm param keyword vào URL
            url.searchParams.set("keyword", keyword);
        } else {
            // 5. Nếu xóa trắng từ khóa -> Xóa param keyword khỏi URL
            url.searchParams.delete("keyword");
        }

        // 6. Chuyển hướng trang web sang URL mới
        window.location.href = url.href;
    });
}


// End Form search