document.addEventListener('DOMContentLoaded', () => {
	// document.querySelectorAll('.menu-item-has-children').forEach(item => {
	//   item.addEventListener('click', e => {
	//     item.classList.toggle('open');
	//   });

	//   // hover
	//   item.addEventListener('mouseenter', () => {
	//     item.classList.add('open');
	//   });

	//   item.addEventListener('mouseleave', () => {
	//     item.classList.remove('open');
	//   });
	// });
	
	// ---------- Handle of footer year -----------
	const footerYear = document.querySelector('.JSyear')
	const handleCurrentYear = () => {
		const year = new Date().getFullYear()
		footerYear.innerText = year
	}
	handleCurrentYear()
	
	
	
	const burgerBtn = document.querySelector('.JS-burger')
	const mobileMenu = document.querySelector('.JS-mobile-container')




	burgerBtn.addEventListener('click' , () => {
		burgerBtn.classList.toggle('active')
		mobileMenu.classList.toggle('show-mobile-menu')
	})
























// END
})
