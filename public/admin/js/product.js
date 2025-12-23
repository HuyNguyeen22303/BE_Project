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


// Restore item
// const restoreItem = document.querySelectorAll("[button-restore-item]");
// if(restoreItem){
//   const formRestoreItem = document.querySelector("#form-restore-item");
//   const path = formRestoreItem.getAttribute("data-path");
//   restoreItem.forEach(button =>{
//     button.addEventListener("click" , () =>{
//       const isConfirm = confirm("Bạn có chắc là sẽ khôi phục sản phẩm này không?");
//       if (isConfirm) {
//         const id = button.getAttribute("data-id");
//         const action = `${path}/${id}?_method=PATH`
//         formRestoreItem.action = action;
//         formRestoreItem.submit();
//       }
//     })
//   })
// }



//  Restore item
const buttonsRestore = document.querySelectorAll("[button-restore-item]");

if (buttonsRestore.length > 0) {
  const formRestore = document.querySelector("#form-restore-item");
  const path = formRestore.getAttribute("data-path");

  buttonsRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=PATCH`;
        console.log(`${path}/${id}?_method=PATCH`);
        
        formRestore.action = action;
        formRestore.submit();
      }
    });
  });
}


// End Restore item



// Delete Permanent
const buttonsDeletePermanent = document.querySelectorAll("[button-delete-permanently]");
if(buttonsDeletePermanent){
  const formDeletePermanent = document.querySelector("#form-delete-permanent");
  const path = formDeletePermanent.getAttribute("data-path");
  buttonsDeletePermanent.forEach(button =>{
    button.addEventListener("click" , () =>{
      const isConfirm = confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        console.log(`${path}/${id}?_method=PATCH`);
        
        formDeletePermanent.action = action;
        formDeletePermanent.submit();
      }
    })
  })
}
// End Delete Permanent