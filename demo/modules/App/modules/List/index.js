import newTitleChanged from './signals/newTitleChanged';
import newTitleSubmitted from './signals/newTitleSubmitted';
import removeTodoClicked from './signals/removeTodoClicked';
import todoDoubleClicked from './signals/todoDoubleClicked';
import toggleAllChanged from './signals/toggleAllChanged';
import toggleCompletedChanged from './signals/toggleCompletedChanged';

export default (options = {}) => {
  return (module) => {

    module.state({
      todos: {},
      visibleTodosRefs: [],
      isAllChecked: false,
      editedTodo: null,
      showCompleted: true,
      showNotCompleted: true
    });

    module.signalSync('newTitleChanged', newTitleChanged);
    module.signal('newTitleSubmitted', newTitleSubmitted);
    module.signal('removeTodoClicked', removeTodoClicked);
    module.signal('todoDoubleClicked', todoDoubleClicked);
    module.signal('toggleAllChanged', toggleAllChanged);
    module.signal('toggleCompletedChanged', toggleCompletedChanged);

  };
}