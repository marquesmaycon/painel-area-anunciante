tinymce.init({
   selector: ".text-mce"
})

// Utils
const addEventMultipleElements = function (elements, event, callback) {
   elements.forEach(el => {
      el.addEventListener(event, callback)
   })
}

// Menu
const navTogglers = document.querySelectorAll("[data-nav-toggler]")
const navigationBar = document.querySelector("[data-header]")
const overlay = document.querySelector("[data-overlay]")

const navToggler = function (ev) {
   navigationBar.classList.toggle("active")
   overlay.classList.toggle("active")
}
addEventMultipleElements(navTogglers, "click", navToggler)

// Dialogs
const dialogBtns = document.querySelectorAll("[data-dialog-btn]")
const dialogs = document.querySelectorAll("[data-dialog]")
const dialogCloseBtn = document.querySelectorAll("[data-dialog-close]")

const showModal = function (ev) {
   const target = ev.target.dataset.target
   const modal = document.querySelector(`[data-dialog=${target}`)
   modal.style.animation = "modalFadeIn 250ms ease forwards"
   modal.showModal();
   document.body.classList.add("modal-active")
}
addEventMultipleElements(dialogBtns, "click", showModal)

dialogs.forEach(dialog => {
   dialog.addEventListener("click", (ev) => {
      if (ev.target == dialog) {
         ev.target.style.animation = "modalFadeOut 200ms ease forwards"

         setTimeout(() => {
            document.body.classList.remove("modal-active")
            dialog.close()
         }, 200)
      }
   })
})

const closeModal = function (ev) {
   ev.target.closest("dialog").style.animation = "modalFadeOut 200ms ease forwards"

   setTimeout(() => {
      document.body.classList.remove("modal-active")
      ev.target.closest("dialog").close()
   }, 200)
}
addEventMultipleElements(dialogCloseBtn, "click", closeModal)

// profile picture
const profilePicBtn = document.querySelector("[data-img-btn]")
const profilePicInput = document.querySelector("[data-input-img]")
const profilePic = document.querySelector("[data-profile-pic]")

if (profilePicBtn) {
   profilePicBtn.addEventListener("click", () => {
      profilePicInput.click()
   })

   profilePicInput.addEventListener("change", ev => {
      const file = ev.target.files[0]
      if (!file) return
      profilePic.src = URL.createObjectURL(file)
   })
}

// profile sections
const profileSectionBtns = document.querySelectorAll("[data-section-btn]")
const profileSections = document.querySelectorAll("[data-profile]")
profileSectionBtns.forEach(btn => {
   btn.addEventListener("click", (ev) => {
      if (!ev.target.classList.contains("active")) {
         profileSectionBtns.forEach(btn2 => {
            btn2.classList.toggle("active")
         })
         profileSections.forEach(section => {
            section.classList.toggle("active")
            section.style.animation = "fadeIn 250ms ease forwards"
         })
      }
   })
})

// Adicionar Valor
const addValorBtn = document.querySelector("[data-add-valor]")

const addCampoValor = function (ev) {
   const campo = ev.target.previousElementSibling.querySelector("input")
   if (campo.value == "") {
      const msg = ev.target.previousElementSibling.querySelector("b")
      msg.textContent = "(Insira um título com 3+ caracteres)"
      return
   }
   const dialog = ev.target.closest("dialog")
   const valoresContainer = document.querySelector("[data-valores-container]")
   const newElement = document.createElement("label")
   newElement.classList.add("cifrao")

   newElement.innerHTML = `
      ${campo.value}
      <button type="button" class="btn-dynamic delete">
         <img src="./assets/images/icon-trash-can.svg" alt="trash-can icon" class="icon">
         Excluir
      </button>
      <input type="text">
   `
   valoresContainer.appendChild(newElement)

   closeModal(ev)
   campo.value = ""
}
if (addValorBtn) {
   addValorBtn.addEventListener("click", addCampoValor)
}

// Excluir elemento dinamico do formulário
const form = document.querySelector("form")
const cSwal = Swal.mixin({
   confirmButtonColor: '#3B9756',
   cancelButtonColor: '#932327',
   reverseButtons: true,
   customClass: {
      popup: 'custom-swal',
      confirmButton: 'swal-btns',
      denyButton: 'swal-btns',
      cancelButton: 'swal-btns',
   }
})
const deleteDynamicField = function (ev) {
   if (ev.target.matches("[data-delete-field]")) {
      cSwal.fire({
         title: 'Confirmação',
         text: "Você quer mesmo excluir o item?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sim, excluir!',
         cancelButtonText: 'Cancelar'         
      }).then((result) => {
         if (result.isConfirmed) {
            cSwal.fire({
               title: 'Certo',
               text: "O item será excluido ao salvar as alterações",
               icon: 'success',               
               confirmButtonText: 'OK',
               
            })
            const field = ev.target.closest("label")
            field.remove()
         }
      })
   }
}
form.addEventListener("click", deleteDynamicField)

// swiper
if (document.querySelector(".ads-swiper")) {
   const swiperAds = new Swiper(".ads-swiper", {
      autoplay: {
         delay: 2500,
      },
      pagination: {
         el: '.swiper-pagination',
      },
   })
}
