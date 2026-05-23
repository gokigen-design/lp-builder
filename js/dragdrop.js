// js/dragdrop.js
const DragDrop = {
  instance: null,

  init(code, onReorder) {
    const list = document.getElementById('section-list');
    if (!list) return;

    if (DragDrop.instance) {
      DragDrop.instance.destroy();
      DragDrop.instance = null;
    }

    if (typeof Sortable === 'undefined') return;

    DragDrop.instance = Sortable.create(list, {
      animation: 180,
      handle: '.drag-handle',
      ghostClass: 'section-item--ghost',
      onEnd() {
        const newOrder = Array.from(list.querySelectorAll('.section-item'))
          .map(el => el.dataset.id)
          .filter(Boolean);
        State.updateOrder(code, newOrder);
        onReorder();
      }
    });
  }
};
