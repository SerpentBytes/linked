export default {
  data() {
    return {
      content: null
    }
  },
  methods: {
    saveFile() {
      window.electron.invoke('save-file', [
        this.formatDate(this.today, 'year'),
        this.today,
        this.content
      ]).then(e => console.log(e))
    },
    loadFile() {
      window.electron.invoke('load-file', [
        this.formatDate(this.today, 'year'),
        this.today
      ]).then(data => {
        const file = JSON.parse(data)
        this.editor.setContent(file.content)
      })
    },
    debounce(func, wait) {
      let timeout;

      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      }
    }
  },
  created() {
    this.loadFile()
  }
}