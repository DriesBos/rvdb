export default {
  watch: {
    $route() {
      this.calcHeight()
      this.calcWidth()
    }
  },
  mounted() {
    this.calcHeight()
    this.calcWidth()
    window.addEventListener("resize", this.calcHeight)
    window.addEventListener("resize", this.calcWidth)
  },
  destroyed() {
    window.removeEventListener("resize", this.calcHeight)
    window.removeEventListener("resize", this.calcWidth)
  },
  methods: {
    calcHeight() {
      setTimeout(function() {
        // Get el height
        var el = document.querySelector(".calculateHeight")
        var elHeight = el.getBoundingClientRect().bottom
        // Set height on containers
        var container = document.querySelectorAll(".setHeight")
        var calculatedHeight = window.innerHeight - elHeight + "px"
        container.forEach(el => {
          el.style.height = calculatedHeight
        })
      }, 250)
    },
    calcWidth() {
      setTimeout(function() {
        // Get el height
        var el = document.querySelector(".calculateWidth")
        var elWidth = el.offsetWidth
        // Set Width on containers
        var container = document.querySelectorAll(".setWidth")
        var calculatedWidth = window.innerWidth - elWidth + "px"
        container.forEach(el => {
          el.style.width = calculatedWidth
        })
      }, 250)
    }
  }
}
