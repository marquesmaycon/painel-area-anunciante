import { tagIt } from "./tagfy.js"

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

// upload file
const uploadBtn = document.querySelector("[data-upload-btn]")
const inputFile = document.querySelector("[data-input-file=profile-pic]")
if (uploadBtn) {
   uploadBtn.addEventListener("click", ev => {
      ev.target.nextElementSibling.click()
   })
}

// profile pic
const profilePic = document.querySelector("[data-profile-pic]")
if (profilePic) {
   inputFile.addEventListener("change", ev => {
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
   const titleInput = ev.target.previousElementSibling.querySelector("input")
   const msg = ev.target.previousElementSibling.querySelector("b")

   if (!isModalTitleValid(titleInput)) {
      msg.textContent = "(Insira um título com 3+ caracteres)"
      return;
   }

   const valoresContainer = document.querySelector("[data-valores-container]")
   const newElement = document.createElement("label")
   newElement.classList.add("label", "cifrao")

   newElement.innerHTML = `
      ${titleInput.value}
      <button type="button" class="btn-dynamic delete">
         <img src="./assets/images/icon-trash-can.svg" alt="trash-can icon" class="icon">
         Excluir
      </button>
      <input type="text">
   `
   valoresContainer.appendChild(newElement)

   closeModal(ev)
   titleInput.value = ''
   msg.textContent = ''
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
   const element = ev.target
   if (element.matches("[data-delete-field]")) {
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
            const parentToDelete = element.dataset.deleteField
            element.closest(parentToDelete).remove()
         }
      })
   }
}
if (form) {
   form.addEventListener("click", deleteDynamicField)
}
// instructions
const instructionCollapseBtn = document.querySelector("[data-collapse=instructions]")
if (instructionCollapseBtn) {
   instructionCollapseBtn.addEventListener("click", (ev) => {
      ev.target.closest(".instructions").classList.toggle("active")
   })
}

// contact accordion
const formContacts = document.querySelector("[data-form=contacts]")
if (formContacts) {
   formContacts.addEventListener("click", ev => {
      const element = ev.target
      if (element.matches("[data-collapse=contact]")) {
         const contato = element.closest(".contact-item");
         const isContatoActive = contato.classList.contains("active");
         const contactItems = document.querySelectorAll("[data-contact-item]")

         contactItems.forEach(contact => contact.classList.remove("active"));

         if (!isContatoActive) {
            contato.classList.add("active");
         }
      }
   })
}

// add contact 
const addContactBtn = document.querySelector("[data-add-contact]")
let contactsLength = document.querySelectorAll("[data-contact-item]").length
if (addContactBtn) {
   addContactBtn.addEventListener("click", () => {
      contactsLength++

      const newElement = document.createElement("div")
      newElement.classList.add("contact-item")
      newElement.setAttribute("data-contact-item", "")
      newElement.innerHTML = `
         <legend class="title has-btn">
            <div class="has-icon">
               Contato ${contactsLength}
               <button type="button" class="btn-dynamic delete" data-delete-field="[data-contact-item]">
                  <img src="./assets/images/icon-trash-can.svg" alt="trash-can icon" class="icon">
                  Excluir
               </button>
            </div>
            <button type="button" data-collapse="contact">
               <img src="./assets/images/icon-chevron-up.svg" alt="seta pra cima" class="icon rotate no-events">
            </button>
         </legend>
         <div class="collapse-content">
            <div class="form-group">
               <div class="input-group">
                  <label class="label">
                     Título do contato
                     <input type="text" name="" placeholder="ex: anuciante ou responsável pelo local">
                  </label>
                  <label class="label">
                     Nome do anunciante
                     <input type="text" name="" placeholder="ex: Roberto">
                  </label>
               </div>
               <label class="label">
                  Observações
                  <input type="text" name="" placeholder="ex: só atendemos aos finais de semana">
               </label>
               <div class="input-group">
                  <label class="label">
                     Celular/Whatsapp
                     <input type="text" name="" placeholder="(00) 0 0000-0000">
                  </label>
                  <label class="label">
                     Celular/Whatsapp 2
                     <input type="text" name="" placeholder="(00) 0 0000-0000">
                  </label>
                  <label class="label">
                     Telefone Fixo
                     <input type="text" name="" placeholder="(00) 0 0000-0000">
                  </label>
               </div>
               <label class="label">
                  E-mail
                  <input type="text" name="" placeholder="ex: fulano@gmail.com">
               </label>
            </div>
         </div>
      `
      formContacts.appendChild(newElement)
   })
}

