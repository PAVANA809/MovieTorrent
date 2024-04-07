var app = new Vue({
    el: '#app',
    data: {
      searchItem: "",
      isDarkMode: true,
      data: null,
      messages: {
        placeHolder: "Enter IMDB ID, movie, series or anime name..."
      }
    },
    methods: {
      async search(){
          if(!this.searchItem){
              Swal.fire({
                  position: "center",
                  icon: "error",
                  title: this.messages.placeHolder,
                  showConfirmButton: false,
                  timer: 2500
              });
              return;
          }
          Swal.fire({
              title: 'Loading...',
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              didOpen: () => {
                  Swal.showLoading();
              }
          })
          try {
          const response = await fetch("https://movie-torrent-api.onrender.com/search/"+this.searchItem, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          Swal.close()
          if (response.ok) {
              const data = await response.json();
              this.data = data['data']
          } else {
              alert("Please try again later....");
          }
      } catch (error) {
          console.error("Fetch error:", error);
          alert("An error occurred. Please try again later....");
      }
      },
      copy(text) {
      navigator.clipboard.writeText(text)
          .then(() => {
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Magnet copied to clipboard.",
                  showConfirmButton: false,
                  timer: 1500
              });
          })
          .catch(err => {
              Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Failed to copy magnet link.",
                  showConfirmButton: false,
                  timer: 1500
              });
          });
  }
    }
  })