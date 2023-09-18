export const tagIt = function (element) {
   new Tagify(element, {
      whitelist: ['Academia', 'Banheiro externo', 'Bebedor elétrico', 'Buffet próprio', 'Cadeira de área', 'Caixa de som amplificada', 'Caixa térmica de isopor grande', 'elástica', 'Camping'],
      dropdown: {
         classname: "tags-dd",
         enabled: 0,              // show the dropdown immediately on focus
         position: "text",         // place the dropdown near the typed text
         closeOnSelect: false,          // keep the dropdown open after selecting a suggestion
         highlightFirst: true
      }
   })
}
const tagsCmdd = document.querySelectorAll(".custom-tagify")
tagsCmdd.forEach(el => {
   tagIt(el)
})