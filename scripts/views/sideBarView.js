class sideBarView {
  _pElement = document.querySelector('.header');

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
    this.listEvent(handler, 'category');
  }

  cuisineEvent(handler) {
    this.listEvent(handler, 'cuisine');
  }

  refreshEvent(handler) {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.href.includes('cat'))
        handler(this.showListRefresh('category'), 'category');
      else if (window.location.href.includes('cui'))
        handler(this.showListRefresh('cuisine'), 'cuisine');
    });
  }

  hashchangeEvent(handler) {
    window.addEventListener('hashchange', (e) => {
      const home = window.location.origin;
      const recipes = Array.from(document.querySelectorAll('.recipe-card'));
      if (window.location.href.includes('cat') && recipes.length)
        handler(this.showListRefresh('category'), 'category');
      else if (window.location.href.includes('cui') && recipes.length)
        handler(this.showListRefresh('cuisine'), 'cuisine');
    });
  }

  listEvent(handler, type) {
    this._pElement.addEventListener('click', (e) => {
      if (e.target.classList.contains(`list-${type}`)) {
        e.preventDefault();
        const item = e.target.dataset[type];
        window.location.href = `${window.location.origin}/#${type}=${item}`;
        this.handleSideBar('remove');
        this.handleLists('remove');
        handler(item, type);
      }
    });
  }

  showListRefresh(type) {
    if (window.location.href.includes(`/#${type}=`)) {
      const url = window.location.origin + `/#${type}=`;
      const item = window.location.href.replace(url, '');
      return item;
    }
  }

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
