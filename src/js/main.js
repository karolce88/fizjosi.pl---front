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

	// ---------- Obsługa roku w footerze -----------
	const footerYear = document.querySelector('.JSyear')
	const handleCurrentYear = () => {
		const year = new Date().getFullYear()
		footerYear.innerText = year
	}
	handleCurrentYear()
})
