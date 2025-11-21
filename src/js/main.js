document.addEventListener('DOMContentLoaded', () => {
	const footerYear = document.querySelector('.JSyear')

	const handleCurrentYear = () => {
		const year = new Date().getFullYear()
		footerYear.innerText = year
	}
	handleCurrentYear()

	const burgerBtn = document.querySelector('.JS-burger')
	const mobileMenu = document.querySelector('.JSmobile-nav')
	const mobileMenuLinks = document.querySelectorAll('.menu-item a')
	const logo = document.querySelector('.JSlogo')
	const body = document.body;

	const handleMobileMenu = () => {
		burgerBtn.addEventListener('click', () => {
			burgerBtn.classList.toggle('active')
			mobileMenu.classList.toggle('show-mobile-menu')
			body.classList.toggle('overflow-hidden-body')
		})
		// close mobile menu after click on menu items
		mobileMenuLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (mobileMenu.classList.contains('show-mobile-menu')) {
					mobileMenu.classList.remove('show-mobile-menu')
				}
			})
		})
		// close mobile menu after click on logo
		logo.addEventListener('click', () => {
			if (mobileMenu.classList.contains('show-mobile-menu')) {
				mobileMenu.classList.remove('show-mobile-menu')
			}
		})
	}
	handleMobileMenu()

	const changeLogoHeightDuringScrol = () => {
		const logoImg = document.querySelector('.JSlogo a img')
		if (!logo) return
		const TRIGGER = 200
		let ticking = false
		function onScroll() {
			const scrollY = window.scrollY
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (scrollY > TRIGGER) {
						logoImg.classList.add('change-height-logo')
					} else {
						logoImg.classList.remove('change-height-logo')
					}
					ticking = false
				})
				ticking = true
			}
		}
		window.addEventListener('scroll', onScroll)
	}
	changeLogoHeightDuringScrol()

	const handleNavDuringScroll = () => {
		const nav = document.querySelector('.navigation-container')
		if (!nav) return
		let lastScrollY = window.scrollY
		let ticking = false
		const HIDE_OFFSET = 10
		const START_SCROLL = 800
		function onScroll() {
			const currentScrollY = window.scrollY
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (currentScrollY < START_SCROLL) {
						nav.classList.remove('nav-hidden')
						lastScrollY = currentScrollY
						ticking = false
						return
					}
					const isScrollingDown = currentScrollY > lastScrollY + HIDE_OFFSET
					const isScrollingUp = currentScrollY < lastScrollY - HIDE_OFFSET
					if (isScrollingDown) {
						nav.classList.add('nav-hidden')
					} else if (isScrollingUp) {
						nav.classList.remove('nav-hidden')
					}
					lastScrollY = currentScrollY
					ticking = false
				})
				ticking = true
			}
		}
		window.addEventListener('scroll', onScroll, { passive: true })
	}
	handleNavDuringScroll()





	// END
})
