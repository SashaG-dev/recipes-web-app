class sideBarView {
  _pElement = document.querySelector('.header');

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

  sidebarEvents(handler) {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn__surprise')) {
        e.preventDefault();
        this.handleSideBar('remove');
        handler();
      }
    });
    this.toggleLists();
    this.toggleBar();
    this.escapeSideBar();
  }

  categoryEvent(handler) {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('list-category')) {
        e.preventDefault();
        const category = e.target.dataset.category;
        this.handleSideBar('remove');
        this.handleLists('remove');
        handler(category);
      }
    });
  }

  cuisineEvent(handler) {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('list-cuisine')) {
        e.preventDefault();
        const cuisine = e.target.dataset.cuisine;
        this.handleSideBar('remove');
        this.handleLists('remove');
        handler(cuisine);
      }
    });
  }

  toggleLists() {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('sidebar-title--lists')) {
        const list = e.target.nextElementSibling;
        list.classList.toggle('sidebar__list-container--show');
        e.target.classList.toggle('list-selected');
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

  handleLists(type) {
    const listHeaders = document.querySelectorAll('.sidebar-title--lists');
    const lists = document.querySelectorAll('.sidebar__list-container');
    listHeaders.forEach((header) => header.classList[type]('list-selected'));
    lists.forEach((list) =>
      list.classList[type]('sidebar__list-container--show')
    );
  }
}

export default new sideBarView();
