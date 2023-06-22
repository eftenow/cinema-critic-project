export function setLoadingState(isLoading) {
    if (isLoading) {
        console.log('loading');
      createLoader();
    } else {
      removeLoader();
    }
  }
  
  function createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader";
  
    const loaderAfter = document.createElement("div");
    loaderAfter.className = "loader--after";
    loader.appendChild(loaderAfter);
  
    document.body.appendChild(loader);
  }
  
  export function removeLoader() {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.remove();
    }
  }

  export function isContentLoaded() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
      }
    });
  }