// adicionar fotos
const inputPhotos = document.querySelector("[data-input-file=photos")
const photosSubmit = document.querySelector("[data-photos-submit]")
let photosLength = document.querySelectorAll("[data-table-body] tr").length
if (inputPhotos) {
   inputPhotos.addEventListener("change", ev => {
      const files = ev.target.files
      if (!files) return

      const photosMsg = document.querySelector("[data-photos-msg]")

      photosMsg.classList.add("active")
      photosMsg.textContent = ""
      for (i = 0; i < files.length; i++) {
         photosMsg.textContent += files[i].name + ", "
      }
      photosSubmit.style.display = "block"
   })
}

const uploadPhotos = function () {
   const files = inputPhotos.files
   const tableBody = document.querySelector("[data-table-body]")

   for (i = 0; i < files.length; i++) {
      photosLength++
      const newElement = document.createElement("tr")
      newElement.innerHTML = `
         <td>${photosLength}</td>
         <td>#</td>
         <td><img src="${URL.createObjectURL(files[i])}" alt="foto do album" class="photos-img"></td>
         <td>${files[i].name}</td>
         <td>${files[i].size / 1024}kb</td>
         <td>
            <label class="" data-label-radio>
               <input type="radio" name="destaque">
            </label>
         </td>
         <td>
            <button type="button" data-delete-field="tr">
               <img src="./assets/images/icon-trash-can.svg" alt="icon excluir" class="icon no-events">
            </button>
         </td>
      `
      tableBody.appendChild(newElement)
   }
}
if (photosSubmit) {
   photosSubmit.addEventListener("click", uploadPhotos)
}

// foto destaque
const tableFotos = document.querySelector("[data-table=photos]")
if (tableFotos) {
   tableFotos.addEventListener("click", ev => {
      const element = ev.target
      if (element.matches("[data-label-radio]")) {
         const radioLabels = tableFotos.querySelectorAll("[data-label-radio]")
         radioLabels.forEach(label => {
            label.classList.remove("active")
         })
         element.classList.add("active")
      }
   })
}

// accommodations accordion
const formAccommodations = document.querySelector("[data-form=accommodations]")
if (formAccommodations) {
   formAccommodations.addEventListener("click", ev => {
      const element = ev.target
      if (element.matches("[data-collapse=accommodation]")) {
         const contato = element.closest(".accommodation-item");
         const isContatoActive = contato.classList.contains("active");
         const accommodationItems = document.querySelectorAll("[data-accommodation-item]")

         accommodationItems.forEach(accommodation => accommodation.classList.remove("active"));

         if (!isContatoActive) {
            contato.classList.add("active");
         }
      }
   })
}

const isModalTitleValid = function (inputEl) {
   const inputValue = inputEl.value.trim()
   return inputValue.length >= 3
}

const addCmddBtn = document.querySelector("[data-add-comodidade]")

const addCampoAreaCmdd = function (ev) {
   const titleInput = ev.target.previousElementSibling.querySelector("input")
   const msg = ev.target.previousElementSibling.querySelector("b")

   if (!isModalTitleValid(titleInput)) {
      msg.textContent = "(Insira um título com 3+ caracteres)"
      return;
   }

   const areasCmddContainer = document.querySelector("[data-areacmdd-container]")
   let cmddAreaLength = areasCmddContainer.querySelectorAll("[data-accommodation-item]").length
   cmddAreaLength++

   const newElement = document.createElement("li")
   newElement.classList.add("accommodation-item")
   newElement.setAttribute("data-accommodation-item", "")
   newElement.innerHTML = `
      <div class="title has-btn">
         <div class="has-icon">
            <span data-collapse="accommodation">${titleInput.value}</span>

            <button type="button" class="btn-dynamic delete" data-delete-field="[data-accommodation-item]">
               <img src="./assets/images/icon-trash-can.svg" alt="trash-can icon" class="icon">
               Excluir
            </button>
         </div>

         <button type="button" data-collapse="accommodation">
            <img src="./assets/images/icon-chevron-up.svg" alt="seta pra cima" class="icon rotate no-events">
         </button>
      </div>

      <div class="collapse-content">
         <div class="collapse-hide">
            <div class="form-group tags">

               <div class="tags-container">
                  <span class="label">Adicionados</span>
                  <input type="text" name="areacmdd[${cmddAreaLength}]" class="custom-tagify" placeholder="liste as comodidades aqui..." autofocus3>
               </div>
               
            </div>
         </div>
      </div>
   `
   areasCmddContainer.appendChild(newElement)
   newElement.querySelector("span").click()

   const tagsInput = newElement.querySelector("input")   
   tagIt(tagsInput)

   closeModal(ev)
   msg.textContent = ""
   titleInput.value = ""
}

if (addCmddBtn) {
   addCmddBtn.addEventListener("click", addCampoAreaCmdd)
}

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
