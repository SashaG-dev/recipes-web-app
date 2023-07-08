class sideBarView {
  _pElement = document.querySelector('.header');

  toggleBar() {
    this._pElement.addEventListener('click', function (e) {
      if (
        e.target.classList.contains('sidebar__btn') ||
        e.target.classList.contains('sidebar__btn-span')
      ) {
        e.target
          .closest('.sidebar__btn')
          .classList.toggle('sidebar__btn--active');
        this.closest('body').classList.toggle('sidebar-open');
        this.querySelector('.sidebar__menu-content').classList.toggle(
          'sidebar__menu-content--open'
        );
        this.querySelector('.sidebar-overlay').classList.toggle(
          'sidebar-overlay--open'
        );
      }
    });
  }
}

export default new sideBarView();
