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