import "regenerator-runtime/runtime"; //polyfilling async/await
import "core-js/stable"; //polyfilling everything else

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="../img/spinner.png"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};
