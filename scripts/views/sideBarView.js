class sideBarView {
  _pElement = document.querySelector('.header');

  toggleBar() {
    this._pElement.addEventListener('click', function (e) {
      if (
        e.target.classList.contains('sidebar__btn') ||
        e.target.classList.contains('sidebar__btn-span') ||
        e.target.classList.contains('sidebar-overlay')
      ) {
        const button = e.target
          .closest('.sidebar')
          .querySelector('.sidebar__btn');
        const body = this.closest('body');
        const sidebar = this.querySelector('.sidebar__menu-content');
        const overlay = this.querySelector('.sidebar-overlay');
        button.classList.toggle('sidebar__btn--active');
        body.classList.toggle('sidebar-open');
        sidebar.classList.toggle('sidebar__menu-content--open');
        overlay.classList.toggle('sidebar-overlay--open');
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
        this.closeSideBar();
      }
    });
  }

  closeSideBar() {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.sidebar-overlay');
    const menu = document.querySelector('.sidebar__menu-content');
    const btn = document.querySelector('.sidebar__btn');
    body.classList.remove('sidebar-open');
    overlay.classList.remove('sidebar-overlay--open');
    menu.classList.remove('sidebar__menu-content--open');
    btn.classList.remove('sidebar__btn--active');
  }
}

export default new sideBarView();
