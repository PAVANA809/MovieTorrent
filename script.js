var app = new Vue({
    el: '#app',
    data: {
      searchItem: "",
      isDarkMode: true,
      data: [],
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
              const response = await fetch("https://movietorrent.onrender.com/search/"+this.searchItem, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
              Swal.close()
              if (response.ok) {
                  const data = await response.json();
                  this.data = data['data'] || [];
                  if (this.data.length === 0) {
                      Swal.fire({
                          icon: 'info',
                          title: 'No results found.',
                          showConfirmButton: false,
                          timer: 1800
                      });
                  }
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Please try again later...',
                      showConfirmButton: false,
                      timer: 2000
                  });
              }
          } catch (error) {
              console.error("Fetch error:", error);
              Swal.fire({
                  icon: 'error',
                  title: 'An error occurred. Please try again later...',
                  showConfirmButton: false,
                  timer: 2000
              });
          }
      },
      copy(magnet) {
        navigator.clipboard.writeText(magnet).then(() => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Magnet link copied!',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
                background: this.isDarkMode ? '#23272b' : '#fff',
                color: this.isDarkMode ? '#fff' : '#222'
            });
        }).catch(() => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to copy magnet link.',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true
            });
        });
      }
    }
})