import View from './View.js';

class sideBarView {
  _pElement = document.querySelector('.header');
  _data;

  toggleBar() {
    this._pElement.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('sidebar__btn') ||
        e.target.classList.contains('sidebar__btn-span') ||
        e.target.classList.contains('sidebar-overlay')
      ) {
        this.handleSideBar('toggle');
      }
    });
  }

  escapeSideBar() {
    this._pElement.addEventListener('keyup', (e) => {
      const button = document.querySelector('.sidebar__btn');
      if (
        e.key === 'Escape' &&
        button.classList.contains('sidebar__btn--active')
      ) {
        this.handleSideBar('remove');
      }
    });
  }

  randomRecipeEvent(handler) {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn__surprise')) {
        e.preventDefault();
        this.handleSideBar('remove');
        handler();
      }
    });
  }

  handleSideBar(type) {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.sidebar-overlay');
    const menu = document.querySelector('.sidebar__menu-content');
    const btn = document.querySelector('.sidebar__btn');
    body.classList[type]('sidebar-open');
    overlay.classList[type]('sidebar-overlay--open');
    menu.classList[type]('sidebar__menu-content--open');
    btn.classList[type]('sidebar__btn--active');
  }
}

export default new sideBarView();
