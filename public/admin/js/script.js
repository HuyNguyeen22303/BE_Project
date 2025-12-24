// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
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



// pagination

const butonPagination = document.querySelectorAll("[button-pagination]");
if (butonPagination) {
  let url = new URL(window.location.href);
  butonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    })
  });
}




// End pagination


// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-mutil]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");


  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true;
      });
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });


  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox multi



// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-mutil]");
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");


    const typeChange = e.target.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc là Muốn xóa sản phẩm này không");
      if (!isConfirm)
        return;
    }


    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("[name='ids']");
      inputChecked.forEach(input => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);

        }

      })
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi");
    }
  });
}
// End Form change multi

// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);


  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });

}


// End Show alert



// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){

  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change" , (e) =>{
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })


}
// End upload image