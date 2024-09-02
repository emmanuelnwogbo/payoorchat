export default {
    mounted() {
        this.timefunction();
        
        document.querySelector("input").addEventListener("focus", function () {
            document
              .querySelector('meta[name="viewport"]')
              .setAttribute(
                "content",
                "width=device-width, initial-scale=1.0, maximum-scale=1.0"
              );
          });
      
          document.querySelector("input").addEventListener("blur", function () {
            document
              .querySelector('meta[name="viewport"]')
              .setAttribute("content", "width=device-width, initial-scale=1.0");
          });
    },
    methods: {
        timefunction() {
            setInterval(() => {
                if (this.current === 3) {
                    this.current = 1;
                } else {
                    let tracker = this.current;
                    tracker += 1;
                    this.current = tracker;
                }
            }, 3000);
        },
        openTwitterLink() {
            const url = "https://twitter.com/mypayoor?s=11";
            window.open(url, "_blank");
        },
        openInstagramLink() {
            const url = "https://www.instagram.com/mypayoor/?igshid=MzRlODBiNWFlZA%3D%3D";
            window.open(url, "_blank");
        },
    }
}