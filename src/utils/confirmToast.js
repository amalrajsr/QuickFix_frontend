import Swal from "sweetalert2";

function confirmToast(callback) {
  return Swal.fire({
    titleText: "Are you sure",
    showCancelButton: true,
    cancelButtonText:'back',
    confirmButtonText: "yes",
    confirmButtonColor:'#022439'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}

export default confirmToast
