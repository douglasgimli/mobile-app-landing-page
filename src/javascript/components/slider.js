const SLIDER_INTERVAL = 4000

export const init = () => {
  console.log('[.] Slider init')

  const slider = $('[js-slider]')
  slider.each((key, element) => initializeSlider($(element)))
}

const initializeSlider = ($slider) => {
  const holder = $slider.find('[js-slider-holder]')
  if (holder.length === 1) {
    // Get slider items
    const items = $slider.find('[js-slider-item]')
    
    // Set holder width
    holder.css({ 'width': (items.length * 100) + 'vw' })
    
    // Create bullets
    const bulletsHolder = $slider.find('[js-slider-bullets]')
    if (bulletsHolder.length === 1) {
      items.each((key) => {
        const bullet = $(bulletTemplate)
        bulletsHolder.append(bullet)
        bullet.attr('js-slider-bullet', key)
      })

      // Bind bullet click
      bulletsHolder.find('[js-slider-bullet]').on('click touchestart', (event) => onBulletClick(event, $slider))
    }

    // Set initial slider position
    gotoSlider($slider, 0)

    const sliderTimer = setInterval(() => {
      const sliderPaused = $slider.attr('js-slider-paused')
      if (!sliderPaused) {
        const key = parseInt($slider.attr('js-slider-current'))
        let nextSlider = (key + 1) >= items.length ? 0 : (key + 1)
        gotoSlider($slider, nextSlider)
      }
    }, SLIDER_INTERVAL)
  }
}

const onBulletClick = (event, $slider) => {
  event.preventDefault()
  const key = $(event.target).attr('js-slider-bullet')
  if (key) {
    $slider.attr('js-slider-paused', true)
    gotoSlider($slider, key)
  }
}

const gotoSlider = ($slider, key) => {
  $slider.attr('js-slider-current', key)
  
  const bulletsHolder = $slider.find('[js-slider-bullets]')
  if (bulletsHolder.length === 1) {
    bulletsHolder
      .find('[js-slider-bullet]')
      .removeClass('testimonials__bullet--current')
      .eq(key)
      .addClass('testimonials__bullet--current')
  }
  
  const holder = $slider.find('[js-slider-holder]')
  const sliderPosition = key * 100
  holder.css({ 'transform': 'translateX(-' + sliderPosition + 'vw)' })
}

const bulletTemplate = '<a href="#" class="testimonials__bullet">&nbsp;</a>'