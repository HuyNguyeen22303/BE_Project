// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#from-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = statusCurrent == "active" ? "inactive" : "active";


      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusChange);
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    })
  })


}

// End change status




// Delele item (xóa cứng , mất vĩnh viễn)

const deleteItem = document.querySelectorAll("[button-delete-item]");
if (deleteItem.length > 0) {
  const formDeleteItem = document.querySelector("#from-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  deleteItem.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc là sẽ xóa sản phẩm này không?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }

    });
  });

}



// End Delele item